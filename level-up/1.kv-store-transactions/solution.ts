
export class KVStore {
    constructor() {
        // Initialize your data structure here
    }

    set(key: string, value: string): void {
        // TODO
    }

    get(key: string): string | null {
        // TODO
        return null;
    }

    delete(key: string): void {
        // TODO
    }

    begin(): void {
        // TODO
    }

    commit(): void {
        // TODO
    }

    rollback(): void {
        // TODO
    }
}

// --- Test Area ---
const store = new KVStore();
console.log("--- Starting Test ---");
store.set("foo", "bar");
console.log("get foo:", store.get("foo")); // Expected: bar

store.begin();
store.set("foo", "baz");
console.log("get foo (in tx):", store.get("foo")); // Expected: baz

store.rollback();
console.log("get foo (after rollback):", store.get("foo")); // Expected: bar
