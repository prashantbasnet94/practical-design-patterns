
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
type tPayment = 'paypal' | 'creaditCard' | 'bitcoin'
function messCheckout(method: tPayment){
    switch (method) {
        case 'bitcoin':
            break
        case 'creaditCard':
            break
        case 'paypal':
            break
        default:
            break
    }
}


interface IPaymentStrategy{
    pay(amount: number): void
}

class CreditCardStrategy implements IPaymentStrategy{
    constructor(private card:string) { }
    pay(amount: number): void {
        console.log("Credit Card payment of $", amount)
    }
}

class PayPalStrategy implements IPaymentStrategy{
    constructor(private address: string) { }
    pay(amount: number) {
        console.log("PAYPAL payement: $", amount)
    }
}
class BitcoinStrategy implements IPaymentStrategy{
    constructor(private wallet: string) { }
    pay(amount: number) {
        console.log("Bitcoin payment of ", amount)
        // this.payment.pay(amount)
    }
}


class Checkout{
    constructor(private paymentStrategy: IPaymentStrategy) { }
    setPayementStrategy(strategy: IPaymentStrategy) {
        this.paymentStrategy = strategy
    }
    processOrder(amount: number) {
        console.log("Checkout: processing order for $",amount )
        this.paymentStrategy.pay(amount)
    }
}


/*

let checkout = new Checkout(new BitcoinStrategy("bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"))
let checkout2 = new Checkout(new PayPalStrategy("prashant@gmail.com"))
let checkout3 = new Checkout(new CreditCardStrategy("4242-4242-4242-4242"))

this is 3 different checkout again, instead we can do

*/

let checkout = new Checkout(new BitcoinStrategy("bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"))
checkout.processOrder(50)

checkout.setPayementStrategy(new CreditCardStrategy("4242-4242-4242-4242"))
checkout.processOrder(100)

checkout.setPayementStrategy(new PayPalStrategy('prashantbanset@gmail.com'))
checkout.processOrder(500)