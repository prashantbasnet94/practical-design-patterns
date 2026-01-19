export class ChaosService {
  async send(message: string): Promise<string> {
    const random = Math.random();
    // 30% chance of immediate failure
    if (random < 0.3) throw new Error("Service Unavailable (503)");
    
    // 30% chance of timeout (hangs for 2s then fails)
    if (random < 0.6) {
      await new Promise(r => setTimeout(r, 2000));
      throw new Error("Gateway Timeout (504)");
    }

    return `Sent: ${message}`;
  }
}

export class NotificationSender {
  // Circuit Breaker State
  private failures = 0;
  private lastFailureTime = 0;
  private readonly FAILURE_THRESHOLD = 3;
  private readonly COOL_DOWN_PERIOD = 5000; // 5 seconds

  constructor(private service: ChaosService) {}

  async sendSafe(message: string): Promise<string> {
    // 1. Check Circuit Breaker BEFORE calling
    if (this.isCircuitOpen()) {
       throw new Error("🔌 Circuit Breaker is OPEN. Request blocked.");
    }

    // 2. Retry Logic (Exponential Backoff)
    const maxRetries = 3;
    let delay = 1000; // Start with 1 second

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const result = await this.service.send(message);
        
        // Success! Reset circuit health
        this.resetCircuit();
        return result;

      } catch (error) {
        console.warn(`⚠️ Attempt ${attempt} failed.`);

        // If this was the last attempt, record the failure for the Circuit Breaker
        if (attempt === maxRetries) {
          this.recordFailure();
          throw error;
        }

        // Wait before retrying (Exponential: 1s -> 2s -> 4s)
        await this.sleep(delay);
        delay *= 2; 
      }
    }

    throw new Error("Unreachable");
  }

  // --- Helper Methods ---

  private isCircuitOpen(): boolean {
    if (this.failures >= this.FAILURE_THRESHOLD) {
      const timeSinceLastFailure = Date.now() - this.lastFailureTime;
      
      // If enough time has passed, allow a retry (Half-Open)
      if (timeSinceLastFailure > this.COOL_DOWN_PERIOD) {
        return false;
      }
      return true; // Still waiting for cool down
    }
    return false;
  }

  private recordFailure() {
    this.failures++;
    this.lastFailureTime = Date.now();
    console.error(`💥 Failure recorded. Total consecutive failures: ${this.failures}`);
  }

  private resetCircuit() {
    if (this.failures > 0) {
      console.log("✅ Service recovered. Circuit Closed.");
      this.failures = 0;
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(r => setTimeout(r, ms));
  }
}
