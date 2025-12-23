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

interface IRepository {
    find(query: { id: number }): string
}
class CurrentSQLEngine implements IRepository {
    find(query: { id: number }): string {
        return "user found with " + query.id
    }
}
class MainApp {
    getUser() {
        let repo = new CurrentSQLEngine()
        repo.find({ id: 5 })

    }
}

//. now we wanna be able to migrate to old sql db engine

class OldSQLEngine {
    executeQuery(sql: string): string {
        console.log(`[Database] Executing: "${sql}"`);
        if (sql.includes("id = 1")) return "User 1 (Prashant)";
        if (sql.includes("id = 42")) return "User 42 (Bob)";
        return "NULL";
    }
}
class SQLAdapter implements IRepository {
    constructor(private sqlEngine: OldSQLEngine) { }
    find(query: { id: number }): string {
        return this.sqlEngine.executeQuery("SELECT * FROM USER, WHERE ID = "+ query.id)
    }
}

class UserApp {
    constructor(private repo: IRepository) { }
    getUserName(userId: number) {
        let result = this.repo.find({ id: userId })
        console.log("App result : ", result)
    }
}

let oldEngine = new OldSQLEngine()
let newAdapter = new SQLAdapter(oldEngine)
let mainApp = new UserApp(newAdapter)
let currentEngine = new CurrentSQLEngine()
let mainApp2 = new UserApp(currentEngine)


mainApp.getUserName(42)
mainApp2.getUserName(1)


/*
    1. pass the new service into the adapter
    2. pass the adapter base new service into the main app

*/