export class RateLimiter {
    limit: number;
    windowSize: number;

    constructor(limit: number, windowSize: number) {
        this.limit = limit;
        this.windowSize = windowSize;
        // Initialize storage
    }

    allowRequest(clientId: string): boolean {
        const now = Date.now();
        // TODO: Check if allowed
        return true;
    }
}

// --- Test Area ---
const limiter = new RateLimiter(2, 1000); // 2 requests per 1 second
console.log("Request 1:", limiter.allowRequest("A")); // true
console.log("Request 2:", limiter.allowRequest("A")); // true
console.log("Request 3:", limiter.allowRequest("A")); // false

setTimeout(() => {
    console.log("Request 4 (after 1s):", limiter.allowRequest("A")); // true
}, 1100);
