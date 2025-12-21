/**
 * PATTERN: SINGLETON
 * 
 * Definition: 
 * Ensures a class has only one instance and provides a global point of access to it.
 * 
 * Real World Context:
 * to ensure we don't accidentally create multiple connections to the database or 
 * multiple logging writers.
 * 
 * YOUR TASK:
 * 1. Make the `DatabaseConnection` class a Singleton.
 * 2. Ensure `new DatabaseConnection()` fails or is not possible.
 * 3. Implement `getInstance()` to return the same instance every time.
 */

class DatabaseConnection {
    // TODO: Add a private static property to hold the instance

    // TODO: Make the constructor private to prevent `new DatabaseConnection()`
    constructor() {
        console.log("Connecting to database...");
        this.connect();
    }

    private connect() {
        // Simulate connection
        console.log("Database connected! ID:", Math.random());
    }

    // TODO: Implement the public static getInstance() method
    static getInstance(): DatabaseConnection {
        // Check if instance exists, if not create it
        // Return the instance
        throw new Error("Method not implemented.");
    }

    public query(sql: string) {
        console.log(`Executing: ${sql}`);
    }
}

// --- VERIFICATION ---
// Run this file with: npx tsx src/design-patterns/1.singleton.practice.ts

try {
    console.log("--- TEST START ---");

    // This should eventually work:
    // const db1 = DatabaseConnection.getInstance();
    // const db2 = DatabaseConnection.getInstance();

    // if (db1 === db2) {
    //   console.log("✅ SUCCESS: Both instances are the same!");
    //   db1.query("SELECT * FROM users");
    // } else {
    //   console.log("❌ FAIL: Instances are different");
    // }

    console.log("--- TEST END ---");
} catch (e) {
    console.error("❌ ERROR:", e);
}
