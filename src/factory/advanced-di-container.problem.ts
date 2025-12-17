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
class Logger{
   info(msg: string){
    console.log(msg)
   }
    
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

class OrgRepository{
    constructor(
        private db: Database,
        private cache: RedisCache,
        private logger: Logger
    ){}
    save(org: string){
        this.logger.info('saving org')
        this.cache.set(`org:${org}`,'exist')
        this.db.query('Insert')   
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

class ServiceFactory {
    private static instance: ServiceFactory
    private constructor() { }

    // Dependencies (managed by the factory)
    private authService!: AuthService
    private userRepository!: UserRepository
    private redisCache!: RedisCache
    private database!: Database
    private logger!: Logger

    initialize() {
        // 1. Infrastructure
        this.logger = new Logger()
        this.redisCache = new RedisCache()
        this.database = new Database()

        // 2. Repositories (Inject Infra)
        this.userRepository = new UserRepository(this.database, this.redisCache, this.logger)

        // 3. Services (Inject Repos)
        this.authService = new AuthService(this.userRepository, this.logger)

        return this; // Return instance for chaining!
    }

    static getInstance() {
        if (!ServiceFactory.instance) {
            ServiceFactory.instance = new ServiceFactory()
        }
        return ServiceFactory.instance
    }

    // Getters for the container usage
    getAuthService() {
        return this.authService
    }
    getUserRepository() {
        return this.userRepository
    }
    getDatabase() {
        return this.database
    }
    getLogger() {
        return this.logger
    }
    getRedisCache() {
        return this.redisCache
    }
}

// ✅ Correct usage
const container = ServiceFactory.getInstance().initialize();
container.getAuthService().register("alice_super_admin");
