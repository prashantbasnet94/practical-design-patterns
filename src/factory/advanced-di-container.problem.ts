export { }

/**
 * PATTERN: ADVANCED DEPENDENCY INJECTION CONTAINER (The "Super Factory")
 * 
 * SCENARIO: 
 * Real-world apps have layers: Infrastructure -> Repositories -> Services.
 * Services should NEVER talk to the DB directly; they use Repositories.
 * Repositories use Infrastructure (DB Connection, Logger).
 * 
 * YOUR TASK:
 * 1. Define types: `Infrastructure`, `Repositories`, `Services`.
 * 2. Implement `ServiceFactory` with `initialize()` that creates them IN ORDER:
 *    - Step 1: Create Infrastructure (Logger, DB)
 *    - Step 2: Create Repositories (Inject DB + Logger)
 *    - Step 3: Create Services (Inject Repositories + Logger)
 * 3. Return a Typed Container so we can do `container.services.authService.login()`.
 */

// --- 1. INFRASTRUCTURE LAYER (Low Level) ---
class Logger {
    info(msg: string) { console.log(`[LOG] ${msg}`); }
}
class Database {
    query(sql: string) { console.log(`[DB] Executing: ${sql}`); }
}
class RedisCache {
    get(key: string) { console.log(`[CACHE] Checking ${key}`); return null; }
    set(key: string, val: string) { console.log(`[CACHE] Setting ${key}=${val}`); }
}

// --- 2. REPOSITORY LAYER (Data Access) ---
class UserRepository {
    constructor(
        private db: Database,
        private cache: RedisCache, // INDUSTRY STANDARD: Repos use Cache + DB
        private logger: Logger
    ) { }

    save(user: string) {
        this.logger.info(`Saving user ${user}`);
        this.cache.set(`user:${user}`, 'exists');
        this.db.query(`INSERT INTO users VALUES ('${user}')`);
    }
}

// --- 3. SERVICE LAYER (Business Logic) ---
class AuthService {
    constructor(private userRepo: UserRepository, private logger: Logger) { }

    register(username: string) {
        this.logger.info(`Registering ${username}...`);
        this.userRepo.save(username);
    }
}

// --- CONFIG ---
const config = { dbUrl: "postgres://..." };

// ❌ MESSY CODE (Refactor this into a ServiceFactory!)
// Right now we are manually wiring everything. Imagine if we had 50 services!
const logger = new Logger();
const db = new Database();
const cache = new RedisCache(); // New Infrastructure!
const userRepo = new UserRepository(db, cache, logger); // Updated Dependency!
const authService = new AuthService(userRepo, logger);

authService.register("alice_dev");

// YOUR GOAL:
// const container = ServiceFactory.getInstance().initialize(config);
// container.services.authService.register("alice_super_admin");


class ServiceFactory{
    private static instance : ServiceFactory
    private constructor(){}
    private authService!: AuthService
    private userRepository!: UserRepository
    private redisCache!: RedisCache
    private database!: Database
    private logger!: Logger
    private services: 

    initialize(){
        this.logger = new Logger()
        this.redisCache = new RedisCache()
        this.database = new Database()
        this.userRepository = new UserRepository(this.database, this.redisCache, this.logger)
        this.authService = new AuthService(this.userRepository, this.logger)
    }
    static getInstance(){
        if(!ServiceFactory.instance){
            ServiceFactory.instance = new ServiceFactory()
        }
        return ServiceFactory.instance
    }
    getAuthService(){
        return this.authService
    }
    getUserRepository(){
        return this.userRepository
    }
    getDatabase(){
        return this.database
    }
    getLogger(){
        return this.logger
    }
    getRedisCache(){
        return this.redisCache
    }

}


const container = ServiceFactory.getInstance().initialize(config);
container.services.authService.register("alice_super_admin");
