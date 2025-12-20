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
interface IRouteStrategy{
    calculateRoute(from: string, to: string): number
}

// ---------------------------------------------------------
// 2. Concrete Strategies
// ---------------------------------------------------------
class DrivingStrategy implements IRouteStrategy{
    calculateRoute(from: string, to: string): number {
        console.log("Driving: ", { from, to })
        return 5
    }
}
class WalkingStrategy implements IRouteStrategy{
    calculateRoute(from: string, to: string): number {
        console.log("Walking: ", { from, to })
        return 50
    }
}
class PublicTransportStrategy implements IRouteStrategy{
    calculateRoute(from: string, to: string): number {
        console.log("Public Transport: ", { from, to })
        return 20
    }
}

// ---------------------------------------------------------
// 3. Context (The Navigator)
// ---------------------------------------------------------
class Navigator {
    private static instance: Navigator
    private strategy?: IRouteStrategy

   private constructor(){}

    public setStrategy(strategy: IRouteStrategy) {
        this.strategy = strategy;
    }

    public buildRoute(from: string, to: string) {
        console.log(`\n--- Finding route from ${from} to ${to} ---`);
        let time = this.strategy?.calculateRoute(from, to)
        console.log("Time Estimated: ", time)
    }
    static getInstance() {
        if (!Navigator.instance) {
            Navigator.instance = new Navigator()
        }
        return Navigator.instance
    }
}

// ---------------------------------------------------------
// 4. Test
// ---------------------------------------------------------
const
    nav = Navigator.getInstance()
    nav.setStrategy(new DrivingStrategy())
    nav.buildRoute("Home", "Office");

// // User switches to walking
    nav.setStrategy(new WalkingStrategy());
    nav.buildRoute("Home", "Office");
