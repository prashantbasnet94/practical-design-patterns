export { };

/**
 * DECORATOR PATTERN CHALLENGE: Starbucks Coffee System
 *
 * SCENARIO:
 * You are building a billing system for a coffee shop.
 * Customers can order a base coffee (SimpleCoffee, Espresso) and add a variety of condiments
 * (Milk, Sugar, WhippedCream).
 *
 * GOAL:
 * Implement a dynamic cost and description calculator.
 * - SimpleCoffee: $10, "Simple Coffee"
 * - Milk: +$2, ", Milk"
 * - Sugar: +$1, ", Sugar"
 * - WhippedCream: +$5, ", Whipped Cream"
 *
 * TODO:
 * 1. Define `ICoffee` interface:
 *    - `getCost(): number`
 *    - `getDescription(): string`
 * 2. Implement `SimpleCoffee` (Base Component).
 * 3. Implement `CoffeeDecorator` (Abstract Decorator).
 *    - Has a reference to an `ICoffee` object.
 * 4. Implement `Milk`, `Sugar`, `WhippedCream` (Concrete Decorators).
 *    - Extend `CoffeeDecorator`.
 *    - Override methods to add cost/desc.
 */

// 1. Component Interface
interface ICoffee {
    getCost(): number;
    getDescription(): string;
}

// 2. Base Component
class SimpleCoffee implements ICoffee {
    getCost(): number {
        return 10;
    }
    getDescription(): string {
        return "Simple Coffee";
    }
}

// 3. Abstract Decorator
abstract class CoffeeDecorator implements ICoffee {
    constructor(protected coffee: ICoffee) { }

    getCost(): number {
        return this.coffee.getCost();
    }

    getDescription(): string {
        return this.coffee.getDescription();
    }
}

// 4. Concrete Decorators
class Milk extends CoffeeDecorator {
    getCost(): number {
        return this.coffee.getCost() + 2;
    }
    getDescription(): string {
        return this.coffee.getDescription() + ", Milk";
    }
}

class Sugar extends CoffeeDecorator {
    getCost(): number {
        return this.coffee.getCost() + 1;
    }
    getDescription(): string {
        return this.coffee.getDescription() + ", Sugar";
    }
}

class WhippedCream extends CoffeeDecorator {
    getCost(): number {
        return this.coffee.getCost() + 5;
    }
    getDescription(): string {
        return this.coffee.getDescription() + ", Whipped Cream";
    }
}

// === USAGE / TEST ===
const myCoffee = new WhippedCream(new Sugar(new Milk(new SimpleCoffee())));
console.log(myCoffee.getDescription()); // "Simple Coffee, Milk, Sugar, Whipped Cream"
console.log(myCoffee.getCost());        // 18
