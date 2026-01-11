
export class KVStore {
    stack: Map<string, string | null>[]
    constructor() {

        this.stack = [new Map<string, string| null>()]
    }

    set(key: string, value: string): void {
        this.stack[this.stack.length - 1].set(key, value)
    }

    get(key: string): string | null {
        for (let i = this.stack.length - 1; -1 < i; i--){
            let map = this.stack[i]
              if (map.has(key)) {
                 return map.get(key) || ''
             }
        }
        // TODO
        return null;
    }

    delete(key: string): void {
        let map = this.stack[this.stack.length -1]
            map.set(key, null)
    }

    begin(): void {
       this.stack.push(new Map())
    }

    commit(): void {
        // take the top of the stack and commit to the prev verion of it
        let topLayer = this.stack[ this.stack.length - 1 ]
        let prevLayer = this.stack[ this.stack.length - 2 ]
        if(!prevLayer) return
        for (let [ k, v ] of topLayer) {
            prevLayer.set(k, v)
        }
        this.stack.pop()
    }

    rollback(): void {
       1 < this.stack.length && this.stack.pop()
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
