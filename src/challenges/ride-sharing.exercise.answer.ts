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

interface IRideDispatcher{
    request(): void
    notify(): void
    subscribe(observer: IObserver): void
    unsubscribe(observer: IObserver): void
    requestRide(vechileType:  vType, rider: IObserver): void
}
interface IObserver{
    onRideUpdate(vechileType: vType, rider: IObserver): void
}

class RideDispatcher implements IRideDispatcher{
    private static instance: RideDispatcher
    private observers: IObserver[] = []

    private constructor() {}
    request(): void {
        throw new Error("Method not implemented.");
    }
    notify(): void {
        throw new Error("Method not implemented.");
    }
    subscribe(observer: IObserver): void {
       this.observers.push(observer)
    }
    unsubscribe(observer: IObserver): void {
        this.observers = this.observers.filter(o => o !== observer)
    }
    requestRide(vechileType: vType, rider: IObserver): void {
        this.observers.forEach(o => o.onRideUpdate(vechileType, rider))
    }
    static getInstance() {
        if (!RideDispatcher.instance) {
            RideDispatcher.instance = new RideDispatcher()
        }
        return RideDispatcher.instance
    }

}

interface IVehicle{
    getPrice(): number
    getType() : string
}
// ---------------------------------------------------------
// 2. Concrete Vehicles (Products)
// ---------------------------------------------------------
// TODO: Implement UberX, UberBlack, UberPool

class UberX implements IVehicle{
    getPrice(): number {
        return 100
    }
    getType(): string {
        return "Uber X"
    }
}

class UberBlack implements IVehicle{
    getPrice(): number {
        return 200
    }
    getType(): string {
        return "UberBlack"
    }
}

class UberPool implements IVehicle{
    getPrice(): number {
        return 20
    }
    getType(): string {
        return "Uber Pool"
    }

}
// ---------------------------------------------------------
// 3. Vehicle Factory
// ---------------------------------------------------------

type vType = 'UberBlack' | 'Uberx' | 'UberPool'
class VehicleFactory{
    static init(vechile: vType ) {
        switch (vechile) {
            case 'UberBlack':
                return new UberBlack()
            case 'Uberx':
                return new UberX()
            case 'UberPool':
                return new UberPool()
            default:
                throw new Error("Need vechile type")
        }
    }
}
/*
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
 *
*/

class RiderApp implements IObserver{
    constructor(private user: string) { }
    onRideUpdate(): void {

        console.log("Ride requested: Pickup at Main St")
        console.log("Ride started", "Ride ended")
    }


}

class DriverApp implements IObserver{
    constructor(private name: string) { }
    onRideUpdate(): void {
        console.log( "Driver found: Toyota Camry (License 123)")
    }
}
// 4. Concrete Observers


// ---------------------------------------------------------
// 5. RideDispatcher (Singleton + Subject)
// ---------------------------------------------------------


// ---------------------------------------------------------
// 6. Test
// ---------------------------------------------------------
const dispatcher = RideDispatcher.getInstance();

const rider = new RiderApp("Alice");
const driver = new DriverApp("Bob");

// // In a real app, drivers would "subscribe" when they go online
dispatcher.subscribe(driver);
dispatcher.subscribe(rider);

// console.log("--- Requesting Ride ---");
dispatcher.requestRide('Uberx', rider);
