/**
 * EXERCISE: Singleton Pattern - Configuration Manager
 *
 * SCENARIO:
 * You're building an application that needs a centralized configuration manager.
 * The config should be loaded once and shared across the entire application.
 * Multiple parts of your app should access the SAME configuration instance.
 *
 * YOUR TASKS:
 * 1. Implement ConfigManager as a Singleton
 * 2. Add methods: get(key), set(key, value), getAll()
 * 3. Prevent direct instantiation with `new ConfigManager()`
 * 4. Ensure getInstance() always returns the same instance
 *
 * BONUS CHALLENGE:
 * - Add a method to load config from an object: loadConfig(config: Record<string, any>)
 * - Make sure config can only be loaded once (subsequent calls should be ignored)
 */

class ConfigManager {
    // TODO: Your implementation here
    private static instance: ConfigManager
    private loaded = false
    constructor(private config: Map<string, any>) {
        console.log("Loading configuration...");
    }
    loadConfig(config: Record<string, any>) {
        if (!this.loaded) {
            this.loaded = true
            for (let [key, value] of Object.entries(config)) {
                this.set(key, value)
            }
        }

    }

    get(key: string): any {
        return this.config.get(key)
    }

    set(key: string, value: any): void {
        this.config.set(key, value)
    }

    getAll(): Record<string, any> {
        return Object.fromEntries(this.config)
    }
    static getInstance() {
        if (!ConfigManager.instance) {
            ConfigManager.instance = new ConfigManager(new Map())
        }
        return ConfigManager.instance
    }
}

// --- TESTS ---
// Uncomment when ready to test

const config1 = ConfigManager.getInstance();
const config2 = ConfigManager.getInstance();

config1.set('apiUrl', 'https://api.example.com');
config1.set('timeout', 5000);

console.log(config2.get('apiUrl')); // Should print: https://api.example.com
console.log(config1 === config2); // Should print: true
console.log(config1.getAll()); // Should print all config

export { };
