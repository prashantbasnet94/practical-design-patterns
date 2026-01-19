export interface Event {
  type: string;
  payload: any;
  timestamp: Date;
}

export class BankAccount {
  id: string;
  balance: number = 0;
  private changes: Event[] = [];

  constructor(id: string) {
    this.id = id;
  }

  // TODO: Create an event and apply it
  deposit(amount: number): void {
    // 1. Create 'Deposited' event
    // 2. Apply it (update balance)
    // 3. Add to changes
  }

  // TODO: Rebuild state from history
  static replay(events: Event[]): BankAccount {
    const account = new BankAccount("replayed");
    // Apply all events
    return account;
  }
}
