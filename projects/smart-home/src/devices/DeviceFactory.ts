/**
 * PATTERN: FACTORY METHOD
 * FILE: DeviceFactory.ts
 *
 * CONCEPT:
 * Creating devices might be complex (validating configs, assigning IDs, setting defaults).
 * We don't want the user to do `new SonySmartLock("123", "front_door", config)`.
 * Just `DeviceFactory.create('lock', props)`.
 *
 * TODO IMPLEMENTATION DETAILS:
 * 1. Create `DeviceFactory` class.
 * 2. Create a static method `createDevice(type, config)`.
 * 3. Inside, switch on `type`:
 *    - case 'light': return new SmartLight(config);
 *    - case 'thermostat': return new Thermostat(config);
 *    - default: throw error("Unknown device").
 *
 * FAANG-STYLE TIP:
 * - Instead of a giant switch case, consider a "Registration" pattern where
 *   new device types can register themselves to the factory at runtime.
 */
export class DeviceFactory {
    // TODO: Add factory creation logic
}
