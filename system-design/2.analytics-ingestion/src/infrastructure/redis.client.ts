
// Mocking Redis (The Shock Absorber)
// In a real app, this would wrap 'ioredis' or 'redis' package
export class RedisClient {
    private queue: any[] = [];

    // LPUSH: Extremely fast, in-memory operation (The "Tip Jar")
    async lpush(key: string, item: string): Promise<void> {
        // In real life: await redis.lpush(key, item);
        this.queue.push(item); 
    }

    // RPOP + Count: Simulate pulling a batch (The "Grab Handful")
    async rpopBatch(key: string, count: number): Promise<string[]> {
        const batch = this.queue.splice(0, count);
        return batch;
    }
}
