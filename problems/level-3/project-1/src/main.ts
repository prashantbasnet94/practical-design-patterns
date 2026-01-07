import { ECommerceSystem } from "./ecommerce-system";

// The client code interacts with one massive, complex class.
const system = new ECommerceSystem();

const userId = 'user1';
const productId = 'laptop';

console.log(`Checking stock for ${productId}: ${system.checkStock(productId)}`);

console.log('\n--- Placing an order ---');
system.processOrder(userId, productId, 1);

console.log(`\nChecking stock for ${productId} after order: ${system.checkStock(productId)}`);

console.log('\n--- Placing another order (should fail) ---');
system.processOrder(userId, productId, 100); // Not enough stock
