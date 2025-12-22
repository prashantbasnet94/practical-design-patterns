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

interface ICoffee{
    getCost(): number
    getDescription(): string
}
class SimpleCoffee implements ICoffee{
    constructor(public name: string , public price: number){}
    getCost(): number {
        return this.price
    }
    getDescription(): string {
        return this.name
    }
}

abstract class CoffeeDecorator implements ICoffee{
    constructor(protected coffee: ICoffee){}
    getCost(): number {
       return this.coffee.getCost()
    }
    getDescription(): string {
        return this.coffee.getDescription()
    }
}

class Milk extends CoffeeDecorator{
    getCost(): number {
        return super.getCost() + 5
    }
    getDescription(): string {
        return super.getDescription() + " , MilK"
    }
}

class Sugar extends CoffeeDecorator{
    getCost(): number{
        return super.getCost() + 1
    }
    getDescription(): string {
        return super.getDescription() + " , Sugar"
    }
}

class WhippedCream extends CoffeeDecorator{
    getCost(): number {
        return super.getCost() + 3
    }
    getDescription(): string {
        return super.getDescription() + " Whip Cream"
    }
}


const myCoffee = new WhippedCream(new Sugar(new Milk(new SimpleCoffee("Expresso", 10))))



// === USAGE / TEST ===
// const myCoffee = new WhippedCream(new Sugar(new Milk(new SimpleCoffee())));
console.log(myCoffee.getDescription()); // "Simple Coffee, Milk, Sugar, Whipped Cream"
console.log(myCoffee.getCost());        // 18
