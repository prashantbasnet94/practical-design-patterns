export interface Request {
    id: string;
    userId: string;
    token?: string;
    body: any;
    meta: {
        timestamp: number;
        sourceIp: string;
    };
}

export interface Response {
    statusCode: number;
    data: any;
    error?: string;
}

export class RequestProcessor {
    // Simulating a simple in-memory cache
    private cache: Map<string, any> = new Map();

    process(req: Request): Response {
        console.log(`[Processor] Starting processing for request ${req.id}`);

        // 1. Logging Logic (Mixed in)
        const startTime = Date.now();
        console.log(`[Log] Incoming request from ${req.meta.sourceIp} at ${startTime}`);

        // 2. Authentication Logic (Hardcoded)
        if (!req.token || req.token !== "valid-secret-token") {
            console.log(`[Auth] Authentication failed for user ${req.userId}`);
            return {
                statusCode: 401,
                data: null,
                error: "Unauthorized"
            };
        }
        console.log(`[Auth] User ${req.userId} authenticated.`);

        // 3. Validation Logic (Hardcoded)
        if (!req.body || !req.body.payload) {
            console.log(`[Validation] Invalid body for request ${req.id}`);
            return {
                statusCode: 400,
                data: null,
                error: "Bad Request: Missing payload"
            };
        }

        // 4. Caching Logic (Hardcoded)
        const cacheKey = `${req.userId}:${req.id}`;
        if (this.cache.has(cacheKey)) {
            console.log(`[Cache] Cache hit for ${cacheKey}`);
            return {
                statusCode: 200,
                data: this.cache.get(cacheKey)
            };
        }

        // 5. Core Business Logic
        // Simulate processing...
        const processedData = {
            result: "PROCESSED: " + req.body.payload.toUpperCase(),
            processedAt: Date.now()
        };

        // Save to cache
        this.cache.set(cacheKey, processedData);
        
        console.log(`[Processor] Request ${req.id} processed successfully.`);

        return {
            statusCode: 200,
            data: processedData
        };
    }
}
