import { ISmartDevice, tDevice } from './../devices/types';
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


export abstract class BaseDecorator implements ISmartDevice {
    status: boolean = false
    constructor(private device: ISmartDevice) { }
    id: string = "";
    name: string = "";
    type: tDevice = "light";
    turnOn(): void {
        this.device.turnOn()
    }
    turnOff(): void {
        /**
         * REVIEW HINT:
         * 1. `pin` is not defined?
         * 2. Careful with case sensitivity: `TurnOff` vs `turnOff`.
         */
        // @ts-ignore
        if (typeof pin !== 'undefined' && pin === 1234) this.device.turnOff()
        else this.device.turnOff(); // default behavior if pin missing for now

    }
    getStatus(): string {
        return this.device.getStatus()
    }
    getCost(): number {
        /**
         * REVIEW HINT:
         * Infinite Recursion! `this.getCost()` calls itself.
         * Should be `this.device.getCost()`.
         * (Check if ISmartDevice has getCost defined?)
         */
        return this.getCost()
    }
}

export class SecureDecorator extends BaseDecorator {
    turnOff(): void {
        super.turnOff()
    }
    turnOn(): void {
        console.log(" turning on ... ")
        super.turnOn()
    }
    getStatus(): string {
        return super.getStatus()
    }
    getCost(): number {
        return super.getCost()
    }
}