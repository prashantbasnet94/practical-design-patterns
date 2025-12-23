export { }

/**
 * PATTERN: FACTORY METHOD
 * SCENARIO: Payment Processing System
 * 
 * PROBLEM:
 * Our checkout system is getting messy. We have a huge `processPayment` function
 * that creates specific payment integrations directly. 
 * 
 * Whenever we add a new payment method (like Apple Pay), we have to modify the 
 * core logic, risking bugs.
 * 
 * YOUR TASK:
 * 1. Create an interface `IPaymentProcessor` with a method `pay(amount: number): void`.
 * 2. Create classes `StripeProcessor`, `PayPalProcessor`, and `CryptoProcessor` implementing it.
 * 3. Create a `PaymentFactory` with a static method `createProcessor(type: string): IPaymentProcessor`.
 * 4. Refactor the `processCheckout` function to use the Factory.
 */

interface IPaymentProcessor {
    pay(amount: number): void
}

class StipeProcessor implements IPaymentProcessor {
    pay(amount: number): void {
        console.log("Initializing Stripe...");
        console.log(`[Stripe] Charged $${amount} fee: $${amount * 0.03}`);

    }
}
class PayPalProcessor implements IPaymentProcessor {
    pay(amount: number) {
        console.log("Initializing PayPal...");
        console.log(`[PayPal] Redirecting user... Charged $${amount}`);
    }
}
class CrypoProcessor implements IPaymentProcessor {
    pay(amount: number) { }
}


type tPay = 'stripe' | 'paypal' | 'crypto'

class PaymentFactory {
    private static instance: PaymentFactory
    private processor?: IPaymentProcessor
    private constructor() { }
    createProcessor(type: tPay): IPaymentProcessor {
        switch (type) {
            case 'stripe':
                this.processor = new StipeProcessor()
                return this.processor
            case 'paypal':
                this.processor = new PayPalProcessor()
                return this.processor
            case 'crypto':
                this.processor = new CrypoProcessor()
                return this.processor
            default:
                throw new Error("type is required.")

        }

    }
    static getInstance() {
        if (!PaymentFactory.instance) {
            PaymentFactory.instance = new PaymentFactory()
        }
        return PaymentFactory.instance
    }
}








// ❌ MESSY CODE (Refactor this!)
function processCheckout(amount: number, method: tPay) {
    let payment = PaymentFactory.getInstance()

    if (method) {
        payment.createProcessor(method)
    } else {
        throw new Error("Unknown payment method!");
    }
}

// --- EXECUTION ---
console.log("--- SHOPPPING CART ---");
processCheckout(100, 'stripe');
processCheckout(50, 'paypal');
processCheckout(500, 'crypto');
