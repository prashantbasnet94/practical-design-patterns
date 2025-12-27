/**
 * SMELL: Telescoping Constructor
 * Impossible to read, easy to break.
 */

export class Order {
    constructor(
        public id: string,
        public userId: string,
        public items: string[],
        public couponCode: string | null,
        public shippingAddress: string | null,
        public isGift: boolean,
        public giftMessage: string | null,
        public priority: 'normal' | 'express',
        public currency: string
    ) {
        // Validation logic mixed in constructor...
        if (isGift && !giftMessage) throw new Error("Gifts need a message!");
    }
}

// USAGE
const order = new Order(
    "123",
    "u-1",
    ["apple", "banana"],
    null,
    "123 Main St",
    true,
    "Happy Birthday!",
    "normal",
    "USD"
);
