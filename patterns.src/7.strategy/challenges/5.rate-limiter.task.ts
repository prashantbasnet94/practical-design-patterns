/**
 * CHALLENGE 5: API RATE LIMITER (SYSTEM DESIGN)
 * 
 * Scenario:
 * Your API Gateway needs to throttle requests to prevent abuse.
 * Different tiers of service need different algorithms.
 * - `FreeTier`: Simple "Token Bucket" (Allow burst, then slow refill).
 * - `ProTier`: "Leaky Bucket" or "Fixed Window" (Strict limits).
 * 
 * Task:
 * Implement `IRateLimitStrategy`.
 * 1. `NoLimitStrategy`: Always returns true.
 * 2. `SimpleWindowStrategy`: Allow N requests per minute. Reset every minute.
 * 
 * Context:
 * The `ApiGateway` calls `strategy.allowRequest(userId)`.
 * If it returns false, throw HTTP 429.
 */

// --- 1. Interface ---
interface IRateLimitStrategy {
    allowRequest(userId: string): boolean;
}

// --- 2. Strategies ---

class NoLimitStrategy implements IRateLimitStrategy {
    allowRequest() { return true; }
}

class FixedWindowStrategy implements IRateLimitStrategy {
    private limit = 5;
    private counts = new Map<string, number>();

    allowRequest(userId: string): boolean {
        // TODO: simpler version -> just count checks.
        // In real world, we'd reset this map every 60s.
        const current = this.counts.get(userId) || 0;
        if (current >= this.limit) return false;

        this.counts.set(userId, current + 1);
        console.log(`User ${userId} request ${current + 1}/${this.limit}`);
        return true;
    }
}

// --- 3. Context ---

class ApiGateway {
    constructor(private strategy: IRateLimitStrategy) { }

    handleGet(userId: string) {
        if (this.strategy.allowRequest(userId)) {
            console.log("200 OK");
        } else {
            console.error("429 Too Many Requests");
        }
    }
}

// --- Verification ---
console.log("--- Rate Limiter Challenge ---");
const gw = new ApiGateway(new FixedWindowStrategy());

// Simulate 7 requests
// for(let i=0; i<7; i++) gw.handleGet("user_123");
