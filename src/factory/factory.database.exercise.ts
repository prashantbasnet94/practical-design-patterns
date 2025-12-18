/**
 * EXERCISE: Factory Pattern - Database Connection Factory
 *
 * SCENARIO:
 * Your application needs to support multiple database types.
 * Each database has different connection strings and query syntax.
 *
 * YOUR TASKS:
 * 1. Create an IDatabase interface with methods:
 *    - connect(): void
 *    - disconnect(): void
 *    - query(sql: string): void
 *    - getConnectionString(): string
 *
 * 2. Implement these database classes:
 *    - MySQLDatabase
 *    - PostgreSQLDatabase
 *    - MongoDBDatabase
 *
 * 3. Create a DatabaseFactory that returns the correct database instance
 *
 * BONUS CHALLENGE:
 * - Add connection pooling concept (max connections)
 * - Add a method to check if connected
 * - Implement different query logging for each database type
 */

// TODO: Define IDatabase interface

// TODO: Implement MySQLDatabase
// Connection string format: "mysql://localhost:3306/mydb"

// TODO: Implement PostgreSQLDatabase
// Connection string format: "postgresql://localhost:5432/mydb"

// TODO: Implement MongoDBDatabase
// Connection string format: "mongodb://localhost:27017/mydb"

type DatabaseType = 'mysql' | 'postgresql' | 'mongodb';

interface DatabaseConfig {
    host: string;
    port: number;
    database: string;
}

// TODO: Implement DatabaseFactory
function createDatabase(type: DatabaseType, config: DatabaseConfig) {
    throw new Error("Not implemented");
}

// --- TESTS ---
// Uncomment when ready to test

// const mysqlDb = createDatabase('mysql', { host: 'localhost', port: 3306, database: 'myapp' });
// mysqlDb.connect();
// mysqlDb.query('SELECT * FROM users');
// console.log(mysqlDb.getConnectionString());

// const mongoDb = createDatabase('mongodb', { host: 'localhost', port: 27017, database: 'myapp' });
// mongoDb.connect();
// mongoDb.query('db.users.find()');
// console.log(mongoDb.getConnectionString());

export {};
