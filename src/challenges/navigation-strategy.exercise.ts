export { };

/**
 * CHALLENGE: Navigation System (Google Maps-like)
 * 
 * PATTERN: Strategy Pattern
 * 
 * SCENARIO:
 * You are building a Navigation App that calculates the best route from Point A to Point B.
 * The way the route is calculated depends on the transport mode:
 * 
 * 1. `Driving` (Strategy):
 *    - Optimizes for fastest roads.
 *    - Example output: "Calculated route via Highway 101. ETA: 30 mins."
 * 
 * 2. `Walking` (Strategy):
 *    - Optimizes for pedestrian paths and parks.
 *    - Example output: "Calculated route via Golden Gate Park. ETA: 2 hours."
 * 
 * 3. `PublicTransport` (Strategy):
 *    - Optimizes for bus/train schedules.
 *    - Example output: "Take Bus 42 to Downtown. ETA: 45 mins."
 * 
 * THE CONTEXT:
 * - A class `Navigator` that takes a `RouteStrategy`.
 * - It doesn't care HOW the route is calculated, it just calls `strategy.calculateRoute(A, B)`.
 * - You should be able to switch strategies at runtime (e.g., user toggles "Walking" mode).
 * 
 * YOUR TASKS:
 * 1. Define `IRouteStrategy` interface with `calculateRoute(from: string, to: string): void`.
 * 2. Implement concrete strategies: `DrivingStrategy`, `WalkingStrategy`, `PublicTransportStrategy`.
 * 3. Implement the `Navigator` context class.
 * 4. Test switching strategies in the test section.
 */

// ---------------------------------------------------------
// 1. Strategy Interface
// ---------------------------------------------------------
// interface IRouteStrategy ...

// ---------------------------------------------------------
// 2. Concrete Strategies
// ---------------------------------------------------------
// class DrivingStrategy ...
// class WalkingStrategy ...
// class PublicTransportStrategy ...

// ---------------------------------------------------------
// 3. Context (The Navigator)
// ---------------------------------------------------------
class Navigator {
    private strategy: any; // TODO: Fix type

    constructor(strategy: any) {
        this.strategy = strategy;
    }

    public setStrategy(strategy: any) {
        this.strategy = strategy;
    }

    public buildRoute(from: string, to: string) {
        console.log(`\n--- Finding route from ${from} to ${to} ---`);
        // TODO: Delegate to strategy
    }
}

// ---------------------------------------------------------
// 4. Test
// ---------------------------------------------------------
// const nav = new Navigator(new DrivingStrategy());
// nav.buildRoute("Home", "Office");

// // User switches to walking
// nav.setStrategy(new WalkingStrategy());
// nav.buildRoute("Home", "Office");
