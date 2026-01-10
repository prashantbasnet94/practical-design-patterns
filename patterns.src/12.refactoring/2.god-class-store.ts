/**
 * REFACTORING CHALLENGE 2: THE GOD CLASS
 * 
 * SMELLS:
 * 1. "God Class": `SuperStore` knows EVERYTHING.
 * 2. Low Cohesion: What does 'Inventory' have to do with 'Email'?
 * 
 * GOAL:
 * Refactor using **Facade Pattern**:
 * 1. Break `SuperStore` into `InventorySystem`, `BillingSystem`, `NotificationSystem`.
 * 2. Create a clean `StoreFacade` that coordinates them.
 */

class SuperStore {
    private inventory: any = {};
    private bills: any[] = [];
    private users: string[] = [];

    // --- Inventory Logic ---
    addToInventory(id: string, name: string, qty: number) {
        console.log(`[Inventory] Added ${name}`);
        this.inventory[id] = qty;
    }

    checkStock(id: string) {
        return this.inventory[id] > 0;
    }

    // --- Billing Logic ---
    createBill(amount: number) {
        console.log(`[Billing] Created bill for $${amount}`);
        this.bills.push(amount);
    }

    processPayment(billId: number) {
        console.log(`[Billing] Payment processed`);
    }

    // --- User/Email Logic ---
    notifyUser(userId: string, msg: string) {
        console.log(`[Email] Sending to ${userId}: ${msg}`);
    }

    // --- The "Do Everything" Method ---
    buyItem(userId: string, itemId: string, amount: number) {
        if (this.inventory[itemId] > 0) {
            this.inventory[itemId]--;
            this.bills.push(amount);
            console.log(`[Billing] Payment processed`);
            console.log(`[Email] Sending to ${userId}: Your order is confirmed`);
            console.log("Purchase Success!");
        } else {
            console.log("Out of stock!");
        }
    }
}

const store = new SuperStore();
store.addToInventory("1", "Laptop", 5);
store.buyItem("user1", "1", 1000);
