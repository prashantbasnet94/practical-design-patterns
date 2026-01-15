# Case Study 6: The Sneaker Drop Disaster (Distributed Lock Race)

## STEP 1 – Initial Design

### The Context
We are launching a limited-edition sneaker drop. 
*   **Total Stock:** 100 pairs.
*   **Expected Traffic:** 50,000 users hitting the "Buy" button at the exact same millisecond.

### The Strategy: Distributed Locking
To prevent "Over-selling," we use Redis as a distributed lock. This ensures only one server can process an order at a time.

### The Logic (TypeScript)
```typescript
async function buySneaker(userId: string) {
    const lockKey = "lock:sneaker_123";
    const lockValue = userId;
    
    // 1. Acquire Lock (10 second timeout)
    // SETNX = Set if Not Exists
    const acquired = await redis.set(lockKey, lockValue, "EX", 10, "NX");
    
    if (!acquired) {
        throw new Error("Sold out or try again");
    }

    try {
        // 2. Check Inventory
        const stock = await db.getInventory(123);
        if (stock <= 0) throw new Error("Out of stock");

        // 3. Process Payment & Update DB
        // ⚠️ SIMULATION: DB is very slow today (takes 12 seconds)
        await db.decrementInventory(123);
        await db.createOrder(userId);
        
    } finally {
        // 4. Release Lock
        await redis.del(lockKey);
    }
}
```

### "Why the team thought this was fine"
*   "Redis locks are the industry standard."
*   "10 seconds is plenty of time to update a database."
*   "The `NX` flag ensures mutual exclusion."

---

## 🚨 The Incident: "The Negative Inventory"

**Timeline:**
*   **10:00:00:** Drop goes live.
*   **10:00:01:** 100 pairs are sold.
*   **10:00:15:** The warehouse manager calls. "Why did we sell 105 pairs? We only have 100 in the box!"

**The Logs:**
```text
[10:00:01] User A: Acquired Lock (Expires at 10:00:11)
[10:00:11] REDIS: Lock for User A EXPIRED (Auto-deleted)
[10:00:11] User B: Acquired Lock (Since it was empty)
[10:00:12] User A: Finished DB Write (Stock 100 -> 99)
[10:00:12] User A: Deleted Lock (But wait... it just deleted User B's lock!)
[10:00:13] User C: Acquired Lock...
```

---

## STEP 3 – My Turn

1.  **What is the "Zombie Process" problem here?**
2.  **How did User A accidentally kill User B's lock?**
3.  **How do we ensure that even if a process is slow, it doesn't allow someone else to steal the lock and over-sell?**
