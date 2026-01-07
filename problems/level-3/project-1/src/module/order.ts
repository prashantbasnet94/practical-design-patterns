import { IProduct, Product } from './product';
import { IUser, User } from './user';


export interface IOrder {
    processOrder(userId: string, productId: string, quantity: number): boolean
}

export type tOrder = {userId:string, productId:string, quantity:number, totalPrice: number, date:Date}

export class Order implements IOrder {
    public static instance: Order
    public orders : tOrder[] = []
    constructor(private products: IProduct, private users: IUser){}
    processOrder(userId: string, productId: string, quantity: number): boolean {
        console.log(`Processing order for ${quantity} of ${productId} for user ${userId}...`);
        const product = this.products.products.get(productId);
        if (!this.users.users.has(userId)) {
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
        this.products.products.set(productId, product);

        const order : tOrder = { userId, productId, quantity, totalPrice, date: new Date() };
        this.orders.push(order);
        console.log('Order processed successfully.');
        return true;
    }
    static getInstance(){
        if(!Order.instance){
            Order.instance = new Order(Product.getInstance() ,User.getInstance())
        }
        return Order.instance
    }
}