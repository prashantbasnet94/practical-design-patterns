-- SCENARIO: The "Missing Index" Outage
-- This file sets up the schema and demonstrates the failure.

-- 1. Setup Table (50 Million Rows in production)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    username VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);

-- 2. The "Standard" Index
-- This is a B-Tree index. It is perfect for equality (=) and prefix (LIKE 'abc%')
CREATE UNIQUE INDEX idx_users_email ON users(email);

-- 3. The Good Query (Fast)
-- Uses the Index. Takes ~1ms.
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@example.com';

-- 4. The Bad Query (The Outage Trigger)
-- Because of the leading wildcard '%', Postgres CANNOT use the B-Tree index.
-- It must scan the entire table (Sequential Scan).
-- In a 50M row table, this burns 100% CPU and takes 30+ seconds.
EXPLAIN ANALYZE SELECT * FROM users WHERE email LIKE '%@gmail.com';
