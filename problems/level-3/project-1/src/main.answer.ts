
// The client code interacts with one massive, complex class.

import { Facade } from './ecommerce.facade';

const ecommerce = new Facade()
const userId = 'user1';
const productId = 'laptop';

console.log(`Checking stock for ${productId}: ${ecommerce.purchaseProduct(productId, userId, 2)}`);

console.log('\n--- Placing an order ---');


console.log(`\nChecking stock for ${productId} after order: ${ecommerce.checkProductStock(productId)}`);

console.log('\n--- Placing another order (should fail) ---');
ecommerce.purchaseProduct(userId, productId, 100); // Not enough stock
