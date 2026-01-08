import { IRequest, IRequestProcessor, IResponse } from "./interface";





export class RequestProcessor implements IRequestProcessor {
    // Simulating a simple in-memory cache
    private cache: Map<string, any> = new Map();

    process(req: IRequest): IResponse {
        console.log(`[Processor] Starting processing for request ${req.id}`);



        // 5. Core Business Logic
        // Simulate processing...
        const processedData = {
            result: "PROCESSED: " + req.body.payload.toUpperCase(),
            processedAt: Date.now()
        };

        // Save to cache
        // this.cache.set(cacheKey, processedData);

        console.log(`[Processor] Request ${req.id} processed successfully.`);

        return {
            statusCode: 200,
            data: processedData
        };
    }

}
export abstract class RequestProcessorDecorator implements IRequestProcessor {
    constructor(private processor: IRequestProcessor) { }
    process(req: IRequest): IResponse {
        return this.processor.process(req)
    }
}

export class LoggingHandler extends RequestProcessorDecorator {
    process(req: IRequest): IResponse {
        // 1. Logging Logic (Mixed in)
        console.log(" Logging Logic ")
        const startTime = Date.now();
        console.log(`[Log] Incoming request from ${req.meta.sourceIp} at ${startTime}`);


        return super.process(req)
    }
}
export class AuthHandler extends RequestProcessorDecorator {
    process(req: IRequest): IResponse {
        // 2. Authentication Logic (Hardcoded)
        console.log("Authentication Logic")
        if (!req.token || req.token !== "valid-secret-token") {
            console.log(`[Auth] Authentication failed for user ${req.userId}`);
            return {
                statusCode: 401,
                data: null,
                error: "Unauthorized"
            };
        }
        console.log(`[Auth] User ${req.userId} authenticated.`);
        return super.process(req)
    }
}

export class ValidationHandler extends RequestProcessorDecorator {
    process(req: IRequest): IResponse {
        // 3. Validation Logic (Hardcoded)
        console.log(" Validation Logic")
        if (!req.body || !req.body.payload) {
            console.log(`[Validation] Invalid body for request ${req.id}`);
            return {
                statusCode: 400,
                data: null,
                error: "Bad Request: Missing payload"
            };
        }

        return super.process(req)
    }
}

export class CacheHandler extends RequestProcessorDecorator{
    private cache : Map < string, string> = new Map()
    process(req: IRequest): IResponse {
        // 4. Caching Logic (Hardcoded)
        const cacheKey = `${req.userId}:${req.id}`;
        if (this.cache.has(cacheKey)) {
            console.log(`[Cache] Cache hit for ${cacheKey}`);
            return {
                statusCode: 200,
                data: this.cache.get(cacheKey)
            };
        }

        let response = super.process(req)
        if (response.statusCode === 200) {
            this.cache.set(cacheKey, response.data)
        }
        return response
    }
}