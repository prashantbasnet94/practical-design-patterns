-- SOLUTION: The GIN Index Fix
-- This enables efficient wildcard searching in Postgres.

-- 1. Enable the Trigram Extension
-- This allows Postgres to break strings into 3-letter chunks ("gmail" -> "gma", "mai", "ail")
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- 2. Create the GIN Index
-- GIN = Generalized Inverted Index.
-- 'gin_trgm_ops' tells it to use the trigram logic.
-- NOTE: In production, ALWAYS use CONCURRENTLY to avoid locking the table!
CREATE INDEX CONCURRENTLY idx_users_email_trgm 
ON users 
USING GIN (email gin_trgm_ops);

-- 3. The New Query Plan
-- Now, Postgres can use the GIN index for the wildcard query.
-- Latency drops from 30s -> 50ms.
EXPLAIN ANALYZE SELECT * FROM users WHERE email LIKE '%@gmail.com';

-- ALTERNATIVE SOLUTION: The "Reverse" Index
-- If you can't use GIN (too much storage), you can index the reverse string.

-- 1. Add a generated column (Postgres 12+)
ALTER TABLE users ADD COLUMN email_reversed VARCHAR(255) 
GENERATED ALWAYS AS (reverse(email)) STORED;

-- 2. Index the reversed column (B-Tree works here!)
CREATE INDEX idx_users_email_reversed ON users(email_reversed);

-- 3. Query the reversed column
-- We search for 'moc.liamg@%' (which is a prefix search!)
EXPLAIN ANALYZE SELECT * FROM users WHERE email_reversed LIKE 'moc.liamg@%';
