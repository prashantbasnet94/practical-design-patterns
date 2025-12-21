export { };

/**
 * CHALLENGE: Legacy Payment Integration
 * 
 * PATTERN: Adapter Pattern
 * 
 * SCENARIO:
 * You have a modern e-commerce system that uses a nice `IPaymentProcessor` interface.
 * However, you previously bought a company that uses an old, clunky `OldPaymentSystem`.
 * 
 * 1. `ModernPaymentProcessor` (The Target):
 *    - Method: `pay(amount: number, currency: string)`
 * 
 * 2. `OldPaymentSystem` (The Adaptee):
 *    - It works differently!
 *    - Method: `processPayment(xmlData: string)`
 *    - It expects XML string like: "<payment><amount>100</amount><currency>USD</currency></payment>"
 * 
 * 3. `PaymentAdapter` (The Adapter):
 *    - Pass `OldPaymentSystem` into it.
 *    - Implement `IPaymentProcessor`.
 *    - In `pay()`, convert the amount/currency into the XML format the old system needs.
 * 
 * YOUR TASKS:
 * 1. Implement `PaymentAdapter` to wrap `OldPaymentSystem`.
 * 2. Client code should call `adapter.pay(100, 'USD')` and it should work with the old system.
 */

// ---------------------------------------------------------
// 1. The Target Interface (What our app uses)
// ---------------------------------------------------------
interface IPaymentProcessor {
    pay(amount: number, currency: string): void;
}

// ---------------------------------------------------------
// 2. The Adaptee (The old, incompatible class)
// ---------------------------------------------------------
class OldPaymentSystem {
    public processPayment(xmlData: string): void {
        console.log(`[Old System] Connecting to mainframe...`);
        if (xmlData.includes('<amount>') && xmlData.includes('<currency>')) {
            console.log(`[Old System] Processing XML: ${xmlData}`);
            console.log(`[Old System] PAYMENT SUCCESSFUL`);
        } else {
            console.log(`[Old System] ERROR: Invalid XML format`);
        }
    }
}

// ---------------------------------------------------------
// 3. The Adapter
// ---------------------------------------------------------
class PaymentAdapter implements IPaymentProcessor {
    private oldSystem: OldPaymentSystem;

    constructor(oldSystem: OldPaymentSystem) {
        this.oldSystem = oldSystem;
    }

    pay(amount: number, currency: string): void {
        // TODO: Convert (adapt) the new interface to the old one
        // 1. Construct the XML string
        // 2. Call oldSystem.processPayment()
    }
}

// ---------------------------------------------------------
// 4. Test
// ---------------------------------------------------------
const oldSystem = new OldPaymentSystem();
const adapter = new PaymentAdapter(oldSystem);

console.log("--- Processing Payment via Adapter ---");
adapter.pay(50, 'USD');
// Client thinks it's using a modern processor, but it's actually using the old XML system!
