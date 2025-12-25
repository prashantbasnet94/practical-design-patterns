/**
 * CHALLENGE 1: SQL QUERY BUILDER
 * 
 * INSTRUCTIONS:
 * Implement a `QueryBuilder` that allows you to construct a SQL query step-by-step.
 * It should support selecting fields, specifying the table, and adding multiple WHERE clauses.
 * 
 * REQUIREMENTS:
 * 1. `select(fields)`: specify columns (defaults to "*").
 * 2. `from(table)`: specify the table name.
 * 3. `where(condition)`: add a condition. Multiple `where` calls should be joined by "AND".
 * 4. `orderBy(field, direction)`: optional sorting.
 * 5. `build()`: returns the final SQL string.
 */

export class SQLQueryBuilder {
    private selectedFields: string[] = ["*"];
    private table: string = "";
    private conditions: string[] = [];
    private sorting: string = "";

    // TODO: Implement the methods here

    select(...fields: string[]): SQLQueryBuilder {
        // Your code here
        return this;
    }

    from(table: string): SQLQueryBuilder {
        // Your code here
        return this;
    }

    where(condition: string): SQLQueryBuilder {
        // Your code here
        return this;
    }

    orderBy(field: string, direction: "ASC" | "DESC" = "ASC"): SQLQueryBuilder {
        // Your code here
        return this;
    }

    build(): string {
        // Construct the final query string
        // Example: SELECT name, age FROM users WHERE age > 18 AND active = 1 ORDER BY age DESC

        // TODO: Validate ensuring 'table' is set

        return "";
    }
}

// --- TEST CASE ---
try {
    const queryBuilder = new SQLQueryBuilder();
    const sql = queryBuilder
        .select("id", "username", "email")
        .from("users")
        .where("age > 18")
        .where("status = 'active'")
        .orderBy("username", "ASC")
        .build();

    console.log("Generated SQL:", sql);
    // Expected output: 
    // SELECT id, username, email FROM users WHERE age > 18 AND status = 'active' ORDER BY username ASC

} catch (e) {
    console.error("Error:", e);
}
