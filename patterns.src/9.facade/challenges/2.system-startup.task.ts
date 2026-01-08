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
    private logger: Logger
    private db: Database
    private cache: Cache
    private server: Server
    constructor() {
        this.logger = new Logger()
        this.db = new Database()
        this.cache = new Cache()
        this.server = new Server()
    }
    start() {
        this.logger.init()
        this.db.connect()
        this.cache.connect()
        this.server.listen(3000)
    }

    shutdown() {
          this.logger.close()
        this.db.disconnect()
        this.cache.disconnect()
        this.server.stop()
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
