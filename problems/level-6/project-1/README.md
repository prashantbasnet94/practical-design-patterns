# Level 6, Project 1: The Middleware Tangle

## The Scenario

You are building a custom request processing pipeline for a high-performance backend service. This service handles incoming API requests (simulated as objects).

Currently, the `RequestProcessor` class handles everything in a single `handleRequest` method. It checks for authentication tokens, validates data, checks a cache, logs the request, and finally processes the business logic.

## The Problem

The `handleRequest` method in `src/request-processor.ts` is becoming unmaintainable. 
1.  **Rigidity:** You can't easily disable "Caching" for specific requests or reorder "Logging" to happen before "Authentication".
2.  **Coupling:** The processor knows too much about the specific implementation details of every step.
3.  **Violation of OCP:** Adding a new step (e.g., "Rate Limiting") requires modifying the core method.

## Your Goal

Refactor this monolithic flow into a **Chain of Responsibility** (or a Middleware Pipeline).

**Key Requirements:**

1.  Create an abstract `Handler` (or `Middleware`) interface.
2.  Implement separate classes for each step: `AuthHandler`, `ValidationHandler`, `CacheHandler`, `LoggingHandler`.
3.  Chain these handlers together dynamically in `src/main.ts` (or a `Server` configuration).
4.  The `RequestProcessor` should simply trigger the first handler in the chain.

**Bonus Challenge:**
Implement the chain such that a handler can decide *not* to pass the request to the next link (e.g., if Authentication fails, Validation should never run).
