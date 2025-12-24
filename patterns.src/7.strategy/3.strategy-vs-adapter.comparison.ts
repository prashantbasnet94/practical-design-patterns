/**
 * STRATEGY vs ADAPTER
 * 
 * They look purely structurally identical:
 * - Both use an interface (e.g., IWeaphon, IPayment).
 * - Both use composition (The Context "has a" Strategy/Adapter).
 * 
 * BUT their *INTENT* is opposite.
 */

// ==========================================
// 1. ADAPTER PATTERN
// Problem: "I have a Square Peg, but a Round Hole."
// Use when: You have legacy code/libraries you CANNOT change.
// ==========================================

interface IRoundHole {
    fitRoundPeg(): void;
}

// 3rd Party Library (We can't change this code)
class SquarePegLibrary {
    insertSquarePeg() { console.log("I am square!"); }
}

// The Adapter makes the Square Peg look Round
class PegAdapter implements IRoundHole {
    constructor(private square: SquarePegLibrary) { }

    fitRoundPeg() {
        // Translation happens here
        this.square.insertSquarePeg();
    }
}


// ==========================================
// 2. STRATEGY PATTERN
// Problem: "I have 3 different tools for the same job."
// Use when: You are designing a system to be flexible from day one.
// ==========================================

interface ITool {
    doWork(): void;
}

// We control all these classes. We designed them to match the interface.
class HammerStrategy implements ITool {
    doWork() { console.log("Hammering..."); }
}

class ScrewdriverStrategy implements ITool {
    doWork() { console.log("Screwing..."); }
}

class WrenchStrategy implements ITool {
    doWork() { console.log("Wrenching..."); }
}

// The Context (Worker) swaps tools as needed
class Worker {
    private tool: ITool;

    constructor(initialTool: ITool) {
        this.tool = initialTool;
    }

    setTool(newTool: ITool) {
        this.tool = newTool;
    }

    work() {
        this.tool.doWork();
    }
}


/**
 * SUMMARY:
 * 
 * ADAPTER: 
 * - Retrofitting. 
 * - Making two INCOMPATIBLE specific things work together.
 * - Usually one-off implementation.
 * 
 * STRATEGY: 
 * - Planning ahead.
 * - Making a family of COMPATIBLE algorithms swappable.
 * - Usually involves multiple implementations (Strategies).
 */
