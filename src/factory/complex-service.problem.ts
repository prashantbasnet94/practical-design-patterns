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

// ❌ MESSY CLIENT CODE (Refactor this!)
class Factory {
    private static instance: Factory
    private db!: DatabaseConnection
    private userService!: UserService
    private authService!: AuthService
    private emailService!: EmailService

    private constructor() { }
    init(cfg: typeof config) {
        this.db = new DatabaseConnection(cfg.dbUrl)
        this.emailService = new EmailService(cfg.emailKey)
        this.userService = new UserService(this.db, this.emailService)
        this.authService = new AuthService(this.userService, cfg.jwtSecret)
    }
    static getInstance() {
        if (!Factory.instance) {
            Factory.instance = new Factory()
        }
        return Factory.instance
    }
    getAuthService() {
        return this.authService
    }
    getUserService() {
        return this.userService
    }
    getEmailService() {
        return this.emailService
    }
    getDatabaseConnection() {
        return this.db
    }
}

// ✅ CLEAN CLIENT CODE (Using your Factory!)
console.log("--- APP STARTING (WITH FACTORY) ---");

// 1. Initialize once
Factory.getInstance().init(config);

// 2. Get what you need
const authService = Factory.getInstance().getAuthService();
authService.login("alice@example.com");

console.log("--- APP FINISHED ---");