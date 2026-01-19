/**
 * THE COMPLETE RESILIENCE MODEL
 * (Circuit Breaker + Retry with Exponential Backoff)
 *
 * 1. GUARD: Check if Circuit is Broken.
 * 2. RETRY LOOP: Try X times.
 * 3. BACKOFF: If fail, wait 1s, 2s, 4s...
 * 4. TRIP: If all retries fail, Open Circuit.
 */

enum State {
  OPEN,
  CLOSED,
  HALFOPEN
}

export class Breaker {
  state: State = State.CLOSED;
  constructor(private request: () => Promise<string>) {}
  failureCount = 0;
  lastFailure: number | null = null;
  private readonly TotalAttempt = 3;
  private readonly coolDown = 5000;

  async execute() {
    this.updateState();
    if (this.state === State.OPEN) {
      throw new Error('Circuit breaker is open, so halting futher reqest');
    }
    try {
      let result = await this.request();
      this.onSucess();
      return result;
    } catch (err) {
      this.onFailure();
      throw new Error('Request Failed');
    }
  }
  onSucess() {
    this.failureCount = 0;
    this.lastFailure = null;
    this.state = State.CLOSED;
  }
  onFailure() {
    this.lastFailure = Date.now();
    this.failureCount++;
    if (this.TotalAttempt <= this.failureCount) {
      this.state = State.OPEN;
    }
  }
  updateState() {
    if (this.state === State.OPEN && this.lastFailure) {
      if (this.coolDown < Date.now() - this.lastFailure) {
        this.state = State.HALFOPEN;
      }
    }
  }
}
