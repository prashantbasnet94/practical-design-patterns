
import { RedisClient } from "../../infrastructure/redis.client";

export class AnalyticsService {
    constructor(private readonly redis: RedisClient) {}

    async trackEvent(payload: any) {
        // 1. Validate (Fast)
        if (!payload.userId) throw new Error("Invalid User");

        // 2. Transform/Enrich (Fast)
        const event = {
            ...payload,
            serverTimestamp: Date.now()
        };

        // 3. Send to Buffer (Fast - <2ms)
        // We do NOT await the DB here. We dump it in Redis and return.
        await this.redis.lpush("analytics_queue", JSON.stringify(event));
    }
}
