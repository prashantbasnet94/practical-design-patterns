/**
 * PATTERN: OBSERVER (Pub/Sub)
 * 
 * Definition:
 * Defines a one-to-many dependency between objects so that when one object changes state,
 * all its dependents are notified and updated automatically.
 * 
 * Real World Context:
 used in `src/infrastructure/metrics/metrics.bus.ts`. Services "emit"
 * events (like 'user.created') and other services (Logging, Analytics) listen without coupling.
 * 
 * YOUR TASK:
 * Implement the `subscribe` and `publish` methods of the EventBus.
 */

type Listener = (data: any) => void;

class EventBus {
    // TODO: Add a property to store events and their list of listeners
    // private listeners: Map<string, Listener[]> = new Map();

    subscribe(eventType: string, callback: Listener) {
        // TODO: Add the callback to the list of listeners for this eventType
    }

    publish(eventType: string, data: any) {
        // TODO: Find all listeners for this eventType and call them with data
        console.log(`[EventBus] Publishing: ${eventType}`);
    }
}

// --- VERIFICATION ---
// Run with: npx tsx src/design-patterns/3.observer.practice.ts

const bus = new EventBus();

// Simulation
try {
    console.log("--- TEST START ---");

    // bus.subscribe('order.placed', (data) => {
    //   console.log(`📩 Email Service: Sending confirmation for order ${data.id}`);
    // });

    // bus.subscribe('order.placed', (data) => {
    //   console.log(`📦 Inventory Service: Reserving stocks for ${data.items}`);
    // });

    // console.log("Triggering event...");
    // bus.publish('order.placed', { id: 123, items: ['Drone Propeller'] });

    // Expected Output:
    // [EventBus] Publishing: order.placed
    // 📩 Email Service...
    // 📦 Inventory Service...

    console.log("--- TEST END ---");
} catch (e) {
    console.error(e);
}
