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

import { EventBus } from "../core/EventBus"
import { IDeviceConfig, ISmartDevice } from "./types"




class Device implements ISmartDevice {
    status: boolean = false

    constructor(public config: IDeviceConfig, protected bus: EventBus) {
    }
    turnOn(): void {
        console.log(this.config.name, " turning on ")
        this.bus.publish('DEVICE_STATUS_ON', {
            id: this.config.id,
            name: this.config.name,
            timeStamp: Date.now(),
            status: this.status
        })
        this.status = true
    }
    turnOff(): void {
          this.bus.publish('DEVICE_STATUS_OFF', {
            id: this.config.id,
            name: this.config.name,
            timeStamp: Date.now(),
            status: this.status
        })
        console.log(this.config.name, " turning off")
        this.status = false
    }
    getStatus(): string {
        console.log(this.config.name, " is currently turned : ", this.status)
        return this.config.name + " is " , "currently turned : " + this.status
    }
}


export class DeviceFactory {
    static create(config: IDeviceConfig, bus: EventBus) {
        /**
         * REVIEW HINT (Factory):
         * You are receiving `config` but ignoring it!
         * Pass the `config.id` and `config.status` to the new Device.
         *
         * Also, hardcoding "1", "2" limits you to one device of each type.
         */
         return new Device(config, bus)
    }
}
