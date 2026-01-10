/**
 * THE STATE PATTERN
 * 
 * Intent: Allows an object to alter its behavior when its internal state changes.
 * The object will appear to change its class.
 * 
 * ANALOGY: A Traffic Light
 * 
 * Imagine a Traffic Light. It behaves differently depending on its current color:
 * - RED: Stop. Next is Green.
 * - GREEN: Go. Next is Yellow.
 * - YELLOW: Slow down. Next is Red.
 * 
 * WITHOUT PATTERN (The "Flag/Switch" Hell):
 * 
 * class TrafficLight {
 *     current: "red" | "green" | "yellow" = "red";
 * 
 *     change() {
 *         if (this.current === "red") {
 *             console.log("Green light! Go!");
 *             this.current = "green";
 *         } else if (this.current === "green") {
 *             console.log("Yellow light! Slow down!");
 *             this.current = "yellow";
 *         } else if (this.current === "yellow") {
 *             console.log("Red light! Stop!");
 *             this.current = "red";
 *         }
 *     }
 * }
 * 
 * PROBLEM:
 * Adding a "Blue" light or "Flashing Red" requires changing the `change()` method
 * and adding more if/else statements. It violates Open/Closed Principle.
 * 
 * WITH STATE PATTERN:
 * We encapsulate the behavior of each color into its own class.
 */

// 1. The Interface (The "Contract")
interface LightState {
    handleRequest(light: TrafficLight): void;
}

// 2. The Context (The Object that has state)
class TrafficLight {
    private state: LightState;

    constructor() {
        this.state = new RedLight(); // Initial State
    }

    public setState(state: LightState): void {
        this.state = state;
    }

    public change(): void {
        // Delegate behavior to the current state
        this.state.handleRequest(this);
    }
}

// 3. Concrete States (The different behaviors)

class RedLight implements LightState {
    public handleRequest(light: TrafficLight): void {
        console.log("Red Light -> Switching to Green.");
        // The State knows what comes next!
        light.setState(new GreenLight());
    }
}

class GreenLight implements LightState {
    public handleRequest(light: TrafficLight): void {
        console.log("Green Light -> Switching to Yellow.");
        light.setState(new YellowLight());
    }
}

class YellowLight implements LightState {
    public handleRequest(light: TrafficLight): void {
        console.log("Yellow Light -> Switching to Red.");
        light.setState(new RedLight());
    }
}

// USAGE
const trafficLight = new TrafficLight();
trafficLight.change(); // Red -> Green
trafficLight.change(); // Green -> Yellow
trafficLight.change(); // Yellow -> Red
