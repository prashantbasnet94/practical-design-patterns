export class Connection {
  id: number;
  constructor(id: number) {
    this.id = id;
    console.log(`Connection ${this.id} created.`);
  }

  query(sql: string): void {
    console.log(`Connection ${this.id} executing: ${sql}`);
  }

  close(): void {
    console.log(`Connection ${this.id} closed.`);
  }
}

export class ConnectionPool {
  private available: Connection[] = [];
  private inUse: Connection[] = [];
  private maxParams: number = 5;

  constructor(maxSize: number) {
    this.maxParams = maxSize;
  }

  // TODO: Implement acquire logic
  async acquire(): Promise<Connection> {
    throw new Error("Not implemented");
  }

  // TODO: Implement release logic
  release(connection: Connection): void {
    throw new Error("Not implemented");
  }
}
