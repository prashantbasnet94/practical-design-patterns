export class ChaosService {
  async send(message: string): Promise<string> {
    const random = Math.random();
    // 30% chance of immediate failure
    if (random < 0.3) throw new Error('Service Unavailable (503)');

    // 30% chance of timeout (hangs for 2s then fails)
    if (random < 0.6) {
      await new Promise((r) => setTimeout(r, 2000));
      throw new Error('Gateway Timeout (504)');
    }

    return `Sent: ${message}`;
  }
}

export class NotificationSender {
  constructor(private service: ChaosService) {}

  // TODO: Implement Retries (Exponential Backoff) and Circuit Breaker
  async sendSafe(message: string): Promise<string> {
    // Currently unsafe:
    let data = await this.service.send(message);
    return data;
  }
  sleep(ms: number) {
    return new Promise((r) => setTimeout(r, ms));
  }
}
