
/**
 * CIRCUIT BREAKER PATTERN - FROM THE GROUND UP
 * 
 * CONCEPT:
 * Imagine a light switch in your house. 
 * - CLOSED: Electricity flows, lights are ON.
 * - OPEN: Electricity stops, lights are OFF.
 * 
 * In software:
 * - CLOSED (Normal): We allow requests to go to the external service.
 * - OPEN (Broken): We BLOCK requests immediately because we know the service is down.
 * - HALF-OPEN (Testing): We let ONE request through to see if the service is fixed.
 * 
 * WHY?
 * To prevent waiting for a service that we know is broken. It fails fast!
 */

// 1. THE PROBLEM: A Flaky Service
// This simulates an API that fails 50% of the time.
class FlakyService {
    async getData(): Promise<string> {
        const random = Math.random();
        if (random < 0.5) {
            throw new Error("💥 Service Failed!");
        }
        return "✅ Service Data";
    }
}

// 2. THE SOLUTION: The Circuit Breaker
// It wraps the service and manages the state (Closed/Open).
class CircuitBreaker {
    private service: FlakyService;
    
    private failureCount: number = 0;       // How many times it failed in a row
    private failureThreshold: number = 3;   // Stop after 3 failures
    
    private isOpen: boolean = false;        // Is the circuit broken?
    private lastFailureTime: number = 0;    // When did it last fail?
    private recoveryTime: number = 3000;    // Wait 3 seconds before trying again

    constructor(service: FlakyService) {
        this.service = service;
    }

    async execute(): Promise<string> {
        // A. CHECK: Is the circuit OPEN?
        if (this.isOpen) {
            // Check if enough time has passed to try again (Half-Open logic)
            if (Date.now() - this.lastFailureTime > this.recoveryTime) {
                console.log("⏳ Recovery time passed. Trying one request... (HALF-OPEN)");
                // We don't return here; we proceed to try the request below.
            } else {
                // Fail immediately without calling the service
                return "🛑 BLOCKED by Circuit Breaker (Fast Fail)";
            }
        }

        // B. EXECUTE: Try to call the service
        try {
            const result = await this.service.getData();
            
            // SUCCESS: Reset everything
            this.reset();
            return result;

        } catch (error) {
            // FAILURE: Count it
            this.recordFailure();
            return "⚠️ Request Failed (Recorded)";
        }
    }

    private recordFailure() {
        this.failureCount++;
        this.lastFailureTime = Date.now();
        console.log(`   -> Failures: ${this.failureCount}/${this.failureThreshold}`);

        if (this.failureCount >= this.failureThreshold) {
            this.isOpen = true;
            console.log("🔌 TOO MANY FAILURES! Opening Circuit. (Requests will be blocked)");
        }
    }

    private reset() {
        if (this.isOpen) {
            console.log("⚡ Service Recovered! Closing Circuit. (Normal flow resumed)");
        }
        this.failureCount = 0;
        this.isOpen = false;
    }
}

// 3. DEMO: Running it
async function runDemo() {
    const service = new FlakyService();
    const breaker = new CircuitBreaker(service);

    console.log("--- STARTING REQUESTS ---");

    // We make 10 requests rapidly
    for (let i = 1; i <= 10; i++) {
        const result = await breaker.execute();
        console.log(`Req ${i}: ${result}`);
        
        // Sleep a little bit between requests (500ms)
        await new Promise(r => setTimeout(r, 500));
    }
}

runDemo();
