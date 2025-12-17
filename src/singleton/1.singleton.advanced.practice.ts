export { }
/**
 * PATTERN: SINGLETON (ADVANCED)
 * 
 * CHALLENGE 1: Configuration Injection
 * 
 * Context:
 * Sometimes a Singleton needs configuration (like an API Key or Database URL) 
 * before it can be created. 
 * 
 * YOUR TASK:
 * 1. Create a `ConfigManager` singleton that stores an API Key.
 * 2. It should NOT be creatable without an API Key.
 * 3. If you call `getInstance()` without a key for the first time, it should THROW an error.
 * 4. Once initialized, subsequent calls to `getInstance()` should return the same instance.
 */

class ConfigManager {
    // TODO: Add private static instance
    private static instance: ConfigManager

    // TODO: Add private constructor that takes `apiKey`
    private constructor(apiKey: string) {
        this.apiKey = apiKey
    }

    // TODO: Implement public static getInstance(apiKey?: string)
    static getInstance(apiKey?: string) {
        if (!this.instance) {
            if (!apiKey) {
                throw new Error("Please provide api key")
            }
            this.instance = new ConfigManager(apiKey)
        }
        return this.instance
    }

    // Logic:
    // - If instance exists? Return it.
    // - If instance does NOT exist?
    //     - If apiKey provided? Create new instance.
    //     - If apiKey missing? Throw Error("Config required for first initialization").

    public apiKey: string;
}

/**
 * CHALLENGE 2: The "Global Logger" (Global Shared State)
 * 🌟 Context: Singletons are often used to share state (like logs) across the entire app.
 * s
 * TASK:
 * 1. Create a `Logger` Singleton.
 * 2. It should have an array `logs: string[]`.
 * 3. Add a method `log(message: string)` that pushes to the array.
 * 4. Add a method `printLogs()` that prints all logs with their index.
 * 5. Verify that two different parts of the app write to the SAME array.
 */

class Logger {
    // TODO: Singleton boilerplate (instance, private constructor, getInstance)
    private static instance: Logger

    // TODO: Instance property `logs` initialized to []
    private logs: string[] = []

    private constructor() { }

    // TODO: log(msg) method
    log(msg: string) {
        this.logs.push(msg)
    }

    // TODO: printLogs() method
    printLogs() {
        this.logs.forEach((log, index) => {
            console.log(`${index}: ${log}`)
        })
    }

    static getInstance() {
        if (!Logger.instance) {
            Logger.instance = new Logger()
        }
        return Logger.instance
    }
}

/**
 * CHALLENGE 3: The "Request Cache" (Memory Management)
 * 🌟 Context: Singletons are good for caching expensive data (API responses, computations).
 * 
 * TASK:
 * 1. Create `RequestCache` Singleton.
 * 2. It should hold a Map<string, any>.
 * 3. Add `set(key, value)` and `get(key)`.
 * 4. Add `clear()` to wipe the cache.
 */

class RequestCache {
    // TODO: Singleton boilerplate
    private static instance: RequestCache

    // TODO: private cache = new Map<string, any>()
    private cache: Map<string, any> = new Map()
    private constructor() { }

    // TODO: set/get/clear methods
    set(key: string, value: any) {
        this.cache.set(key, value)
        return true
    }

    get(key: string) {
        return this.cache.get(key)
    }
    // 2. Missing method from requirements
    clear() {
        this.cache.clear();
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new RequestCache()
        }
        return this.instance
    }
}


// --- VERIFICATION ---
try {
    console.log("--- TEST START: CONFIG MANAGER ---");

    // 1. This should FAIL (Error: Config required)
    try {
        const cfg = ConfigManager.getInstance();
    } catch (e) {
        console.log("✅ Correctly failed without config");
    }

    // 2. This should SUCCEED
    const cfg1 = ConfigManager.getInstance("SECRET_KEY_123");
    console.log("✅ Config initialized:", cfg1.apiKey);

    // 3. This should IGNORE the new key and return the OLD instance
    const cfg2 = ConfigManager.getInstance("NEW_KEY_456");

    if (cfg1 === cfg2 && cfg2.apiKey === "SECRET_KEY_123") {
        console.log("✅ SUCCESS: Singleton preserved the original instance!");
    } else {
        console.log("❌ FAIL: Instance was overwritten or different");
    }

    console.log("\n--- TEST START: LOGGER ---");
    // TODO: Uncomment when Logger is ready
    const logger1 = Logger.getInstance();
    logger1.log("User logged in");

    const logger2 = Logger.getInstance();
    logger2.log("User clicked button");

    logger1.printLogs();
    // Should print BOTH logs because they are the SAME logger!

    console.log("\n--- TEST START: REQUEST CACHE ---");
    const cache1 = RequestCache.getInstance();
    cache1.set("user_1", { name: "Alice" });

    const cache2 = RequestCache.getInstance();
    console.log("User 1 from cache2:", cache2.get("user_1")); // Should be { name: "Alice" }

    if (cache1 === cache2) {
        console.log("✅ SUCCESS: Cache instances are shared");
    }

    cache2.clear();
    console.log("Cache after clear:", cache1.get("user_1")); // Should be undefined

} catch (e) {
    console.error("❌ ERROR:", e);
}
