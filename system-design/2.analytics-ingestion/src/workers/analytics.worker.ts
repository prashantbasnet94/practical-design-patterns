
import { RedisClient } from "../infrastructure/redis.client";
import { AnalyticsRepository } from "../infrastructure/postgres.repo";

/**
 * This runs in a completely separate process (e.g., a Kubernetes Deployment).
 * It is decoupled from the API.
 */
export class AnalyticsWorker {
    private isRunning = true;
    private readonly BATCH_SIZE = 100;

    constructor(
        private readonly redis: RedisClient,
        private readonly repo: AnalyticsRepository
    ) {}

    async start() {
        console.log("[Worker] 👷 Starting background processor...");
        
        while (this.isRunning) {
            // 1. Pull a batch from Redis
            const rawEvents = await this.redis.rpopBatch("analytics_queue", this.BATCH_SIZE);

            if (rawEvents.length > 0) {
                // 2. Parse
                const events = rawEvents.map(e => JSON.parse(e));

                // 3. Bulk Insert to DB (The Heavy Lift)
                try {
                    await this.repo.bulkInsert(events);
                } catch (e) {
                    console.error("[Worker] Failed to write batch. Retrying...", e);
                    // In real life: Push back to Redis or Dead Letter Queue (DLQ)
                }
            } else {
                // Sleep if queue is empty to save CPU
                await new Promise(r => setTimeout(r, 100));
            }
        }
    }

    stop() {
        this.isRunning = false;
    }
}
