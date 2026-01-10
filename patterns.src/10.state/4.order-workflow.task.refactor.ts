/**
 * TASK: ORDER WORKFLOW
 *
 * Scenario:
 * An e-commerce order has a lifecycle.
 *
 * States:
 * 1. NewOrder: Order created, not paid.
 *    - pay() -> Transitions to PaidOrder
 *    - cancel() -> Transitions to CancelledOrder
 *
 * 2. PaidOrder: Payment received.
 *    - ship() -> Transitions to ShippedOrder
 *    - cancel() -> Transitions to CancelledOrder (and triggers refund)
 *
 * 3. ShippedOrder: Out for delivery.
 *    - deliver() -> Transitions to DeliveredOrder
 *    - cancel() -> ERROR: Cannot cancel once shipped!
 *
 * 4. DeliveredOrder / CancelledOrder: Final States.
 *    - All actions should log "Order is already [Status]"
 */
interface IOrderState {
    name: string
    // these are the events
    pay(order: IEcommerce): void
    cancel(order: IEcommerce): void
    ship(order: IEcommerce): void
    deliver(order: IEcommerce): void
}

interface IEcommerce {
    state: IOrderState
    setState(state: IOrderState): void
    // these are events
    pay(): void
    cancel(): void
    ship(): void
    deliver(): void

    // feature of ecoommerce
    processPayment(): void
    refundMoney(): void
    onDelivery(): void
    onCancel(): void
    createShippingLabel(): void
}

class Ecommerce implements IEcommerce {

    state: IOrderState
    constructor() {
        this.state = new NewOrderState()
    }

    setState(state: IOrderState) {
        this.state = state
    }
    pay(): void {
        this.state.pay(this)
    }
    cancel(): void {
        this.state.cancel(this)
    }
    ship(): void {
        this.state.ship(this)
    }

    deliver(): void {
        this.state.deliver(this)
    }


    processPayment(): void {
        console.log("Receiving Fund for the Order")
        console.log("Payment Received!")
    }
    refundMoney(): void {
        console.log("Refunding payment to customer...")
    }
    createShippingLabel(): void {
        console.log("UPS: Creating shipping label using ups")
    }
    onDelivery(): void {
        console.log("Delivered: Packaged dropped in porch!")
    }
    onCancel(): void {
        console.log("Order is cancelled")
    }

}
// so the mental model is i am at this state and user is trigger this action?
//  what should be the concsuquence is my code on that block of function
class NewOrderState implements IOrderState {
    name = "New Order"
    pay(order: IEcommerce): void {
        order.processPayment()
        order.setState(new PaidState())
    }
    cancel(order: IEcommerce): void {
        order.onCancel()
        order.setState(new CancelledState())
    }
    ship(order: IEcommerce): void {
        console.log("Order cannot be shipped, please pay first")
    }
    deliver(order: IEcommerce): void {
        console.log("Order cannot be delivered, please pay first")
    }
}

class PaidState implements IOrderState {
    name = "Paid order"
    pay(order: IEcommerce): void {
        console.log("Order is Paid, don't pay me twice")
        // order.setState(new ShippedState())
    }
    cancel(order: IEcommerce) {
        order.onCancel()
        order.refundMoney()

        order.setState(new CancelledState())
    }
    ship(order: IEcommerce): void {
        order.createShippingLabel()
        order.setState(new ShippedState())
    }
    deliver(order: IEcommerce): void {
        console.log("Cannot be delivered without shipping")
    }
}

class CancelledState implements IOrderState {
    name = "Cancelled Order"
    pay(order: IEcommerce): void {
        console.log("Cannot Pay for Cancelled Order")
    }
    cancel(order: IEcommerce): void {
        console.log("Cannot cancel the same order twice")
    }
    ship(order: IEcommerce): void {
        console.log("Cannot ship for cancelled order")
    }
    deliver(order: IEcommerce): void {
        console.log("cannot deliver for cancelled order")
    }
}

class ShippedState implements IOrderState {
    name = "Shipped Order"
    pay(order: IEcommerce): void {
        console.log("Multiple payment rejected!")
    }
    cancel(order: IEcommerce): void {
        console.log("Cannot canel once shipped")

    }
    ship(order: IEcommerce): void {
       console.log("Relax, it's already on its way.")
    }
    deliver(order: IEcommerce): void {
        console.log("Creating delivery schedule")
        order.onDelivery()
       order.setState(new DeliveredState())
    }
}
class DeliveredState implements IOrderState {
    name = "Delivered Order"
    pay(order: IEcommerce): void {
        console.log("Multiple payment rejected, payment already received")
    }
    cancel(order: IEcommerce): void {
        console.log("Cannot cancel product on delivery status")
    }
    ship(order: IEcommerce): void {
        console.log("Shipping label already created!")
    }
    deliver(order: IEcommerce): void {
        console.log("Cannot delivery twice")
    }
}





let order = new Ecommerce()

console.log("\n user 1")
order.cancel()
order.deliver()


console.log("\n user 2")
order = new Ecommerce()
order.pay()
order.cancel()

order = new Ecommerce()
console.log("\n user 3")
order.pay()
order.ship()
order.deliver()


order = new Ecommerce()
console.log("\n user 4")
order.pay()
order.ship()
order.cancel()
order.deliver()

order = new Ecommerce()
console.log("\n user 5")
order.ship()
order.ship()
order.cancel()
order.deliver()

order = new Ecommerce()
console.log("\n user 6")
order.pay()
order.ship()
order.deliver()



