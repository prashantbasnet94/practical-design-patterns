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
class UberX implements IVehicle {
    getType(): string {
        return 'UberX';
    }
    getPriceMultiplier(): number {
        return 1.0;
    }
}

class UberBlack implements IVehicle {
    getType(): string {
        return 'UberBlack';
    }
    getPriceMultiplier(): number {
        return 2.5;
    }
}

class UberPool implements IVehicle {
    getType(): string {
        return 'UberPool';
    }
    getPriceMultiplier(): number {
        return 0.7;
    }
}

// ---------------------------------------------------------
// 3. Vehicle Factory
// ---------------------------------------------------------
class VehicleFactory {
    static createVehicle(type: RideType): IVehicle {
        switch (type) {
            case 'X':
                return new UberX();
            case 'BLACK':
                return new UberBlack();
            case 'POOL':
                return new UberPool();
            default:
                const exhaustive: never = type;
                throw new Error(`Unknown vehicle type: ${exhaustive}`);
        }
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
    private static instance: RideDispatcher;
    private observers: Set<IRideObserver> = new Set();

    private constructor() {}

    static getInstance(): RideDispatcher {
        if (!RideDispatcher.instance) {
            RideDispatcher.instance = new RideDispatcher();
        }
        return RideDispatcher.instance;
    }

    subscribe(observer: IRideObserver): void {
        this.observers.add(observer);
    }

    unsubscribe(observer: IRideObserver): void {
        this.observers.delete(observer);
    }

    private notify(status: RideStatus, message: string): void {
        this.observers.forEach(observer => {
            observer.onRideUpdate(status, message);
        });
    }

    public requestRide(type: RideType, rider: RiderApp, pickup: string): void {
        const vehicle = VehicleFactory.createVehicle(type);

        this.notify('REQUESTED', `Ride requested: ${vehicle.getType()} at ${pickup}`);

        setTimeout(() => {
            this.notify('MATCHED', `Driver found: Toyota Camry (License ABC-123) - ${vehicle.getType()}`);

            setTimeout(() => {
                this.notify('STARTED', 'Ride started');

                setTimeout(() => {
                    this.notify('COMPLETED', 'Ride ended');
                }, 1000);
            }, 1000);
        }, 500);
    }
}

// ---------------------------------------------------------
// 6. Test
// ---------------------------------------------------------
const dispatcher = RideDispatcher.getInstance();

const rider = new RiderApp("Alice");
const driver = new DriverApp("Bob");

dispatcher.subscribe(driver);
dispatcher.subscribe(rider);

console.log("--- Requesting UberX Ride ---");
dispatcher.requestRide('X', rider, 'Main St');

setTimeout(() => {
    console.log("\n--- Requesting UberBlack Ride ---");
    dispatcher.requestRide('BLACK', rider, '5th Avenue');
}, 3000);
