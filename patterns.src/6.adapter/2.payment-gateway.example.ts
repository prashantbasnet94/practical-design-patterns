/**
 * PATTERN: ADAPTER
 * REAL WORLD SCENARIO: PAYMENT GATEWAY
 * 
 * Situation:
 * - We have a modern app that uses `IPaymentProcessor` (expects Dollars).
 * - We bought a legacy startup that uses `OldPaymentSystem` (expects Cents).
 * - We cannot change the `OldPaymentSystem` code (it's a compiled library or 3rd party).
 */

// 1. The Modern Interface (Target)
interface IPaymentProcessor {
    pay(dollars: number): void;
}

// 2. The Legacy System (Adaptee)
class OldPaymentSystem {
    public makePaymentInCents(cents: number) {
        console.log(`[Legacy System] Processing payment: ${cents} cents`);
    }
}

// 3. The Adapter
class PaymentAdapter implements IPaymentProcessor {
    constructor(private legacySystem: OldPaymentSystem) { }

    pay(dollars: number): void {
        const cents = Math.round(dollars * 100);
        console.log(`[Adapter] Converting $${dollars} -> ${cents} cents`);
        this.legacySystem.makePaymentInCents(cents);
    }
}

// 4. Client Code
function processUserOrder(processor: IPaymentProcessor, amount: number) {
    processor.pay(amount);
}

// --- USAGE ---
console.log("--- Processing Order ---");
const legacyService = new OldPaymentSystem();
const adapter = new PaymentAdapter(legacyService);

// The client code stays clean. It doesn't care about 'cents' or 'OldPaymentSystem'.
processUserOrder(adapter, 49.99);
