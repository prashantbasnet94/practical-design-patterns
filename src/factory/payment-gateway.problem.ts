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

// ❌ MESSY CODE (Refactor this!)
function processCheckout(amount: number, method: string) {
    console.log(`\nStarting checkout for $${amount}...`);

    if (method === 'stripe') {
        console.log("Initializing Stripe...");
        console.log(`[Stripe] Charged $${amount} fee: $${amount * 0.03}`);
    } else if (method === 'paypal') {
        console.log("Initializing PayPal...");
        console.log(`[PayPal] Redirecting user... Charged $${amount}`);
    } else if (method === 'crypto') {
        console.log("Initializing Crypto Wallet...");
        console.log(`[Crypto] Mining transaction... Charged $${amount}`);
    } else {
        throw new Error("Unknown payment method!");
    }
}

// --- EXECUTION ---
console.log("--- SHOPPPING CART ---");
processCheckout(100, 'stripe');
processCheckout(50, 'paypal');
processCheckout(500, 'crypto');
