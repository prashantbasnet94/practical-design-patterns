/**
 * THE STRATEGY PATTERN - CONCEPTUAL EXAMPLE
 * 
 * Scenario (SimUDuck App):
 * We are building a Duck simulator game.
 * - Some ducks fly, some don't (Rubber Ducks).
 * - Some ducks quack, some squeak, some are silent.
 * 
 * 🔴 THE BAD WAY (Inheritance):
 * If we adhere to strict inheritance, we end up with RubberDucks that fly() 
 * because they inherited it from the base Duck class.
 * 
 * 🟢 THE STRATEGY WAY (Composition):
 * We pull out the "Flight" and "Quack" behaviors into separate interfaces.
 * The Duck class just "has a" FlightBehavior.
 */

// --- 1. The Strategy Interfaces ---
interface IFlyBehavior {
    fly(): void;
}

interface IQuackBehavior {
    quack(): void;
}

// --- 2. Concrete Strategies (The Algorithms) ---

// FLIGHT STRATEGIES
class FlyWithWings implements IFlyBehavior {
    fly() { console.log("I'm flying!! 🦅"); }
}

class FlyNoWay implements IFlyBehavior {
    fly() { console.log("I can't fly. 😢"); }
}

class FlyRocketPowered implements IFlyBehavior {
    fly() { console.log("I'm flying with a rocket! 🚀"); }
}

// QUACK STRATEGIES
class Quack implements IQuackBehavior {
    quack() { console.log("Quack"); }
}

class Squeak implements IQuackBehavior {
    quack() { console.log("Squeak"); }
}

class MuteQuack implements IQuackBehavior {
    quack() { console.log("<< Silence >>"); }
}

// --- 3. The Context (The Client) ---

abstract class Duck {
    // Composition: The Duck HAS behaviors
    constructor(
        protected flyBehavior: IFlyBehavior,
        protected quackBehavior: IQuackBehavior
    ) { }

    public performFly() {
        this.flyBehavior.fly();
    }

    public performQuack() {
        this.quackBehavior.quack();
    }

    // Dynamic Strategy Swapping!
    public setFlyBehavior(fb: IFlyBehavior) {
        this.flyBehavior = fb;
    }

    abstract display(): void;
}

// --- 4. Concrete Ducks ---

class MallardDuck extends Duck {
    constructor() {
        // Mallards fly with wings and quack normally
        super(new FlyWithWings(), new Quack());
    }

    display() { console.log("I'm a real Mallard Duck"); }
}

class RubberDuck extends Duck {
    constructor() {
        // Rubber ducks can't fly and they squeak
        super(new FlyNoWay(), new Squeak());
    }

    display() { console.log("I'm a Rubber Duck"); }
}

class ModelDuck extends Duck {
    constructor() {
        super(new FlyNoWay(), new Quack());
    }

    display() { console.log("I'm a Model Duck"); }
}


// --- 5. Usage ---
console.log("--- Mallard ---");
const mallard = new MallardDuck();
mallard.performQuack();
mallard.performFly();

console.log("\n--- Model Duck (The fun part) ---");
const model = new ModelDuck();
model.performFly(); // Can't fly initially
model.setFlyBehavior(new FlyRocketPowered()); // runtime change!
model.performFly(); // Now it flies!
