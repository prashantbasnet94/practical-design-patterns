/**
 * PATTERN: DECORATOR
 * 
 * Definition:
 * Attaches additional responsibilities to an object dynamically. 
 * Decorators provide a flexible alternative to subclassing for extending functionality.
 * 
 * Real World Context:
 *  commonly seen with Fastify's `app.decorate()` or usage of `@Decorators` in Class logic.
 * Also wrapping functions (like middleware) is a functional decorator pattern.
 * 
 * YOUR TASK:
 * 1. Implement `LoggingDecorator` that logs before and after the base component's operation.
 */

interface IService {
    execute(): string;
}

class BaseService implements IService {
    execute(): string {
        return "Base Service Logic";
    }
}

class LoggingDecorator implements IService {
    constructor(private wrappee: IService) { }

    execute(): string {
        // TODO: Log "Before execution"

        // TODO: Call the wrappee's execute methods
        const result = "PLACEHOLDER";

        // TODO: Log "After execution"

        return result;
    }
}

// --- VERIFICATION ---
// Run with: npx tsx src/design-patterns/5.decorator.practice.ts

try {
    console.log("--- TEST START ---");

    // const simple = new BaseService();
    // console.log("Simple:", simple.execute());

    // const decorated = new LoggingDecorator(simple);
    // console.log("Decorated:", decorated.execute());

    // Expected Output:
    // Simple: Base Service Logic
    // Before execution
    // After execution
    // Decorated: Base Service Logic

    console.log("--- TEST END ---");
} catch (e) {
    console.error(e);
}
