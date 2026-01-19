/**
 * CIRCUIT BREAKER TEMPLATE (Generic & Reusable)
 *
 * Use this as a blueprint for any external API or Database call.
 */

enum CircuitState {
  CLOSED, // Healthy: Requests allowed
  OPEN, // Broken: Requests blocked
  HALF_OPEN // Testing: One request allowed to check recovery
}

export class CircuitBreaker<T> {
  private state: CircuitState = CircuitState.CLOSED;
  private failureCount: number = 0;
  private lastFailureTime: number | null = null;

  // Configurable Settings
  private readonly threshold: number = 3; // Failures before opening
  private readonly cooldownMs: number = 5000; // Time to stay OPEN

  constructor(
    private request: () => Promise<T>, // The actual function to protect
    private fallbackValue?: T // Optional: What to return when blocked
  ) {}

  async execute(): Promise<T> {
    this.updateState();

    if (this.state === CircuitState.OPEN) {
      console.log('🔌 [CircuitBreaker] State: OPEN. Fast-failing request.');
      if (this.fallbackValue !== undefined) return this.fallbackValue;
      throw new Error('Circuit Breaker is OPEN');
    }

    try {
      const result = await this.request();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private updateState() {
    if (this.state === CircuitState.OPEN && this.lastFailureTime) {
      const now = Date.now();
      if (now - this.lastFailureTime > this.cooldownMs) {
        this.state = CircuitState.HALF_OPEN;
        console.log('⏳ [CircuitBreaker] State: HALF-OPEN. Testing service...');
      }
    }
  }

  private onSuccess() {
    this.failureCount = 0;
    this.state = CircuitState.CLOSED;
    this.lastFailureTime = null;
    console.log('✅ [CircuitBreaker] Request Success. State: CLOSED.');
  }

  private onFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();

    if (this.failureCount >= this.threshold) {
      this.state = CircuitState.OPEN;
      console.error(
        `💥 [CircuitBreaker] ${this.failureCount} failures. State: OPEN.`
      );
    }
  }
}

/**
 * EXAMPLE USAGE:
 *
 * const fetchUser = () => api.get('/user/1');
 *
 * const breaker = new CircuitBreaker(
 *    fetchUser,
 *    { id: 0, name: 'Guest' } // Fallback if API is down
 * );
 *
 * const user = await breaker.execute();
 */
