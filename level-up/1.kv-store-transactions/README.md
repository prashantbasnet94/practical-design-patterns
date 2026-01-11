# Transactional Key-Value Store

## Objective
Design a Key-Value Store that supports nested transactions. This tests your ability to manage state, scopes, and data structure efficiency.

## Functional Requirements
The store should support the following operations:

1.  **Basic Operations:**
    *   `set(key: string, value: string): void`: Sets the value for a given key.
    *   `get(key: string): string | null`: Returns the value for the key, or `null` if it doesn't exist.
    *   `delete(key: string): void`: Removes the key from the store.

2.  **Transaction Operations:**
    *   `begin()`: Starts a new transaction. All subsequent operations are temporary until committed.
    *   `commit()`: Applies all changes from the current transaction to the parent scope (or permanently if it's the root).
    *   `rollback()`: Discards all changes made in the current transaction.

## Constraints & Edge Cases
*   **Nested Transactions:** You must support nested `begin()` calls.
    *   Example: `begin` -> `set(a, 1)` -> `begin` -> `set(a, 2)` -> `rollback` -> `get(a)` should return `1`.
*   **Performance:** Operations should be efficient (ideally O(1) for get/set).

## Example Scenario

```typescript
const store = new KVStore();

store.set("name", "Prashant");
store.get("name"); // "Prashant"

store.begin();
store.set("name", "Bob");
store.get("name"); // "Bob"

store.begin();
store.delete("name");
store.get("name"); // null
store.rollback(); // Undoes the delete

store.get("name"); // "Bob"
store.commit(); // "Bob" is now permanent (or moved to parent)

store.get("name"); // "Bob"
```
