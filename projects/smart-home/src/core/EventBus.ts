/**
 * PATTERN: OBSERVER
 * FILE: EventBus.ts
 *
 * CONCEPT:
 * In a Smart Home, devices need to talk to each other without being tightly coupled.
 * Example: When the "MotionSensor" detects movement, the "LivingRoomLight" should turn on.
 * The Sensor shouldn't need to know specifically about the Light class.
 *
 * TODO IMPLEMENTATION DETAILS:
 * 1. Define specific Event Types (e.g., 'MOTION_DETECTED', 'DEVICE_OFFLINE').
 * 2. Create an `EventBus` class that maintains a list of subscribers (listeners).
 * 3. Implement `subscribe(eventType, callback)`:
 *    - Adds a function to the list for that event type.
 * 4. Implement `publish(eventType, data)`:
 *    - loops through all subscribers for that event and calls them with the data.
 * 5. Implement `unsubscribe(eventType, callback)`:
 *    - Important for memory management! Removes the listener.
 *
 * FAANG-STYLE TIP:
 * - Use TypeScript Generics to ensure the `data` payload matches the `eventType`.
 * - Add error handling so one crashing listener doesn't break the whole loop.
 */
export class EventBus {
    // TODO: Add subscription management logic here
}
