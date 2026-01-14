# Solution: The Async Worker Pattern

## 1. The Decision Tree: "Which Queue?"

We needed to move the slow Email API call out of the critical request path. Here is how we selected the technology stack.

```mermaid
graph TD
    Start[Need to decouple Task] --> Q1{Can we lose data?}
    Q1 -- Yes --> A[In-Memory Array]
    Q1 -- No --> Q2{Are we AWS Native?}
    
    Q2 -- Yes --> B[AWS SQS]
    Q2 -- No --> Q3{Complexity Constraint?}
    
    Q3 -- Low Ops/Node.js --> C[Redis + BullMQ]
    Q3 -- High Ops/Polyglot --> D[RabbitMQ]
    
    style C fill:#bbf,stroke:#333,stroke-width:4px
```

**Verdict:** We chose **Redis + BullMQ**.
*   **Why:** It fits naturally into the Node.js ecosystem, supports retries/delays out of the box, and is easier to manage than RabbitMQ for our scale (200 RPS).

---

## 2. The New Architecture

We separate the system into two distinct parts: the **Producer** (Fast API) and the **Consumer** (Slow Worker).

### The Flow
1.  **Driver** hits API.
2.  **API** saves to DB and pushes a Job ID to Redis. Responds immediately (50ms).
3.  **Worker** (running in background) picks up Job.
4.  **Worker** calls SendGrid. If it fails, it retries automatically.

```mermaid
sequenceDiagram
    participant Driver as Driver App
    participant API as API Server (Producer)
    participant DB as Postgres
    participant Queue as Redis (BullMQ)
    participant Worker as Worker Service (Consumer)
    participant Email as SendGrid

    rect rgb(240, 255, 240)
    Note over Driver, Queue: ⚡️ The Fast Lane (Synchronous)
    Driver->>API: POST /ride-completed
    API->>DB: INSERT Ride (Status: PENDING)
    API->>Queue: ADD Job { rideId: 123 }
    API-->>Driver: 200 OK (Ride Saved!)
    end

    rect rgb(255, 240, 240)
    Note over Queue, Email: 🐢 The Slow Lane (Asynchronous)
    Worker->>Queue: Process Next Job
    Queue-->>Worker: Get Job { rideId: 123 }
    Worker->>Email: Send Receipt (Takes 2s...)
    Email-->>Worker: 200 OK
    Worker->>DB: UPDATE Ride (Status: SENT)
    Worker->>Queue: Mark Job Complete
    end
```

---

## 3. Key Benefits

1.  **Latnecy Drop:** p95 goes from **3s -> 50ms**.
2.  **Resilience:** If SendGrid goes down, we don't lose emails. They just pile up in Redis and get processed when SendGrid is back.
3.  **Scalability:** We can scale the API (to handle more requests) separately from the Workers (to handle more emails). If the queue grows too large, we just boot up more Worker instances.
