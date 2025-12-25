import { number } from "better-auth"

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
interface IDiscountStrategy{
    applyDiscount(price: number): number
}

class BlackFridayStrategy implements IDiscountStrategy{
    applyDiscount(price: number): number {
        console.log("@BlackFridayStrategy, applying discount")
        return price * 0.5
    }
}

class LoyaltyStrategy implements IDiscountStrategy{
    constructor(private eligible: boolean){}
    applyDiscount(price: number): number {
        console.log('@LoyaltyStrategy eligbility is: ', this.eligible)

        if (this.eligible) {
            return price * 0.9
        }
        return price
    }
}

class DefaultStrategy implements IDiscountStrategy{
    applyDiscount(price: number): number {
        console.log('@DefaultStrategy')
        return price
    }
}

class Campaign{
    constructor(private discountStrategy: IDiscountStrategy) { }
    setStrategy(strategy: IDiscountStrategy) {
        this.discountStrategy = strategy
    }
    apply(price: number) {
        console.log("@ Campaign, applying discount")
        let data = this.discountStrategy.applyDiscount(price)
        console.log("Final Price: $",data)
    }
}


let campaign = new Campaign(new DefaultStrategy())
campaign.apply(100)

campaign.setStrategy(new LoyaltyStrategy(true))
campaign.apply(100)

campaign.setStrategy(new LoyaltyStrategy(false))
campaign.apply(100)

campaign.setStrategy(new BlackFridayStrategy())
campaign.apply(100)
