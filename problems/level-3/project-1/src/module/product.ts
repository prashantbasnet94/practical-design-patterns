export interface IProduct {
    products: Map<string, tProduct>
    addProduct(id: string, price: number, stock: number): void
    checkStock(productId: string): number
}

type tProduct = { price: number, stock: number }

export class Product implements IProduct {
    public static instance: Product
    products: Map<string, tProduct> = new Map()

    constructor(){
        this.products.set('laptop', { price: 1200, stock: 10 });
        this.products.set('headset', { price: 150, stock: 30 });
    }
    

    checkStock(productId: string): number {
       return this.products.get(productId)?.stock || 0
    }
    addProduct(id: string, price: number, stock: number): void {
        this.products.set(id, { price, stock })
    }
    static getInstance(){
        if(!Product.instance){
            Product.instance = new Product()
        }
        return Product.instance
    }
}