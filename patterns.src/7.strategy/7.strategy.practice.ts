/**
 * PATTERN: STRATEGY
 * 
 * Definition:
 * Defines a family of algorithms, encapsulates each one, and makes them interchangeable.
 * Strategy lets the algorithm vary independently from clients that use it.
 * 
 * Real World Context:
 * commonly used in Authentication (Email vs Google vs Microsoft strategies)
 * or in flexible logic like `PricingStrategy`.
 * 
 * YOUR TASK:
 * Implement `PremiumPricingStrategy` and `RegularPricingStrategy`.
 */

interface IPricingStrategy {
    calculatePrice(basePrice: number): number;
}

class RegularPricingStrategy implements IPricingStrategy {
    calculatePrice(basePrice: number): number {
        // TODO: Return base price
        return 0;
    }
}

class PremiumPricingStrategy implements IPricingStrategy {
    calculatePrice(basePrice: number): number {
        // TODO: Apply 20% discount
        return 0;
    }
}

class ShoppingCart {
    constructor(private strategy: IPricingStrategy) { }

    setStrategy(strategy: IPricingStrategy) {
        this.strategy = strategy;
    }

    checkout(amount: number): void {
        const finalPrice = this.strategy.calculatePrice(amount);
        console.log(`Checkout amount: $${finalPrice}`);
    }
}

// --- VERIFICATION ---
// Run with: npx tsx src/design-patterns/7.strategy.practice.ts

try {
    console.log("--- TEST START ---");

    // const cart = new ShoppingCart(new RegularPricingStrategy());
    // cart.checkout(100); // Should be $100

    // cart.setStrategy(new PremiumPricingStrategy());
    // cart.checkout(100); // Should be $80

    console.log("--- TEST END ---");
} catch (e) {
    console.error(e);
}
