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

interface IObserver {
    /**
     * REVIEW HINT (Observer):
     * Usually, the Observer has an `update(data)` method, not `publish`.
     * The `EventBus` publishes; the Observer `reacts`.
     */
    update(data: string): void
}
export class EventBus  {
    /**
     * REVIEW HINT:
     * `EventBus` usually is the SUBJECT, not an Observer itself.
     * It shouldn't implement `IObserver`.
     */
    private observers: Map<string, IObserver[]> = new Map()
    private constructor() { }
    publish(eventType: string, data: string): void {
        this.observers.get(eventType)?.forEach(o => {
            o.update(data)
        })
    }

    subscribe(eventType: string, observer: IObserver) {
        if (!this.observers.has(eventType)) {
            this.observers.set(eventType, [])
        }
        this.observers.get(eventType)?.push(observer)
    }
    unsubsribe(eventType: string, observer: IObserver) {
        this.observers.set(eventType, this.observers.get(eventType)?.filter(o => o !== observer) || [])
    }
}
