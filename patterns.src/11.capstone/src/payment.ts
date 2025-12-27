/**
 * SMELL: Switch Statements / Open-Closed Violation
 * Adding a new payment method requires modifying this massive function.
 */

export class ExternalPaymentService {
    connect() { console.log("Payment Gateway Connected"); }

    processPayment(method: string, amount: number) {
        console.log(`Processing ${method} payment...`);

        if (method === 'paypal') {
            const token = 'paypal_token_123';
            console.log(`[PayPal] Paying $${amount} with token ${token}`);
            // ... complex paypal logic
        } else if (method === 'stripe') {
            const apiKey = 'sk_test_123';
            console.log(`[Stripe] Charging card $${amount} via API ${apiKey}`);
            // ... complex stripe logic
        } else if (method === 'currency') {
            console.log(`[Currency] Converting $${amount} to coins`);
            // ... manual cash logic
        } else {
            throw new Error("Unknown Payment Method");
        }
    }
}
