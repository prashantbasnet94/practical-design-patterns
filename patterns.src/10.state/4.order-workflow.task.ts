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

interface OrderState {
    name: string;
    pay(): void;
    cancel(): void;
    ship(): void;
    deliver(): void;
}

export class Order {
    private state: OrderState;

    constructor() {
        // Initial state
        this.state = new NewOrderState(this);
    }

    setState(state: OrderState) {
        console.log(`Transitioning: ${this.state.name} -> ${state.name}`);
        this.state = state;
    }

    public pay() { this.state.pay(); }
    public cancel() { this.state.cancel(); }
    public ship() { this.state.ship(); }
    public deliver() { this.state.deliver(); }

    public refundMoney() {
        console.log("Refunding payment to customer...");
    }
}

// TODO: IMPLEMENT THE STATES BELOW

class NewOrderState implements OrderState {
    name = "New";
    constructor(private order: Order) {}
    pay() { this.order.setState(new PaidOrderState(this.order)); }
    cancel() { this.order.setState(new CancelledOrderState()); }
    ship() { console.log("Cannot ship unpaid order."); }
    deliver() { console.log("Cannot deliver unpaid order."); }
}

class PaidOrderState implements OrderState {
    name = "Paid";
    constructor(private order: Order) {}
    pay() { console.log("Already paid."); }
    cancel() {
        this.order.refundMoney();
        this.order.setState(new CancelledOrderState());
    }
    ship() { this.order.setState(new ShippedOrderState(this.order)); }
    deliver() { console.log("Order must be shipped first."); }
}

class ShippedOrderState implements OrderState {
    name = "Shipped";
    constructor(private order: Order) {}
    pay() { console.log("Already paid."); }
    cancel() { console.log("Error: Cannot cancel after shipping!"); }
    ship() { console.log("Already shipped."); }
    deliver() { this.order.setState(new DeliveredOrderState()); }
}

class DeliveredOrderState implements OrderState {
    name = "Delivered";
    pay() { console.log("Order is already delivered."); }
    cancel() { console.log("Order is already delivered."); }
    ship() { console.log("Order is already delivered."); }
    deliver() { console.log("Order is already delivered."); }
}

class CancelledOrderState implements OrderState {
    name = "Cancelled";
    pay() { console.log("Order is cancelled."); }
    cancel() { console.log("Order is already cancelled."); }
    ship() { console.log("Order is cancelled."); }
    deliver() { console.log("Order is cancelled."); }
}
