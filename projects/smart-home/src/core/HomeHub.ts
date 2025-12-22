import { DeviceFactory, IHomeComponent } from "../devices/DeviceFactory"
import { tConfig } from "../devices/types"

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
    private light?: IHomeComponent
    private thermostat?: IHomeComponent
    private lock?: IHomeComponent
    private frontDoor?: IHomeComponent
    connect() {
        this.light = DeviceFactory.create('light', {status: false,cost: 500 })
        this.thermostat = DeviceFactory.create('thermostat', {status: false, cost: 1500})
        this.lock = DeviceFactory.create('lock', { status: false, cost: 1000 })
        this.frontDoor = DeviceFactory.create("front_door",{status: false, cost: 5000})
    }
    systemStatus() {

    }
    static getInstance() {
        if (!HomeHub.instance) {
            HomeHub.instance = new HomeHub()
        }
        return HomeHub.instance
    }
}



