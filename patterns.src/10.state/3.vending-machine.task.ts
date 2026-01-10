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

interface State {
    insertCoin(): void;
    ejectCoin(): void;
    turnCrank(): void;
    dispense(): void;
}

export class VendingMachine {
    private noCoinState: State;
    private hasCoinState: State;
    private soldState: State;
    private outOfStockState: State;

    private currentState: State;
    public count: number = 0;

    constructor(numberOfSodas: number) {
        this.noCoinState = new NoCoinState(this);
        this.hasCoinState = new HasCoinState(this);
        this.soldState = new SoldState(this);
        this.outOfStockState = new OutOfStockState(this);

        this.count = numberOfSodas;
        if (numberOfSodas > 0) {
            this.currentState = this.noCoinState;
        } else {
            this.currentState = this.outOfStockState;
        }
    }

    // State switchers
    public setState(state: State) { this.currentState = state; }
    public getNoCoinState() { return this.noCoinState; }
    public getHasCoinState() { return this.hasCoinState; }
    public getSoldState() { return this.soldState; }
    public getOutOfStockState() { return this.outOfStockState; }

    // Actions
    public insertCoin() { this.currentState.insertCoin(); }
    public ejectCoin() { this.currentState.ejectCoin(); }
    public turnCrank() {
        this.currentState.turnCrank();
        this.currentState.dispense();
    }

    public releaseSoda() {
        console.log("A soda comes rolling out the slot...");
        if (this.count > 0) this.count--;
    }
}

// TODO: IMPLEMENT CONCRETE STATES

class NoCoinState implements State {
    constructor(private machine: VendingMachine) {}
    insertCoin(): void {
        console.log("You inserted a coin.");
        this.machine.setState(this.machine.getHasCoinState());
    }
    ejectCoin(): void { console.log("You haven't inserted a coin."); }
    turnCrank(): void { console.log("You turned, but there's no coin."); }
    dispense(): void { console.log("You need to pay first."); }
}

class HasCoinState implements State {
    constructor(private machine: VendingMachine) {}
    insertCoin(): void { console.log("You can't insert another coin."); }
    ejectCoin(): void {
        console.log("Coin returned.");
        this.machine.setState(this.machine.getNoCoinState());
    }
    turnCrank(): void {
        console.log("You turned...");
        this.machine.setState(this.machine.getSoldState());
    }
    dispense(): void { console.log("No soda dispensed yet."); }
}

class SoldState implements State {
    constructor(private machine: VendingMachine) {}
    insertCoin(): void { console.log("Please wait, we're already giving you a soda."); }
    ejectCoin(): void { console.log("Sorry, you already turned the crank."); }
    turnCrank(): void { console.log("Turning twice doesn't get you another soda!"); }
    dispense(): void {
        this.machine.releaseSoda();
        if (this.machine.count > 0) {
            this.machine.setState(this.machine.getNoCoinState());
        } else {
            console.log("Oops, out of sodas!");
            this.machine.setState(this.machine.getOutOfStockState());
        }
    }
}

class OutOfStockState implements State {
    constructor(private machine: VendingMachine) {}
    insertCoin(): void { console.log("You can't insert a coin, the machine is sold out."); }
    ejectCoin(): void { console.log("You can't eject, you haven't inserted a coin yet."); }
    turnCrank(): void { console.log("You turned, but there are no sodas."); }
    dispense(): void { console.log("No soda dispensed."); }
}
