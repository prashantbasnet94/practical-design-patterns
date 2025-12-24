/**
 * CHALLENGE 1: PAYMENT PROCESSING (STRATEGY PATTERN)
 * 
 * Scenario:
 * You are building a Checkout system for an E-commerce store.
 * Users can pay with different methods: Credit Card, PayPal, or Bitcoin.
 * 
 * Problem:
 * Writing one giant `checkout()` method with `if (type === 'paypal')` is bad.
 * 
 * Task:
 * 1. Define `IPaymentStrategy` interface with `pay(amount: number): void`.
 * 2. Implement 3 strategies:
 *    - `CreditCardStrategy`: Logs "Paid $100 with Credit Card ending in 1234"
 *    - `PayPalStrategy`: Logs "Paid $100 using PayPal (user@example.com)"
 *    - `BitcoinStrategy`: Logs "Paid $100 using Wallet 0x123..."
 * 3. Update `Checkout` class to accept a strategy and use it.
 */

// --- 1. The Strategy Interface ---
interface IPaymentStrategy {
    pay(amount: number): void;
}

// --- 2. Concrete Strategies (Implement these!) ---

class CreditCardStrategy {
    // TODO: implement interface
    // Constructor should take cardNumber
}

class PayPalStrategy {
    // TODO: implement interface
    // Constructor should take email
}

class BitcoinStrategy {
    // TODO: implement interface
    // Constructor should take walletAddress
}


// --- 3. The Context (The Checkout System) ---

class Checkout {
    private paymentStrategy: any; // TODO: Fix type

    constructor(strategy: any) { // TODO: Fix type
        this.paymentStrategy = strategy;
    }

    setPaymentMethod(strategy: any) { // TODO: Fix type
        this.paymentStrategy = strategy;
    }

    processOrder(amount: number) {
        console.log(`Processing order for $${amount}...`);
        // TODO: Delegate to strategy
        // this.paymentStrategy.pay(amount)
        console.log("Order complete! \n");
    }
}


// --- 4. Verify ---
console.log("--- Payment Challenge ---");

// let cart = new Checkout(new CreditCardStrategy("4242-4242-4242-4242"));
// cart.processOrder(100);

// cart.setPaymentMethod(new PayPalStrategy("prashant@google.com"));
// cart.processOrder(50);

// cart.setPaymentMethod(new BitcoinStrategy("0x123ABC..."));
// cart.processOrder(2000);
