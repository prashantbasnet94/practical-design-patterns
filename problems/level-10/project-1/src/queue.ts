export interface IDatapoint {
    sensorId: number;
    value: string;
    timeStamp: number;
}

export class Queue {
    // Encapsulate data so we control access
    private datapoints: IDatapoint[] = [];

    constructor(private limit: number) {}

    push(data: IDatapoint): boolean {
        // 1. Backpressure Check: Reject if queue is full
        if (this.datapoints.length >= this.limit) {
            console.warn(`[Queue] Full! Dropping data from Sensor ${data.sensorId}`);
            return false;
        }

        this.datapoints.push(data);
        return true;
    }

    // 2. Helper to get the next item (FIFO)
    pop(): IDatapoint | undefined {
        return this.datapoints.shift()
    }

    isEmpty(): boolean {
        return this.datapoints.length === 0;
    }
}

export class Worker {
    constructor(private queue: Queue) {}

    async process() {
        console.log("👷 Worker started...");

        // 3. Continuous Processing Loop
        while (true) {
            const item = this.queue.pop();

            if (item) {
                console.log(`[Worker] Processing Sensor ${item.sensorId}: "${item.value}"`);
                // Simulate slow processing (e.g., DB write)
                await this.delay(500); 
            } else {
                // If empty, wait a bit before checking again to save CPU
                await this.delay(100);
            }
        }
    }

    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
