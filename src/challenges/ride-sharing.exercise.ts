export { };

/**
 * CHALLENGE: Ride Sharing System (e.g., Uber/Lyft)
 * 
 * PATTERNS: Singleton, Factory, Observer
 * 
 * SCENARIO:
 * You are building the backend for a Ride Sharing app.
 * 
 * 1. `RideDispatcher` (Singleton):
 *    - The "Brain" of the operation. Only ONE dispatcher exists.
 *    - It manages ride requests and notifies drivers/riders.
 * 
 * 2. `Vehicle` (Factory):
 *    - Riders can request different types of rides:
 *      - `UberX`: Standard car.
 *      - `UberBlack`: Luxury car.
 *      - `UberPool`: Shared ride.
 *    - Use a Factory to create these vehicles.
 * 
 * 3. `AppUser` (Observer):
 *    - Both `Riders` and `Drivers` use the app.
 *    - They need to receive updates from the Dispatcher:
 *      - "Driver found: Toyota Camry (License 123)"
 *      - "Ride requested: Pickup at Main St"
 *      - "Ride started", "Ride ended"
 * 
 * YOUR TASKS:
 * 1. Implement `RideDispatcher` as Singleton + Subject.
 * 2. Implement `VehicleFactory` to create cars.
 * 3. Implement `RiderApp` and `DriverApp` as Observers.
 * 4. Simulate a full ride flow in the test section.
 */

// ---------------------------------------------------------
// 1. Interfaces & Types
// ---------------------------------------------------------
type RideType = 'X' | 'BLACK' | 'POOL';
type RideStatus = 'REQUESTED' | 'MATCHED' | 'STARTED' | 'COMPLETED';

interface IRideObserver {
    onRideUpdate(status: RideStatus, message: string): void;
}

interface IVehicle {
    getType(): string;
    getPriceMultiplier(): number;
}

// ---------------------------------------------------------
// 2. Concrete Vehicles (Products)
// ---------------------------------------------------------
// TODO: Implement UberX, UberBlack, UberPool

// ---------------------------------------------------------
// 3. Vehicle Factory
// ---------------------------------------------------------
class VehicleFactory {
    static createVehicle(type: RideType): IVehicle {
        throw new Error("Not implemented");
    }
}

// ---------------------------------------------------------
// 4. Concrete Observers
// ---------------------------------------------------------
class RiderApp implements IRideObserver {
    constructor(private name: string) { }
    onRideUpdate(status: RideStatus, message: string): void {
        console.log(`[RIDER ${this.name}] Notification: ${message}`);
    }
}

class DriverApp implements IRideObserver {
    constructor(private name: string) { }
    onRideUpdate(status: RideStatus, message: string): void {
        console.log(`[DRIVER ${this.name}] Notification: ${message}`);
    }
}

// ---------------------------------------------------------
// 5. RideDispatcher (Singleton + Subject)
// ---------------------------------------------------------
class RideDispatcher {
    // TODO: Singleton Logic
    // TODO: Manage Observers (riders and drivers)

    public requestRide(type: RideType, rider: RiderApp) {
        // 1. Create Vehicle using Factory
        // 2. Notify Driver (simulate finding one)
        // 3. Notify Rider ("Driver found...")
    }
}

// ---------------------------------------------------------
// 6. Test
// ---------------------------------------------------------
// const dispatcher = RideDispatcher.getInstance();

// const rider = new RiderApp("Alice");
// const driver = new DriverApp("Bob");

// // In a real app, drivers would "subscribe" when they go online
// dispatcher.subscribe(driver); 
// dispatcher.subscribe(rider);

// console.log("--- Requesting Ride ---");
// dispatcher.requestRide('X', rider);
