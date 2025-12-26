import { SQLQueryBuilder } from './1.query-builder.task';
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

 class SQLQueryBuilder {
    private selectedFields: string[] = []
    private table: string = ""
    private conditions: string[] = []
    private sortBy: string[] = []
    constructor(){}

    select(...fields: string[]): SQLQueryBuilder {
        this.selectedFields.push(...fields)
        return this
    }
    from(table: string): SQLQueryBuilder {
        this.table = table
        return this
    }
    where(condition: string) : SQLQueryBuilder{
        this.conditions.push(condition)
        return this
    }
     orderBy(field: string, direction: "ASC" | "DESC" ="ASC"): SQLQueryBuilder{
        this.sortBy.push(`${field} ${direction}`)
        return this
     }

     build(): string {
         if (!this.table) {
             throw new Error("Table is required")
         }

         const columns = 0 < this.selectedFields.length ? this.selectedFields.join(', ') : '*'
         let query = `SELECT ${columns} FROM ${this.table}`

         if (0 < this.conditions.length) {
             query += `WHERE ${this.conditions.join(" AND ")}`
         }

         if (0 < this.sortBy.length) {
             query+= `ORDER BY ${this.sortBy.join(", ")}`
         }
         return query
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
