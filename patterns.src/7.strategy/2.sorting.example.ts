/**
 * STRATEGY PATTERN - REAL WORLD EXAMPLE (SORTING)
 *
 * Scenario:
 * A DataProcessor class that needs to sort data.
 * The "best" sorting algorithm depends on the dataset size.
 * - Small dataset (< 10 items): Bubble Sort is actually fast enough and simple.
 * - Large dataset (> 1000 items): Quick Sort or Merge Sort is required.
 */

// --- 1. The Strategy Interface ---
interface ISortStrategy {
    sort(dataset: number[]): number[];
}

// --- 2. Concrete Strategies ---

class BubbleSortStrategy implements ISortStrategy {
    sort(dataset: number[]): number[] {
        console.log("--> Sorting using Bubble Sort (Slow but simple)");
        // create a copy
        const arr = [...dataset];
        // naive implementation for output demonstration
        return arr.sort((a, b) => a - b);
    }
}

class QuickSortStrategy implements ISortStrategy {
    sort(dataset: number[]): number[] {
        console.log("--> Sorting using Quick Sort (Fast for large datasets)");
        const arr = [...dataset];
        return arr.sort((a, b) => a - b);
    }
}

// --- 3. The Context ---
class Sorter {
    constructor(private strategy: ISortStrategy) { }

    public setStrategy(strategy: ISortStrategy) {
        this.strategy = strategy;
    }

    public sort(data: number[]) {
        return this.strategy.sort(data);
    }
}

// --- 4. Usage ---

const smallPayload = [5, 1, 4, 2, 8];
const hugePayload = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 1000));

const sorter = new Sorter(new BubbleSortStrategy());

console.log("--- Client needs to sort small data ---");
sorter.sort(smallPayload);

console.log("\n--- Client needs to sort HUGE data ---");
// Strategy Pattern allows us to switch algorithms at runtime!
sorter.setStrategy(new QuickSortStrategy());
sorter.sort(hugePayload);

/**
 * WHY THIS MATTERS:
 * We eliminated the "Switch Statement of Doom":
 *
 * class BadSorter {
 *   sort(data, type) {
 *      if (type === 'bubble') { ... }
 *      else if (type === 'quick') { ... }
 *   }
 * }
 *
 * If we wanted to add "MergeSort", we'd have to OPEN the BadSorter class.
 * With Strategy, we just create `class MergeSortStrategy` and pass it in.
 * (Open/Closed Principle)
 */
