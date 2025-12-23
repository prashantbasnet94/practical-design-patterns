/**
 * CHALLENGE 7: SWAPPABLE CACHE LAYER (DEV vs PROD)
 * 
 * Scenario:
 * - In Development: We want to run the app locally without needing a Redis server.
 * - In Production: We MUST use Redis for scalability.
 * 
 * Problem:
 * Code using `Map` (local) is totally different from `RedisClient` (prod).
 * 
 * Task:
 * Implement `RedisAdapter` and `MemoryAdapter` so the Application logic
 * doesn't care which environment it's running in.
 */

// --- 1. Target Interface ---
interface ICache {
    set(key: string, value: string): void;
    get(key: string): string | null;
}

// --- 2. Adaptees (The Real Implementations) ---

// Production-grade Redis (Simulated)
class RedisClient {
    setEx(key: string, seconds: number, val: string) {
        console.log(`[REDIS] Setting ${key} = ${val} (Expires in ${seconds}s)`);
    }

    get(key: string): string | null {
        console.log(`[REDIS] Getting ${key}`);
        return "REDIS_VAL";
    }
}

// Development In-Memory Cache
class LocalMemoryMap {
    private data = new Map<string, string>();

    put(k: string, v: string) {
        console.log(`[MEMORY] Setting ${k} = ${v}`);
        this.data.set(k, v);
    }

    fetch(k: string) {
        return this.data.get(k) || null;
    }
}


// --- YOUR WORK STARTS HERE ---

class RedisAdapter implements ICache {
    constructor(private redis: RedisClient) { }

    set(key: string, value: string): void {
        // TODO: Redis usually needs an expiry. Let's default to 3600 seconds.
    }

    get(key: string): string | null {
        // TODO: Adapt
        return null;
    }
}

class MemoryAdapter implements ICache {
    constructor(private map: LocalMemoryMap) { }

    set(key: string, value: string): void {
        // TODO: Adapt
    }

    get(key: string): string | null {
        // TODO: Adapt
        return null;
    }
}


// --- VERIFICATION ---
console.log("--- Challenge 7: Cache Adapter ---");

// Simulate Environment Switching
const IS_PROD = true; // Try changing to false!

let cache: ICache;

if (IS_PROD) {
    cache = new RedisAdapter(new RedisClient());
} else {
    cache = new MemoryAdapter(new LocalMemoryMap());
}

cache.set("session_user_1", "UserJSONData");

// Expected Output (Prod):
// [REDIS] Setting session_user_1 = UserJSONData (Expires in 3600s)

// Expected Output (Dev):
// [MEMORY] Setting session_user_1 = UserJSONData
