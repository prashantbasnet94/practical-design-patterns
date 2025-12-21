/**
 * STEP 1: THE CONCEPT
 * We want to treat a single "Product" and a "Box of Products" exactly the same way.
 * 
 * Scenario: We are calculating the total price of an order.
 * - An Item has a price.
 * - A Box contains Items (or other Boxes), and its price is the sum of its contents.
 */

// 1. The Common Interface
// Both a single Product and a Box must implement this.
interface Item {
    getPrice(): number;
}

// 2. The Leaf (A single product)
// It does the actual work (returns its price).
class Product implements Item {
    constructor(private name: string, private price: number) { }

    getPrice(): number {
        return this.price;
    }
}

// 3. The Composite (The Box)
// It contains a list of Items (which could be Products or other Boxes).
class Box implements Item {
    private items: Item[] = [];

    constructor(private name: string) { }

    add(item: Item) {
        this.items.push(item);
    }

    // The logic: Delegate to children!
    getPrice(): number {
        let total = 0;
        console.log(`Openning ${this.name}...`);

        for (const item of this.items) {
            total += item.getPrice();
        }

        return total;
    }
}

// 4. Usage
console.log("--- SHOPPING CART ---");

// Simple items
const phone = new Product("iPhone", 1000);
const headphones = new Product("AirPods", 200);

// A small box containing accessories
const accesssoryBox = new Box("Accessory Box");
accesssoryBox.add(headphones);
accesssoryBox.add(new Product("Charger", 30));

// A big box containing the phone AND the accessory box
const bigShipment = new Box("Big Shipment");
bigShipment.add(phone);
bigShipment.add(accesssoryBox);

// Calculate total price
console.log(`Total Price: $${bigShipment.getPrice()}`);

// EXPECTED OUTPUT:
// Openning Big Shipment...
// Openning Accessory Box...
// Total Price: $1230

/**
 * WHY IS THIS A BIG DEAL?
 * 
 * Without the Composite Pattern, the client code (above) would look like this:
 * 
 * let total = 0;
 * for (const item of bigShipment.items) {
 *    if (item instanceof Product) {
 *       total += item.price;
 *    } else if (item instanceof Box) {
 *       // We have to MANUALLY handle the box logic here
 *       for (const innerItem of item.items) {
 *          if (innerItem instanceof Product) {
 *             total += innerItem.price;
 *          } else if (innerItem instanceof Box) {
 *             // OH NO! Nested boxes require even more nested loops...
 *             // We would need to write a recursive helper function just for this.
 *          }
 *       }
 *    }
 * }
 * 
 * THE POWER:
 * 1. The client code (`total += item.getPrice()`) is SIMPLE. 
 * 2. It doesn't care if it's a Box or a Product.
 * 3. Adding a new type (e.g., "Pallet") requires NO CHANGE to the client code.
 */

/**
 * WHEN TO USE:
 * 1. You have a Tree Structure: Objects that contain other objects of the same type (part-whole hierarchy).
 * 2. You want Uniformity: You want clients to ignore the difference between compositions of objects and individual objects.
 * 
 * COMMON EXAMPLES:
 * - Filesystems (Files vs Folders)
 * - UI Systems (Buttons vs Panels containing Buttons)
 * - Menus (Menu Items vs Sub-Menus)
 * - Graphics (Shapes vs Groups of Shapes)
 */
