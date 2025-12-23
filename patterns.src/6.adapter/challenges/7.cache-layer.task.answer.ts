import { set } from "better-auth";

/**
 * CHALLENGE 7: SWAPPABLE CACHE LAYER (DEV vs PROD)
 *
 * Scenario:
 * - In Development: We want to run the app locally without needing a Redis server.
 * - In Production: We MUST use Redis for scalability.
 *
 * Problem:
 * Code using `Map` (local) is totally different from `RedisClient` (prod).
 *
 * Task:
 * Implement `RedisAdapter` and `MemoryAdapter` so the Application logic
 * doesn't care which environment it's running in.
 */
class Redis {
    get(key: string): string {
        console.log(`[REDIS] Getting ${key}`);
        return key + 'value'
    }
    setEx(key: string,  val: string, seconds: number) {
        console.log(`[REDIS] Setting ${key} = ${val} (Expires in ${seconds}s)`);
        return true
    }
}

class MemoryMap {
    constructor(private map: Map<string, string> = new Map()) { }
    put(key: string, value: string) {
        console.log(`[MEMORY] Setting ${key} = ${value}`);
        this.map.set(key, value)
    }
    fetch(key: string) {
        console.log("Memory Map: ", 'fettching')
        return this.map.get(key) || ''
    }
}

interface ICache{
    set(key: string, value: string): void
    get(key: string): string
}

class RedisAdapter implements ICache{
    constructor(private redis: Redis){}
    set(key: string, value: string) {
        console.log('REDIS ADAPTER: setting key')
        this.redis.setEx(key, value, 86400)
    }
    get(key: string): string {
        console.log('REDIS ADAPTER, getting key')
        return this.redis.get(key)
    }
}

class MemoryMapAdapter implements ICache{
    constructor(private memory: MemoryMap) { }
    set(key: string, value: string) {
        console.log("MemoryMapAdapter setting key")
        return this.memory.put(key,value)
    }
    get(key: string) {
        console.log("MemoryMapAdapter, getting key")
        return this.memory.fetch(key)
    }
}


class CacheFactory{
    private static instance: ICache
    static create(env: 'dev' | 'prod') {

        if (CacheFactory.instance) {
            console.log('Cache Factory: instance already exist, returning it')
            return this.instance
        }

        console.log("Cache factory: creating cache instance for ", env)
        if (env === 'dev') {
            this.instance = new MemoryMapAdapter(new MemoryMap())
        } else {
            this.instance = new RedisAdapter(new Redis())
        }
        return this.instance
    }
}

class App{
    constructor(private cache: ICache) { }
    saveUser(user: string, value: string) {
        this.cache.set(user, value)
    }
}

let cache = CacheFactory.create('prod')
let app = new App(cache)

app.saveUser('prashantbasnet', 'developer')