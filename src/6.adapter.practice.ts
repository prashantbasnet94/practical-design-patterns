/**
 * PATTERN: ADAPTER
 * 
 * Definition:
 * Allows objects with incompatible interfaces to collaborate.
 * 
 * Real World Context:
 * `src/lib/auth.provider.ts` uses `drizzleAdapter` to make our Drizzle ORM
 * compatible with the `better-auth` expected interface.
 * 
 * YOUR TASK:
 * You have a `LegacyPaymentProcessor` with a method `payInCents(amount)`.
 * You need to adapt it to the `IPaymentGateway` interface which expects `makePayment(dollars)`.
 */

// Target Interface (What our app expects)
interface IPaymentGateway {
    makePayment(dollars: number): void;
}

// Adaptee (3rd Party / Legacy Service)
class LegacyPaymentProcessor {
    payInCents(cents: number) {
        console.log(`Legacy API Processing payment of ${cents} cents`);
    }
}

// TODO: Implement Adapter
class PaymentAdapter implements IPaymentGateway {
    private legacy: LegacyPaymentProcessor;

    constructor(legacy: LegacyPaymentProcessor) {
        this.legacy = legacy;
    }

    makePayment(dollars: number): void {
        // TODO: Convert dollars to cents

        // TODO: Call legacy.payInCents
    }
}

// --- VERIFICATION ---
// Run with: npx tsx src/design-patterns/6.adapter.practice.ts

try {
    console.log("--- TEST START ---");

    // const legacyService = new LegacyPaymentProcessor();
    // const adapter = new PaymentAdapter(legacyService);

    // // Client code only knows about makePayment(dollars)
    // adapter.makePayment(10); 

    // Expected Output:
    // Legacy API Processing payment of 1000 cents

    console.log("--- TEST END ---");
} catch (e) {
    console.error(e);
}
