# Rate Limiter

## Objective
Design a Rate Limiter class that decides whether a request from a specific client should be allowed or denied based on a predefined rule (e.g., "N requests per T seconds"). This tests your understanding of **Queues**, **Hash Maps**, and **Sliding Windows**.

## Functional Requirements

1.  **`allowRequest(clientId: string): boolean`**
    *   Returns `true` if the request is allowed.
    *   Returns `false` if the client has exceeded the limit.

## Constraints
*   **Window Size:** 10 seconds.
*   **Limit:** 3 requests per window.
*   **Granularity:** Assume `Date.now()` is sufficient for timestamps.
*   **Memory:** Cleanup old timestamps to prevent memory leaks (optional advanced step).

## Example

```typescript
const limiter = new RateLimiter(3, 10000); // 3 requests per 10000ms (10s)

limiter.allowRequest("user1"); // true (1st)
limiter.allowRequest("user1"); // true (2nd)
limiter.allowRequest("user1"); // true (3rd)
limiter.allowRequest("user1"); // false (4th - limit reached)

// ... wait 11 seconds ...
limiter.allowRequest("user1"); // true (window slid)
```
