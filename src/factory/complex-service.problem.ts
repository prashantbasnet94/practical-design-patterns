export { }

/**
 * PATTERN: ABSTRACT FACTORY / SERVICE LOCATOR
 * SCENARIO: Dependency Injection Hell
 * 
 * PROBLEM:
 * We have a simple app with:
 * 1. `DatabaseConnection` (Needs connection string)
 * 2. `EmailService` (Needs API Key)
 * 3. `UserService` (Needs Database + EmailService)
 * 4. `AuthService` (Needs UserService + Secret Key)
 * 
 * Currently, the "Client Code" has to manually wire everything together.
 * If we need `AuthService` in 5 different files, we have to copy-paste this messy setup 5 times!
 * 
 * YOUR TASK:
 * 1. Create a `ServiceFactory` Singleton.
 * 2. It should have a method `initialize(config)` that creates all instances once.
 * 3. It should have getters: `getAuthService()`, `getUserService()`, etc.
 * 4. Refactor the "Client Code" to just use the Factory.
 */

// --- DUMMY CLASSES (Do not change these) ---
class DatabaseConnection {
    constructor(public connectionString: string) {
        console.log(`[DB] Connected to ${connectionString}`);
    }
}

class EmailService {
    constructor(public apiKey: string) {
        console.log(`[Email] Service ready with key ${apiKey.substr(0, 4)}...`);
    }
    sendWelcomeEmail(email: string) {
        console.log(`[Email] Sending welcome to ${email}`);
    }
}

class UserService {
    constructor(public db: DatabaseConnection, public emailer: EmailService) { }

    createUser(email: string) {
        console.log(`[User] Creating user ${email} in DB...`);
        this.emailer.sendWelcomeEmail(email);
    }
}

class AuthService {
    constructor(public userService: UserService, public secret: string) { }

    login(email: string) {
        console.log(`[Auth] Logging in ${email} with secret ${this.secret.substr(0, 3)}...`);
        this.userService.createUser(email); // Simulate auto-signup
    }
}

// --- CONFIGURATION ---
const config = {
    dbUrl: "postgres://localhost:5432",
    emailKey: "SG.12345.SECRET",
    jwtSecret: "MY_SUPER_SECRET"
};

// ✅ SOLUTION: Service Factory
class ServiceFactory {
    private static instance: ServiceFactory;

    // Hold our services
    private authService: AuthService;
    private userService: UserService;
    private emailService: EmailService;
    private db: DatabaseConnection;

    private constructor() { }

    static getInstance(): ServiceFactory {
        if (!ServiceFactory.instance) {
            ServiceFactory.instance = new ServiceFactory();
        }
        return ServiceFactory.instance;
    }

    initialize(cfg: typeof config) {
        // 1. Create independent low-level services first
        this.db = new DatabaseConnection(cfg.dbUrl);
        this.emailService = new EmailService(cfg.emailKey);

        // 2. Inject them into higher-level services
        this.userService = new UserService(this.db, this.emailService);

        // 3. Inject THAT into the top-level service
        this.authService = new AuthService(this.userService, cfg.jwtSecret);

        console.log("✨ Service Factory Initialized All Dependencies");
    }

    getAuthService() {
        if (!this.authService) throw new Error("Not initialized");
        return this.authService;
    }

    getUserService() {
        if (!this.userService) throw new Error("Not initialized");
        return this.userService;
    }
}

// ✅ CLEAN CLIENT CODE
console.log("--- APP STARTING (WITH FACTORY) ---");

// 1. Initialize once
ServiceFactory.getInstance().initialize(config);

// 2. Get what you need (Client doesn't care about DB or Emails!)
const authService = ServiceFactory.getInstance().getAuthService();
authService.login("alice@example.com");

console.log("--- APP FINISHED ---");
