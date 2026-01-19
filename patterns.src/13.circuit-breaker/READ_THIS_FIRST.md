# Read This First: The Circuit Breaker Pattern 🔌

## The Scenario: The Domino Effect 🁆

In distributed systems (like microservices), dependencies fail. It's not a matter of _if_, but _when_.
If Service A calls Service B, and Service B hangs or crashes, Service A will likely hang or crash too. This chain reaction is called a **Cascading Failure**.

## The Goal 🎯

Your job is to stop the bleeding. When a service is down, stop asking it for data. Let it recover.

## The Problem: "Hammering" 🔨

Imagine a website that calls a Payment API.

1. The Payment API goes down (500 Error).
2. Users keep clicking "Pay Now".
3. Your server sends thousands of requests to the dead API.
4. **Result:** The API never recovers because it's being DDoSed by your own app. Your app runs out of connections and crashes too.

## The Solution: Circuit Breaker 🛡️

Think of it like the fuse box in your house.

### The 3 States

1.  **CLOSED ✅ (Normal)**
    - Electricity flows. Requests are allowed through.
    - We count failures. If failures > Threshold -> **TRIP THE BREAKER (Open)**.

2.  **OPEN 🛑 (Broken)**
    - The wire is cut. Requests are blocked immediately (Fast Failure).
    - We wait for a "Cool Down" period (e.g., 5 seconds).
    - After time passes -> **HALF-OPEN**.

3.  **HALF-OPEN ⚠️ (Testing)**
    - We let **one single request** through to check if the service is back.
    - Success? -> **CLOSE** the circuit (Back to normal).
    - Failure? -> **OPEN** the circuit again (Wait more).

## When to use it?

- **External APIs:** Stripe, Twilio, Google Maps.
- **Databases:** When the DB is under heavy load.
- **Microservices:** To prevent one bad service from taking down the whole cluster.

## Vocabulary

- **Threshold:** How many failures before we give up? (e.g., 5 failures)
- **Timeout:** How long do we wait for a response?
- **Backoff:** How long do we wait before trying again?

**update the state everytime**

1.  updateState && if ciruuitbreaker is opern throw an error
2.  we implement try {  
     request = await this.request()
    this.onSuccess()
    return result
    }
3.  cactch{
    this.failure()
    throw error
    }

4.  onSucess: reset the failureCount, state and lastFailureTime
    a. failure = 0
    b. state = closed
    c. latFailtureTime = null

5.  onFailure: update failureCount, lastFailureTime & update the circuitState based on failure count
    a. failureCount++
    b. lastFailtureTime = Date.now()
    if(threshold < failureCount){
    state = OPen
    }
6.  updateState:
    a. We only care if we are currently Broken
    b. Has it been 5 seconds since the last failure?
    c. If 5 seconds have passed, we change the state to HALF_OPEN.
    so the exture check open to be false as it is half open so the request goes through
