export { };

/**
 * DECORATOR PATTERN CHALLENGE: Server Request Middleware
 *
 * SCENARIO:
 * You are simulating a web server.
 * You have a `ServerRequest` object with a `handle(request: string): void` method.
 * You want to add logging and authentication "middleware" dynamically WITHOUT modifying the core server logic.
 *
 * GOAL:
 * - `BaseServer`: Prints "Handling request: {req}"
 * - `LoggingMiddleware`: Prints "Log: Request started" before and "Log: Request finished" after handling.
 * - `AuthMiddleware`: Checks if request == "admin". If not, prints "403 Forbidden" and STOPS. If yes, calls next.
 *
 * TODO:
 * 1. Define `IServer` interface.
 * 2. Implement `BaseServer`.
 * 3. Implement Decorators.
 */

interface IServer {
    handle(request: string): void;
}

class BaseServer implements IServer {
    handle(request: string): void {
        console.log(`Handling core request processing for: ${request}`);
    }
}

// Implement LoggingMiddleware and AuthMiddleware here...

// === USAGE / TEST ===
// const server = new BaseServer();
// const authenticatedServer = new AuthMiddleware(server);
// const loggedAndAuthServer = new LoggingMiddleware(authenticatedServer);

// console.log("--- Request 1: User ---");
// loggedAndAuthServer.handle("user");
// // Expected: Log start -> 403 Forbidden -> Log finished (or just stop)

// console.log("\n--- Request 2: Admin ---");
// loggedAndAuthServer.handle("admin");
// // Expected: Log start -> Handling core... -> Log finished
