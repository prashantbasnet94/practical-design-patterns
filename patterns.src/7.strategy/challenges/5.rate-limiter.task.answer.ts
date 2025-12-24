import { number } from 'better-auth';
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


interface IRateLimit {
    allowRequest(userId: string): boolean
}

class NoLimitStrategy implements IRateLimit {
    allowRequest(): boolean {
        console.log('@ NoLimitStrategy')
        return true
    }
}
class SimpleWindowStrategy implements IRateLimit {
    constructor(private limit: number) { }
    private map = new Map<string, number>()
    allowRequest(userId: string): boolean {
        console.log('@ Simple window Strategy')
        let current = this.map.get(userId) || 0
        if (this.limit < current) {
            return false
        }
        this.map.set(userId, current + 1)
        console.log(`User ${userId} request ${current + 1}/${this.limit}`);
        return true
    }
}

class ApiGateway {
    constructor(private rateLimitStrategy: IRateLimit = new NoLimitStrategy()) { }
    setStrategy(strategy: IRateLimit) {
        this.rateLimitStrategy = strategy
    }
    applyRateLimit(userId: string) {

        console.log('@ApiGateway applying rate limit')
        if (this.rateLimitStrategy.allowRequest(userId)) {
            console.log("200 OK");
        } else {
            console.error("429 Too Many Requests");
        }
    }
}

class MainApp {
    constructor(private apiGateWay: ApiGateway) { }
    private freeStrategy= new SimpleWindowStrategy(2)
    private premiumStrategy= new NoLimitStrategy()
    freeTier() {
        console.log("@ Free user request")

        this.apiGateWay.setStrategy(this.freeStrategy)
        this.apiGateWay.applyRateLimit("free@userid")
        console.log()
        console.log()
    }
    premiumTier() {
        console.log("@ Premium user request")
        this.apiGateWay.setStrategy(this.premiumStrategy)
        this.apiGateWay.applyRateLimit('premium@userid')
         console.log()
        console.log()
    }
}

let gateWay = new ApiGateway()
let app = new MainApp(gateWay)
app.freeTier()
app.premiumTier

app.freeTier()
app.freeTier()
app.freeTier()

app.premiumTier()
app.premiumTier()
