/**
 * REFACTORING CHALLENGE 1: LEGACY AUTH SYSTEM
 * 
 * SMELLS:
 * 1. Global State (`currentUser`, `isAuthenticated` vars floating around).
 * 2. Tight Coupling (Directly checking "google" or "github").
 * 3. Violates Open/Closed (Adding "Twitter" login means changing the core function).
 * 
 * GOAL:
 * Refactor this to use:
 * 1. **Singleton Pattern**: To manage the user state (SessionManager).
 * 2. **Strategy Pattern**: To handle the different login providers (AuthProvider).
 */

// --- LEGACY SPAGHETTI CODE ---

let isAuthenticated = false;
let currentUser: any = null;

function login(type: string, payload: any) {
    console.log(`Attempting login with ${type}...`);

    if (type === 'google') {
        if (!payload.oauthToken) {
            console.log("Google login failed: Missing token");
            return;
        }
        // ... complex google logic ...
        console.log("Google login success!");
        currentUser = { id: 1, name: "Google User", email: payload.email };
        isAuthenticated = true;

    } else if (type === 'github') {
        if (!payload.apiKey) {
            console.log("GitHub login failed: Missing API Key");
            return;
        }
        // ... complex github logic ...
        console.log("GitHub login success!");
        currentUser = { id: 2, name: "GitHub User", username: payload.username };
        isAuthenticated = true;

    } else {
        console.log("Unknown login type");
    }
}

function logout() {
    console.log("Logging out...");
    isAuthenticated = false;
    currentUser = null;
}

// --- USAGE ---
login('google', { email: 'me@gmail.com', oauthToken: 'abc' });
console.log("Current User:", currentUser);

login('github', { username: 'dev', apiKey: 'xyz' }); // Overwrites global state!
console.log("Current User:", currentUser);
