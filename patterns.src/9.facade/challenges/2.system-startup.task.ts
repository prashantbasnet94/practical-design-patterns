/**
 * CHALLENGE 2: SYSTEM BOOTSTRAPPER FACADE
 * 
 * CONTEXT:
 * A backend server (like a Node app) needs to start many services in a specific order:
 * Logger -> Config -> Database -> Cache -> HTTP Server.
 * 
 * GOAL:
 * Create a `ServerFacade` with `start()` and `shutdown()` methods.
 * 
 * REQUIREMENTS:
 * 1. `start()`: Must initialize systems in the correct order.
 * 2. `shutdown()`: Must stop systems in REVERSE order.
 */

class Logger {
    init() { console.log("[Logger] Ready"); }
    close() { console.log("[Logger] Closed"); }
}

class Database {
    connect() { console.log("[DB] Connected"); }
    disconnect() { console.log("[DB] Disconnected"); }
}

class Cache {
    connect() { console.log("[Cache] Connected"); }
    disconnect() { console.log("[Cache] Disconnected"); }
}

class Server {
    listen(port: number) { console.log(`[HTTP] Listening on ${port}`); }
    stop() { console.log("[HTTP] Stopped"); }
}

export class BackendFacade {
    // TODO: Maintain references

    start() {
        // TODO: correct order
    }

    shutdown() {
        // TODO: reverse order
    }
}

// --- TEST CASE ---
try {
    const app = new BackendFacade();
    app.start();

    console.log("--- App is running ---");

    app.shutdown();

} catch (e) {
    console.error(e);
}
