export { };

/**
 * EXERCISE: Observer Pattern - Stock Market Ticker
 *
 * SCENARIO:
 * You are building a Stock Market application.
 * there is a `StockMarket` subject that tracks stock prices.
 * Multiple users (Observers) want to be notified when a stock price changes.
 *
 * YOUR TASKS:
 * 1. Create an interface `IsObserver` with a method `update(stock: string, price: number): void`.
 * 2. Create a class `StockMarket` that:
 *    - Example: `subscribe(observer: IsObserver)`
 *    - Example: `unsubscribe(observer: IsObserver)`
 *    - Example: `setPrice(stock: string, price: number)` (which notifies all observers)
 * 3. Create two observers: `MobileApp` and `WebDashboard` that print different messages.
 *
 * BONUS:
 * - Implement a `NewsFeed` observer that only cares about specific stocks (e.g., only "TSLA").
 */

// TODO: Define Interfaces
interface IObserver {
    update(stock: string, price: number): void
}
interface IStockMarket {
    subscribe(observer: IObserver): void
    unsubscribe(observer: IObserver): void
    setPrice(stock: string, price: number): void
}

class StockMarket implements IStockMarket {
    private static instance: StockMarket
    private observers: IObserver[] = []
    private constructor() { }
    static getInstance() {
        if (!StockMarket.instance) {
            StockMarket.instance = new StockMarket()
        }
        return StockMarket.instance
    }
    subscribe(observer: IObserver): void {
        this.observers.push(observer)
    }
    unsubscribe(observer: IObserver): void {
        this.observers = this.observers.filter(o => o !== observer)
    }
    setPrice(stock: string, price: number): void {
        this.observers.forEach(o => o.update(stock, price))
    }
}


class MobileApp implements IObserver {
    update(stock: string, price: number): void {
        console.log(`[MobileApp] Stock update: ${stock} is now $${price}`);
    }
}
class WebDashboard implements IObserver {
    update(stock: string, price: number): void {
        console.log(`[WebDashboard] 📈 ${stock}: $${price}`);
    }
}

class NewsFeed implements IObserver {
    update(stock: string, price: number): void {
        if (stock === 'TSLA') {
            console.log(`[NewsFeed] 🚨 BREAKING NEWS! ${stock} just hit $${price}!`)
        }
    }
}


// TODO: Implement StockMarket (Subject)

// TODO: Implement Observers

// --- TESTS ---
const market = StockMarket.getInstance()
const mobile = new MobileApp()
const webApp = new WebDashboard()

market.subscribe(mobile)
market.subscribe(webApp)
market.subscribe(new NewsFeed())

market.setPrice('APPL', 200)
market.setPrice('META', 300)
market.setPrice('TSLA', 500)
