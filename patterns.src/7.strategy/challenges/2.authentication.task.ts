/**
 * CHALLENGE 2: AUTHENTICATION SYSTEM (The "Passport.js" Pattern)
 * 
 * Scenario:
 * You are building a secure login system.
 * Users want to login with:
 * 1. Username/Password (Standard)
 * 2. Google OAuth (Social)
 * 3. Magic Link (Passwordless)
 * 
 * Problem:
 * Each method requires different parameters (user/pass vs token vs email).
 * How do we create a unified `login()` interface?
 * 
 * Hint:
 * You might need a `Credentials` type that is flexible, or standard method signatures.
 * 
 * Task:
 * 1. Create `IAuthStrategy`.
 * 2. Implement `LocalStrategy` (checks mock DB).
 * 3. Implement `GoogleStrategy` (simulates API call).
 * 4. Implement `MagicLinkStrategy` (simulates email send).
 */

type Credentials = {
    username?: string;
    password?: string;
    token?: string;
    email?: string;
};

// --- 1. Strategy Interface ---
interface IAuthStrategy {
    authenticate(creds: Credentials): boolean;
}

// --- 2. Concrete Strategies ---

class LocalAuthStrategy {
    // TODO: Verify username/password exists
}

class GoogleOAuthStrategy {
    // TODO: Verify token starts with "GOOG_"
}

class MagicLinkStrategy {
    // TODO: Log "Sending magic link to {email}"
}

// --- 3. Context ---

class AuthContext {
    private strategy: IAuthStrategy;

    constructor(strategy: IAuthStrategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy: IAuthStrategy) {
        this.strategy = strategy;
    }

    login(creds: Credentials) {
        // TODO: Delegate
    }
}

// --- Verification ---
console.log("--- Auth Challenge ---");
// const auth = new AuthContext(new LocalStrategy());
// auth.login({username: "admin", password: "123"});

// auth.setStrategy(new GoogleOAuthStrategy());
// auth.login({token: "GOOG_TOKEN_123"});
