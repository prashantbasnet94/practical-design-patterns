import { DeviceFactory } from "../devices/DeviceFactory"
import { IDeviceConfig, ISmartDevice } from "../devices/types"
import { EventBus } from "./EventBus"

/**
 * PATTERN: SINGLETON
 * FILE: HomeHub.ts
 *
 * CONCEPT:
 * The HomeHub acts as the central brain of the house. It manages the global state,
 * connection to the internet, and coordinates between different subsystems.
 * Since we only want ONE brain for the house, the Singleton pattern is perfect.
 *
 * TODO IMPLEMENTATION DETAILS:
 * 1. Create a `private static instance` property to hold the single instance.
 * 2. Make the `constructor` private so `new HomeHub()` cannot be called from outside.
 * 3. Create a `public static getInstance()` method:
 *    - It should check if `instance` exists.
 *    - If no, create it.
 *    - If yes, return it.
 * 4. Add instance methods for:
 *    - `connect()`: Simulates connecting to WiFi/Cloud.
 *    - `getSystemStatus()`: Returns uptime or connection state.
 *
 * FAANG-STYLE TIP:
 * - Ensure your Singleton initialization is "lazy" (created only when requested).
 * - Consider making it immutable or read-only where possible.
 */
export class HomeHub {
    private static instance: HomeHub
    private constructor() { }
    private devices: Map<string, ISmartDevice> = new Map()
    public eventBus = new EventBus()
    /**
     * REVIEW HINT (Singleton/Architecture):
     * The HomeHub shouldn't necessarily "hardcode" specific devices (light, thermostat) as properties.
     * Use a collection (e.g., `devices: Map<string, ISmartDevice>`) or rely on the EventBus.
     *
     * Also, avoid hardcoding `DeviceFactory.create` calls here.
     * In a real app, these would come from a database config or a discovery process.
     */
    connect(config: IDeviceConfig) {
        let device = DeviceFactory.create(config, this.eventBus)
        this.devices.set(config.id, device)
    }
    systemStatus() {
        for (let [ key, value ] of this.devices) {
            console.log(value.getStatus())
        }
    }
    static getInstance() {
        if (!HomeHub.instance) {
            HomeHub.instance = new HomeHub()
        }
        return HomeHub.instance
    }
}



