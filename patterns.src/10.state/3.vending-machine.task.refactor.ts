/**
 * TASK: VENDING MACHINE
 *
 * Scenario:
 * A vending machine has a few slots of soda.
 *
 * States:
 * 1. NoCoinState: Waiting for someone to insert a dollar.
 * 2. HasCoinState: Waiting for someone to turn the crank.
 * 3. SoldState: Dispensing a soda.
 * 4. OutOfStockState: No sodas left.
 *
 * Requirements:
 * - If you insert a coin while 'OutOfStock', it should reject the coin.
 * - If you turn the crank while 'NoCoin', it should tell you to pay first.
 * - After dispensing, if the count is 0, transition to 'OutOfStock'.
 */

// states takes care of the events that happen i.e events changes the states
interface IVendingMachineState {
    insertCoin(v: IVendingMachine): void;
    ejectCoin(v: IVendingMachine): void;
    turnCrank(v: IVendingMachine): void;
    dispense(v: IVendingMachine): void;
}

interface IVendingMachine {
    // what are state of vending machine

    noCoinState: IVendingMachineState
    hasCoinState: IVendingMachineState
    outOfStockState: IVendingMachineState
    soldState: IVendingMachineState

    count: number
    state: IVendingMachineState
    // state of the machine

    setState(state: IVendingMachineState): void


    // features of the machine
    insertCoin(): void
    ejectCoin(): void
    turnCrank(): void
    dispence(): void

    releaseSoda(): void

}

export class VendingMachine implements IVendingMachine{
    noCoinState: IVendingMachineState;
    hasCoinState: IVendingMachineState;
    outOfStockState: IVendingMachineState;
    soldState: IVendingMachineState;
    state: IVendingMachineState;
    public count: number = 0
    constructor(count: number) {
        this.state = new NoCoinState()
        this.soldState = new SoldState
        this.outOfStockState = new OutOfStockState
        this.hasCoinState = new HasCoinState()
        this.noCoinState = new NoCoinState()
        this.count =count
    }
    setState(state: IVendingMachineState): void {
        this.state = state
    }
    insertCoin(): void {
        this.state.insertCoin(this)
    }
    ejectCoin(): void {
        this.state.ejectCoin(this)
    }
    turnCrank(): void {
        this.state.turnCrank(this)
    }
    dispence(): void {
        this.state.dispense(this)
    }
    releaseSoda(): void {
        console.log("A soda comes rolling out the slot ....")
        if(this.count > 0) this.count--
    }

}

class NoCoinState implements IVendingMachineState{

    insertCoin(v: IVendingMachine): void {
        console.log("You inserted a coin")
        v.setState(new HasCoinState())
    }
    ejectCoin(v: IVendingMachine): void {
        console.log("No coin to eject")
    }
    turnCrank(v: IVendingMachine): void {
        console.log("Please insert coin to get started")
    }
    dispense(v: IVendingMachine): void {
        console.log("Please pay first to get your soda")
    }

}
class HasCoinState implements IVendingMachineState{
    insertCoin(v: IVendingMachine): void {
        console.log("You cannot insert another coin")
    }
    ejectCoin(v: IVendingMachine): void {
        console.log("Coin Returned")
        v.setState(new NoCoinState())
    }
    turnCrank(v: IVendingMachine): void {
        console.log("you turned..., giving you soda")
        v.setState(new SoldState())
    }
    dispense(v: IVendingMachine): void {
        console.log("No soda dispensed yet, please turn the crank first")
    }
}

class SoldState implements IVendingMachineState{
    insertCoin(v: IVendingMachine): void {
        console.log("Please wait, we are giving you soda")
    }
    ejectCoin(v: IVendingMachine): void {
        console.log("Sorry you already turned the crank")
    }
    turnCrank(v: IVendingMachine): void {
        console.log("Turning twice does not get your another soda")
    }
    dispense(v: IVendingMachine): void {
        v.releaseSoda()
        if (0 < v.count) {
            v.setState(new NoCoinState())
        } else {
            v.setState(new OutOfStockState())
        }
    }
}

class OutOfStockState implements IVendingMachineState{
    insertCoin(v: IVendingMachine): void {
        console.log("Out of Stock: Can't insert a coin")
    }
    ejectCoin(v: IVendingMachine): void {
        console.log("Out of Stock: Can't eject a coin")
    }
    turnCrank(v: IVendingMachine): void {
        console.log("Out of Stock: No soda available")
    }
    dispense(v: IVendingMachine): void {
        console.log("Out of Stock: No soda dispensed")

    }
}

let machine = new VendingMachine(10)
console.log("setting up vending machine")
console.log("\n ---- Person : 0 ----")
machine.insertCoin()
machine.turnCrank()
machine.dispence()


console.log("\n ---- Person : 1 ----")
machine.ejectCoin()
machine.dispence()


console.log("\n ---- Person: 2 ----")
machine.insertCoin()
machine.dispence()

console.log("\n ---- Person: 3 ----")
machine.dispence()
machine.turnCrank()


console.log("\n ---- Person: 4 ----")
machine.dispence()
machine.insertCoin()
machine.ejectCoin
machine.dispence()
