# Solution: Fixing the Wildcard Outage

## 1. The Decision Tree: "How to fix a hanging Database"

When the DB is at 100% CPU due to a bad query, follow this sequence.

```mermaid
graph TD
    Start[🔥 DB at 100% CPU] --> Q1{Is Site Down?}
    
    Q1 -- Yes --> Kill[<b>Phase 1: Kill Switch</b><br/>Terminates Queries & Disable Feature]
    Q1 -- No --> Analyze[Phase 2: Analyze Query Plan]
    
    Kill --> Q2{Do we need this Search?}
    
    Q2 -- Yes (Must have) --> Q3{Is it 'Starts With' or 'Contains'?}
    
    Q3 -- Starts With (abc%) --> BTree[Standard B-Tree Index]
    Q3 -- Contains (%abc%) --> Q4{Is it Postgres?}
    
    Q4 -- Yes --> GIN[<b>Phase 3: GIN Index</b><br/>(pg_trgm extension)]
    Q4 -- No --> TextSearch[Elasticsearch / OpenSearch]
    
    style Kill fill:#ffcccc,stroke:#cc0000,stroke-width:2px
    style GIN fill:#ccffcc,stroke:#009900,stroke-width:2px
```

---

## 2. The Fixes (Ranked)

### Phase 1: The Emergency Fix (T+0 minutes)
**Goal:** Restore service immediately.
**Action:** Kill the running queries and disable the Admin endpoint.
**Commands:**
```sql
-- 1. Find the bad queries
SELECT pid, query, state 
FROM pg_stat_activity 
WHERE query LIKE '%users%';

-- 2. Kill them
SELECT pg_terminate_backend(12345);
```
**Code Change:** Hot-patch the Admin API to return `503 Service Unavailable`.

### Phase 2: The "Postgres Native" Fix (The GIN Index)
**Goal:** Enable wildcard search without leaving Postgres.
**Concept:** A **GIN (Generalized Inverted Index)** with `pg_trgm` breaks text into "trigrams" (3-letter chunks).
*   `"gmail"` -> `gma`, `mai`, `ail`.
*   It indexes these chunks, allowing fast searching for *parts* of a word.

**Action:**
```sql
-- 1. Enable Extension
CREATE EXTENSION pg_trgm;

-- 2. Create GIN Index (Takes time! Run concurrently)
CREATE INDEX CONCURRENTLY idx_users_email_trgm 
ON users 
USING GIN (email gin_trgm_ops);
```
**Result:** Query time drops from **30s** to **50ms**.

### Phase 3: The "Reverse Index" Trick (Alternative)
**Goal:** Optimize specifically for "Suffix" search (like `@gmail.com`) without GIN overhead.
**Concept:** If you only care about the *end* of the string, store the string backwards.
*   Store `moc.liamg@nas...` in a new column `email_reversed`.
*   Index `email_reversed`.
*   Query: `WHERE email_reversed LIKE 'moc.liamg@%'` (This is a prefix search, so B-Tree works!).

---

## 3. Trade-Off Table

| Strategy | Speed (Read) | Speed (Write) | Storage Size | Complexity |
| :--- | :--- | :--- | :--- | :--- |
| **Full Table Scan (Original)** | 30,000ms ❌ | Fast | Small | Low |
| **GIN Index (pg_trgm)** | 50ms ✅ | Slows down (Heavy) | Large (+30%) | Medium |
| **Reverse Column** | 10ms ✅ | Fast | Medium | Medium (App logic needed) |
| **Elasticsearch** | 5ms 🚀 | Fast | Huge ($$) | High (New Infrastructure) |

## 4. Key Takeaways
1.  **Wildcards (%) at the start disable B-Trees.** `LIKE 'abc%'` uses the index. `LIKE '%abc'` does not.
2.  **Never create indexes during an outage.** `CREATE INDEX` locks tables (unless `CONCURRENTLY` is used) and burns CPU. Kill the feature first.
3.  **Search is hard.** If you need "Google-like" search on your DB, move to a Search Engine (Elastic/Solr) eventually. Don't abuse Postgres forever.
