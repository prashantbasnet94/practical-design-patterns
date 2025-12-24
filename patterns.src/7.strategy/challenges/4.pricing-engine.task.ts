/**
 * CHALLENGE 4: DYNAMIC PRICING ENGINE (E-COMMERCE)
 * 
 * Scenario:
 * Your checkout system needs to apply discounts.
 * Marketing runs different campaigns:
 * 1. "Black Friday": Flat 50% off everything.
 * 2. "Loyalty Member": 10% off if user points > 1000.
 * 3. "BOGO": Buy One Get One Free on specific items.
 * 
 * Problem:
 * Writing `if (isBlackFriday) ... else if (isLoyalty) ...` is unmaintainable.
 * 
 * Task:
 * 1. Create `IDiscountStrategy`.
 * 2. Implement the strategies.
 *    - `BlackFridayStrategy`: Returns price * 0.5.
 *    - `LoyaltyStrategy`: Returns price * 0.9 (if user is eligible).
 *    - `DefaultStrategy`: Returns price (no discount).
 * 3. `PricingContext` should accept a strategy and calculate the final total.
 */

interface ICartItem {
    name: string;
    price: number;
    quantity: number;
}

interface IUserContext {
    isMember: boolean;
    loyaltyPoints: number;
}

// --- 1. Strategy Interface ---
interface IDiscountStrategy {
    calculate(cart: ICartItem[], user: IUserContext): number;
}

// --- 2. Concrete Strategies ---

class DefaultPriceStrategy {
    // Return simple sum
}

class BlackFridayStrategy {
    // Return 50% of sum
}

class LoyaltyDiscountStrategy {
    // Return 90% of sum IF points > 1000, else 100%
}

// --- 3. Context ---

class Cart {
    constructor(private strategy: IDiscountStrategy) { }

    checkout(items: ICartItem[], user: IUserContext) {
        const finalPrice = this.strategy.calculate(items, user);
        console.log(`Checkout Total: $${finalPrice}`);
    }
}

// --- Verification ---
console.log("--- Pricing Challenge ---");
const items = [{ name: "iPhone", price: 1000, quantity: 1 }];
const user = { isMember: true, loyaltyPoints: 1200 };

// new Cart(new DefaultStrategy()).checkout(items, user); // $1000
// new Cart(new BlackFridayStrategy()).checkout(items, user); // $500
// new Cart(new LoyaltyStrategy()).checkout(items, user); // $900
