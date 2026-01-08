import { RequestProcessor, Request } from './request-processor';

// Helper to simulate requests
function createRequest(id: string, userId: string, payload: string, token: string = "valid-secret-token"): Request {
    return {
        id,
        userId,
        token,
        body: { payload },
        meta: {
            timestamp: Date.now(),
            sourceIp: "192.168.1.10"
        }
    };
}

const processor = new RequestProcessor();

console.log("--- Request 1: Valid Request ---");
const req1 = createRequest("req-1", "user-1", "hello world");
const res1 = processor.process(req1);
console.log("Response:", res1);
console.log("\n");

console.log("--- Request 2: Invalid Token ---");
const req2 = createRequest("req-2", "user-2", "hack attempt", "invalid-token");
const res2 = processor.process(req2);
console.log("Response:", res2);
console.log("\n");

console.log("--- Request 3: Validation Error ---");
const req3 = createRequest("req-3", "user-3", "");
// Force body to be invalid for simulation
req3.body = {}; 
const res3 = processor.process(req3);
console.log("Response:", res3);
console.log("\n");

console.log("--- Request 4: Cache Hit (Repeating Request 1) ---");
const req4 = createRequest("req-1", "user-1", "hello world"); 
// Note: In a real system, ID might change, but we reuse it here to test cache key generation
const res4 = processor.process(req4);
console.log("Response:", res4);
