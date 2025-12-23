/**
 * EXERCISE: Factory Pattern - Payment Processing System
 *
 * SCENARIO:
 * Build a payment processing system that supports multiple payment methods.
 * Each payment method has different processing fees and validation rules.
 *
 * YOUR TASKS:
 * 1. Create an IPaymentProcessor interface with methods:
 *    - processPayment(amount: number): boolean
 *    - validatePaymentDetails(details: any): boolean
 *    - getProcessingFee(amount: number): number
 *
 * 2. Implement these payment processors:
 *    - CreditCardProcessor (2.9% + $0.30 fee)
 *    - PayPalProcessor (3.5% fee)
 *    - CryptoProcessor (1% fee)
 *
 * 3. Create a PaymentFactory that returns the correct processor
 *
 * BONUS CHALLENGE:
 * - Add transaction limits for each payment method
 * - Add a refund() method
 * - Implement payment details validation (card number format, etc.)
 */

// TODO: Define IPaymentProcessor interface

// TODO: Implement CreditCardProcessor
// Fee: 2.9% + $0.30

// TODO: Implement PayPalProcessor
// Fee: 3.5%

// TODO: Implement CryptoProcessor
// Fee: 1%

type PaymentMethod = 'creditcard' | 'paypal' | 'crypto';

// TODO: Implement PaymentFactory
function createPaymentProcessor(method: PaymentMethod) {
    throw new Error("Not implemented");
}

// --- TESTS ---
// Uncomment when ready to test

// const ccProcessor = createPaymentProcessor('creditcard');
// console.log('Credit Card Fee for $100:', ccProcessor.getProcessingFee(100)); // $3.20
// console.log('Payment processed:', ccProcessor.processPayment(100));

// const paypalProcessor = createPaymentProcessor('paypal');
// console.log('PayPal Fee for $100:', paypalProcessor.getProcessingFee(100)); // $3.50

// const cryptoProcessor = createPaymentProcessor('crypto');
// console.log('Crypto Fee for $100:', cryptoProcessor.getProcessingFee(100)); // $1.00

export {};
