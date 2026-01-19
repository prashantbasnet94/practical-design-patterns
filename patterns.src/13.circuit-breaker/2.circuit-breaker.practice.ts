
/**
 * CIRCUIT BREAKER PRACTICE
 * 
 * Your Task:
 * Implement the `execute` method in the CircuitBreaker class.
 * 
 * 1. Check if the circuit is OPEN.
 *    - If open, check if the "cool down" period has passed.
 *    - If cool down NOT passed, throw an error or return "BLOCKED".
 * 
 * 2. If the circuit is CLOSED (or Half-Open), try the service.
 *    - If success: Return data and RESET failures.
 *    - If failure: RECORD failure and check if we need to OPEN the circuit.
 */

class UnstableDatabase {
    private isDown = true; // It starts broken!
    
    constructor() {
        // It magically fixes itself after 2 seconds
        setTimeout(() => this.isDown = false, 2000);
    }

    async query(sql: string): Promise<string> {
        if (this.isDown) {
            throw new Error("Connection Refused");
        }
        return `Result for: ${sql}`;
    }
}

class SimpleCircuitBreaker {
    private db: UnstableDatabase;
    private failureCount = 0;
    private threshold = 3;
    private lastFailureTime = 0;
    private coolDownMs = 1000;

    constructor(db: UnstableDatabase) {
        this.db = db;
    }

    async execute(sql: string): Promise<string> {
        // --- TODO: START YOUR CODE HERE ---
        
        // 1. Check if we should block the request
        // Hint: Check failureCount >= threshold
        // Hint: Check Date.now() - lastFailureTime
        
        // 2. Try to call this.db.query(sql)
        // Hint: Use try/catch
        
        // 3. Handle Success (reset failures)
        
        // 4. Handle Failure (increment count, update time)
        
        return "Not Implemented"; 
        
        // --- TODO: END YOUR CODE HERE ---
    }
}

// --- TEST RUNNER ---
async function startPractice() {
    const db = new UnstableDatabase();
    const breaker = new SimpleCircuitBreaker(db);

    console.log("--- Practice Run ---");

    for (let i = 1; i <= 10; i++) {
        const start = Date.now();
        try {
            const result = await breaker.execute("SELECT * FROM users");
            console.log(`Req ${i}: ✅ ${result}`);
        } catch (e: any) {
            console.log(`Req ${i}: ❌ ${e.message || e}`);
        }
        await new Promise(r => setTimeout(r, 300)); // fast requests
    }
}

startPractice();
