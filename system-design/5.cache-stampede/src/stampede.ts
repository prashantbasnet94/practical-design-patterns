import { Redis } from 'ioredis';

// Mock DB and Redis for the example
const redis = new Redis();
const db = {
    fetchTopStories: async () => {
        console.log("🔥 HIT DB: Fetching Top Stories...");
        await new Promise(resolve => setTimeout(resolve, 2000)); // 2s delay
        return JSON.stringify({ title: "Breaking News" });
    }
};

/**
 * ❌ BAD CODE: The Stampede Generator
 * If 10,000 requests call this at once, it triggers 10,000 DB queries.
 */
async function getHomepageBad() {
    // 1. Check Cache
    const cached = await redis.get("homepage");
    if (cached) return cached;

    // 2. CACHE MISS -> DANGER ZONE
    // Every request that reaches here starts its OWN database call.
    const data = await db.fetchTopStories();

    // 3. Set Cache
    await redis.set("homepage", data, "EX", 3600);
    return data;
}

/**
 * ✅ GOOD CODE: Promise Deduplication (Singleflight)
 * If 10,000 requests call this at once, only ONE triggers the DB query.
 * The other 9,999 wait for that one promise to resolve.
 */
const inflightRequests = new Map();

async function getHomepageGood() {
    // 1. Check Cache
    const cached = await redis.get("homepage");
    if (cached) return cached;

    // 2. Check In-Flight Map
    // Is someone else already fetching this?
    const existingPromise = inflightRequests.get("homepage");
    if (existingPromise) {
        console.log("🛡️ Reusing existing promise (Deduplicated)");
        return existingPromise; // <--- The magic line. Wait for the leader.
    }

    // 3. Be the Leader
    console.log("👑 I am the Leader. Fetching from DB.");

    // Create the Promise but don't await it yet
    const fetchPromise = db.fetchTopStories().then(async (data) => {
        // When done, save to Redis
        await redis.set("homepage", data, "EX", 3600);
        // Remove from map so future requests check Redis again
        inflightRequests.delete("homepage");
        return data;
    });

    // Store the promise in the map for others to find
    inflightRequests.set("homepage", fetchPromise);

    return fetchPromise;
}