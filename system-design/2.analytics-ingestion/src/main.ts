
import { RedisClient } from "./infrastructure/redis.client";
import { AnalyticsRepository } from "./infrastructure/postgres.repo";
import { AnalyticsService } from "./modules/analytics/analytics.service";
import { AnalyticsController } from "./modules/analytics/analytics.controller";
import { AnalyticsWorker } from "./workers/analytics.worker";

async function main() {
    // 1. Setup Infrastructure (Singletons usually)
    const redis = new RedisClient();
    const repo = new AnalyticsRepository();

    // 2. Setup API Layer
    const service = new AnalyticsService(redis);
    const controller = new AnalyticsController(service);

    // 3. Setup Worker Layer
    const worker = new AnalyticsWorker(redis, repo);

    // ---------------------------------------------------------
    // SIMULATION
    // ---------------------------------------------------------

    // Start the Worker (in background)
    void worker.start();

    console.log("--- 🚀 High Traffic Simulation Starting ---");

    // Simulate 500 requests hitting the API
    const requests = [];
    for (let i = 0; i < 500; i++) {
        const req = { body: { userId: `user-${i}`, type: "CLICK" } };
        const res = { 
            status: (code: number) => ({ send: (msg: any) => {} }) // Mock response
        };
        
        // This is non-blocking!
        requests.push(controller.handlePostRequest(req, res));
    }

    // The API responds to all 500 users almost instantly
    await Promise.all(requests);
    console.log("--- ✅ API has responded to all 500 users (Buffered in Redis) ---");

    // Let the worker catch up
    setTimeout(() => {
        console.log("--- 🏁 Simulation End ---");
        worker.stop();
    }, 2000);
}

main();
