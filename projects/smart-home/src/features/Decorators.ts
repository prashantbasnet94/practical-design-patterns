/**
 * PATTERN: DECORATOR
 * FILE: Decorators.ts
 *
 * CONCEPT:
 * We want to add features to devices dynamically.
 * - "Secure": Adds a PIN code check before turning on.
 * - "Logged": Logs every action to console.
 * We don't want to create `SecureLight`, `SecureThermostat`, `LoggedLight`, etc. (Class Explosion).
 *
 * TODO IMPLEMENTATION DETAILS:
 * 1. Create a `BaseDecorator` class that implements `ISmartDevice`.
 *    - Constructor takes a `wrappedDevice: ISmartDevice`.
 *    - All methods delegate to `this.wrappedDevice.method()`.
 *
 * 2. Create `SecureDecorator` implements `BaseDecorator`:
 *    - Override `turnOn()`:
 *      - Check PIN.
 *      - If valid, call `super.turnOn()`.
 *
 * 3. Create `LoggingDecorator` implements `BaseDecorator`:
 *    - Override `turnOn()`:
 *      - Log "Turning on...".
 *      - Call `super.turnOn()`.
 *
 * FAANG-STYLE TIP:
 * - This allows stacking: `new SecureDecorator(new LoggingDecorator(new Light()))`.
 */
export class BaseDecorator {
    // TODO: Add wrapping logic
}
