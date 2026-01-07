// SMELL: This is a "God Class" that handles too many responsibilities.
export class ECommerceSystem {
    private products: Map<string, { price: number, stock: number }>;
    private users: Map<string, { name: string }>;
    private orders: any[];

    constructor() {
        this.products = new Map();
        this.users = new Map();
        this.orders = [];
        // Seed some data
        this.products.set('laptop', { price: 1200, stock: 10 });
        this.products.set('headset', { price: 150, stock: 30 });
        this.users.set('user1', { name: 'Alice' });
    }

    // Product Management Responsibility
    addProduct(id: string, price: number, stock: number) {
        console.log(`Adding product ${id}...`);
        this.products.set(id, { price, stock });
    }

    checkStock(productId: string): number {
        return this.products.get(productId)?.stock ?? 0;
    }

    // User Management Responsibility
    addUser(id: string, name: string) {
        console.log(`Adding user ${name}...`);
        this.users.set(id, { name });
    }

    getUser(userId: string) {
        return this.users.get(userId);
    }

    // Order Processing Responsibility
    processOrder(userId: string, productId: string, quantity: number): boolean {
        console.log(`Processing order for ${quantity} of ${productId} for user ${userId}...`);
        const product = this.products.get(productId);
        if (!this.users.has(userId)) {
            console.error('Order failed: User not found.');
            return false;
        }
        if (!product || product.stock < quantity) {
            console.error('Order failed: Insufficient stock.');
            return false;
        }

        // Simulate payment processing
        console.log('Processing payment...');
        const totalPrice = product.price * quantity;
        console.log(`Payment of $${totalPrice} successful.`);

        // Update stock
        product.stock -= quantity;
        this.products.set(productId, product);

        const order = { userId, productId, quantity, totalPrice, date: new Date() };
        this.orders.push(order);
        console.log('Order processed successfully.');
        return true;
    }
}
