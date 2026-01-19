export interface DataPoint {
  sensorId: string;
  value: number;
  timestamp: number;
}

export class DataQueue {
  private queue: DataPoint[] = [];
  private limit: number;

  constructor(limit: number) {
    this.limit = limit;
  }

  // TODO: Implement enqueue with backpressure strategy
  push(data: DataPoint): boolean {
    return false;
  }

  pop(): DataPoint | undefined {
    return this.queue.shift();
  }
}

export class Worker {
  // TODO: Implement processing loop that pulls from queue
  async start(queue: DataQueue) {
      while(true){
        let data = queue.pop()
        console.log("Prcoessing: " , data?.sensorId, data?.timestamp)
      }
  }
}
