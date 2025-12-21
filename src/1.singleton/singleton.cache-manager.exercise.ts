/**
 * EXERCISE: Singleton Pattern - Cache Manager
 *
 * SCENARIO:
 * Build a cache manager that stores frequently accessed data in memory.
 * The cache should be shared across the entire application to avoid duplicate data.
 *
 * YOUR TASKS:
 * 1. Implement CacheManager as a Singleton
 * 2. Add methods:
 *    - set(key, value, ttl?) - store value with optional time-to-live in seconds
 *    - get(key) - retrieve value if exists and not expired
 *    - delete(key) - remove from cache
 *    - clear() - clear all cache
 *    - has(key) - check if key exists and is valid
 *
 * BONUS CHALLENGE:
 * - Implement TTL (time-to-live) so cached items expire after a certain time
 * - Add a stats() method that returns cache hit/miss count
 */

interface CacheItem {
    value: any;
    expiresAt?: number;
}

class CacheManager {
    // TODO: Your implementation here
    private static instance: CacheManager
    constructor(private hit: number, private miss: number, private cache: Map<string, any>) {
        console.log("Initializing cache...");
    }

    set(key: string, value: any, ttlSeconds?: number): void {
        //if new set for same keuy coes in we gonna over ride and delete the prev timeout?
        if (this.cache.has(key)) {
            let { timeoutId } = this.cache.get(key)
            clearTimeout(timeoutId)
        }
        let timeoutId
        if (ttlSeconds) {
             timeoutId = setTimeout(() => {
                this.cache.delete(key)
            }, ttlSeconds * 1000)
        }

        this.cache.set(key, {
            value,
            timeoutId
        })
    }

    get(key: string): any {
        if (this.cache.has(key)) {
            this.hit++
            return this.cache.get(key).value
        }
        this.miss++
        return undefined
    }

    delete(key: string): boolean {
        if (this.cache.has(key)) {
            this.cache.delete(key)
            return true
        }
        return false
    }

    clear(): void {
        this.cache = new Map()
    }

    has(key: string): boolean {
        return this.cache.has(key)
    }
    stats() {
        return {
            hit: this.hit,
            miss: this.miss
        }
    }
    static getInstance() {
        if (!CacheManager.instance) {
            CacheManager.instance = new CacheManager(0, 0, new Map())
        }
        return CacheManager.instance
    }
}

// --- TESTS ---
// Uncomment when ready to test

const cache1 = CacheManager.getInstance();
const cache2 = CacheManager.getInstance();

cache1.set('user:1', { name: 'John', age: 30 });
cache1.set('user:2', { name: 'Jane', age: 25 }, 2); // Expires in 2 seconds

console.log(cache2.get('user:1')); // Should print: { name: 'John', age: 30 }
console.log(cache1 === cache2); // Should print: true

setTimeout(() => {
    console.log(cache1.get('user:2')); // Should print: undefined (expired)
}, 2500);

export { };
