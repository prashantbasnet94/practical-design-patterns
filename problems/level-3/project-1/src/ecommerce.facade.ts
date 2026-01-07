import { Order } from './module/order';
import { Product } from './module/product';
import { User } from './module/user';

export class Facade{
    private orders: Order
    private users: User
    private product: Product

    constructor(){
        this.orders = Order.getInstance()
        this.product = Product.getInstance()
        this.users = User.getInstance()
    }

    purchaseProduct(productId: string, userId:string, quantity: number): boolean{
        const userExist = this.users.getUser(userId)
        if(!userExist){
            console.error('Facade pattern', 'user does not exist')
            return false
        }
        const stock = this.product.checkStock(productId)
        if(stock < quantity){
            console.log("Facade error: Insufficient stock")
            return false
        }

        return this.orders.processOrder(userId, productId, quantity)
    }
    checkProductStock(productId: string): number{
        return this.product.checkStock(productId)
    }
}