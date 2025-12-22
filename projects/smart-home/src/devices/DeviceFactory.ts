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

import { ISmartDevice, tConfig, tDevice } from "./types"



class Device implements ISmartDevice {
    status: boolean = false

    constructor(public name: string, public id: string, public type: tDevice) {
    }
    turnOn(): void {
        this.status = true
    }
    turnOff(): void {
        this.status = false
    }
    getStatus(): string {
        console.log(this.name, " is currently turned : ", this.status)
        return this.name + " is " + this.type + " , currently turned : " + this.status
    }
}


export class DeviceFactory {
    static create(device: tDevice, config: tConfig) {
        /**
         * REVIEW HINT (Factory):
         * You are receiving `config` but ignoring it!
         * Pass the `config.id` and `config.status` to the new Device.
         *
         * Also, hardcoding "1", "2" limits you to one device of each type.
         */
        switch (device) {
            case 'light':
                return new Device('light', "1", 'light')
            case 'thermostat':
                return new Device('thermostat', "2", "thermostat")
            case 'front_door':
                return new Device('front_door', "3", 'front_door')
            case 'lock':
                return new Device('lock', "4", 'lock')
            default:
                throw new Error("Device not recognized")
        }
    }
}
