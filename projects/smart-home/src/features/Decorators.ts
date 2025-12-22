import { EventBus } from '../core/EventBus';
import { DeviceFactory } from '../devices/DeviceFactory';
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
        this.device.turnOff()

    }
    getStatus(): string {
        return this.device.getStatus()
    }

}

export class SecureDecorator extends BaseDecorator {
    private pin: number
    constructor(device: ISmartDevice, pin: number) {
        super(device)
        this.pin = pin
    }
    turnOff(): void {
        super.turnOff()
    }
    turnOn(): void {
        console.log("checking pin")
        if (this.pin === 1234) {
            console.log(" pin correct, turning on ... ")
            super.turnOn()
        } else {
             console.log("incorrect password")
        }

    }
    getStatus(): string {
        return super.getStatus()
    }

}

export class LoggingDecorator extends BaseDecorator {
    turnOn(): void {
        console.log("logging, that i am turining the device on")
        super.turnOn()
    }
}


let device = DeviceFactory.create({
    id: '1',
    type: 'light',
    name:'light',
}, new EventBus())

const secureLight = new SecureDecorator(device, 1234)
const loggingLight = new LoggingDecorator(secureLight)
loggingLight.turnOn()