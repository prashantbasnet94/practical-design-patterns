import { CircuitBreaker } from './3.circuit-breaker.template';

/**
 * SCENARIO:
 * You have a simple function `fetchUser`.
 * You want to "Decorate" it with Circuit Breaker protection.
 */

// 1. THE NAKED FUNCTION (Unsafe)
// This is your normal code. It doesn't know about circuit breakers.
async function fetchUser(id: number) {
  console.log(`   -> 🌍 Network Call: GET /users/${id}`);

  // Simulate a crash 70% of the time
  if (Math.random() < 0.7) {
    throw new Error('HTTP 500: Server Exploded');
  }
  return { id, name: 'Alice', role: 'Admin' };
}

// 2. THE DECORATION
// We wrap `fetchUser` inside the Circuit Breaker.
// The `breaker` acts as a proxy/guard.
const protectedFetchUser = new CircuitBreaker(() => fetchUser(42));

// 3. USAGE
async function runDemo() {
  console.log('--- Starting Decorator Demo ---');

  for (let i = 1; i <= 10; i++) {
    try {
      console.log(`
Attempt ${i}:`);

      // We call the BREAKER, not the function directly
      const user = await protectedFetchUser.execute();

      console.log(`   ✅ Success: User ${user.name} loaded.`);
    } catch (error: any) {
      console.log(`   ❌ Error: ${error.message}`);
    }

    // Wait a bit to simulate real user traffic
    await new Promise((r) => setTimeout(r, 500));
  }
}

runDemo();
