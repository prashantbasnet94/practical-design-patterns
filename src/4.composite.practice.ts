/**
 * PATTERN: COMPOSITE
 * 
 * Definition:
 * Composes objects into tree structures to represent part-whole hierarchies.
 * It lets clients treat individual objects and compositions of objects uniformly.
 * 
 * Real World Context:
 * used in `src/infrastructure/logging/composite.logging.writer.ts`.
 * The `CompositeLoggingWriter` holds a list of other writers (Sentry, PostHog, Console)
 * and when you call `.write()`, it calls `.write()` on all of them.
 * 
 * YOUR TASK:
 * 1. Implement the `CompositeComponent` class.
 * 2. Ensure `operation()` recursively calls children.
 */

interface Component {
    operation(): void;
}

class Leaf implements Component {
    constructor(private name: string) { }

    operation(): void {
        console.log(`Leaf [${this.name}] doing operation.`);
    }
}

// The Composite Class
class Composite implements Component {
    private children: Component[] = [];

    add(component: Component) {
        this.children.push(component);
    }

    // TODO: Implement operation()
    operation(): void {
        console.log("Composite operation started...");

        // Loop through children and call their operation()

        // Note: Don't strictly need to return anything, just ensure recursion happens
    }
}

// --- VERIFICATION ---
// Run with: npx tsx src/design-patterns/4.composite.practice.ts

try {
    console.log("--- TEST START ---");

    // const tree = new Composite();
    // const branch1 = new Composite();

    // branch1.add(new Leaf("Leaf A"));
    // branch1.add(new Leaf("Leaf B"));

    // tree.add(branch1);
    // tree.add(new Leaf("Leaf C"));

    // tree.operation();

    // Expected Output:
    // Composite operation started...
    // Composite operation started...
    // Leaf [Leaf A] doing operation.
    // Leaf [Leaf B] doing operation.
    // Leaf [Leaf C] doing operation.

    console.log("--- TEST END ---");
} catch (e) {
    console.error(e);
}
