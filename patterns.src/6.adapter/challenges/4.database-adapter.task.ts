/**
 * CHALLENGE 4: THE LOGIC HEAVY ADAPTER (DATABASE)
 * 
 * Scenario:
 * Your modern app uses "Repositories" that talk to the database using clean objects.
 * e.g., `repo.find({ id: 5 })`.
 * 
 * Problem:
 * You are migrating to a very old SQL database engine.
 * It ONLY accepts raw SQL strings like "SELECT * FROM users WHERE id = 5".
 * 
 * Task:
 * Implement `SQLAdapter` that translates the `Query` object into a SQL string.
 */

// --- 1. Target Interface (Modern Way) ---
interface IDatabaseRepo {
    // Expected behavior: return "User {id}" or null
    find(query: { id: number }): string;
}

// --- 2. Adaptee (Old SQL Engine) ---
class OldSQLEngine {
    executeQuery(sql: string): string {
        console.log(`[Database] Executing: "${sql}"`);

        // Mock Response
        if (sql.includes("id = 1")) return "User 1 (Alice)";
        if (sql.includes("id = 42")) return "User 42 (Bob)";
        return "NULL";
    }
}

// --- 3. Client Code ---
class UserApp {
    constructor(private db: IDatabaseRepo) { }

    getUserName(userId: number) {
        const result = this.db.find({ id: userId });
        console.log(`App Result: ${result}`);
    }
}


// --- YOUR WORK STARTS HERE ---

class SQLAdapter implements IDatabaseRepo {
    constructor(private engine: OldSQLEngine) { }

    find(query: { id: number }): string {
        // TODO: 1. Construct the SQL string "SELECT * FROM users WHERE id = [ID]"
        // TODO: 2. Call this.engine.executeQuery(sql)
        // TODO: 3. Return the result
        return "TODO";
    }
}


// --- VERIFICATION ---
console.log("--- Challenge 4: Database SQL Adapter ---");

const engine = new OldSQLEngine();
const adapter = new SQLAdapter(engine);
const app = new UserApp(adapter);

app.getUserName(1);  // Should log: "User 1 (Alice)"
app.getUserName(42); // Should log: "User 42 (Bob)"
