/**
 * PATTERN: BUILDER
 *
 * Definition:
 * Separates the construction of a complex object from its representation.
 * Allows you to create different representations using the same construction code.
 *
 * Real World Context:
 * used extensively by Drizzle ORM (`db.select().from().where()`)
 * or for complex test data setup (`UserBuilder`, `MissionBuilder`).
 *
 * YOUR TASK:
 * Implement `QueryBuilder` to chain methods and build a SQL string.
 */

class SQLQuery {
    select: string = "*";
    from: string = "";
    where: string = "";

    toString(): string {
        let query = `SELECT ${this.select} FROM ${this.from}`;
        if (this.where) query += ` WHERE ${this.where}`;
        return query;
    }
}
class SQLQuery2{
    select: string = "*"
    from: string = ""
    where: string = ""
    toString(): string{
        let query = `SELECT ${this.select} FROM ${this.from}`
        if (this.where) query  += `WHERE ${this.where}`
        return query
    }
}

class QueryBuilder {
    private query: SQLQuery
    constructor() {
        this.query = new SQLQuery()
    }
    select(field: string): QueryBuilder {
        this.query.select = field
        return this
    }
    from(table: string) : QueryBuilder {
        this.query.from = table
        return this
    }
    where(condition: string): QueryBuilder {
        this.query.where = condition
        return this
    }
    build() : SQLQuery{
        return this.query
    }
}
// --- VERIFICATION ---
// Run with: npx tsx src/design-patterns/8.builder.practice.ts

try {
    console.log("--- TEST START ---");

    const builder = new QueryBuilder();
    const query = builder
      .select("id, name")
      .from("users")
      .where("id = 1")
      .build();

    console.log("Final Query:", query.toString());
    // // Expected: SELECT id, name FROM users WHERE id = 1

    console.log("--- TEST END ---");
} catch (e) {
    console.error(e);
}
