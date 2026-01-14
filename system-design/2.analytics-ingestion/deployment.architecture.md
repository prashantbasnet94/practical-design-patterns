# Deployment Architecture: The Physical View

To handle 5,000+ RPS, we cannot run this on a single machine ("Same Instance"). 
We must split the components based on their **Resource Needs**.

## 1. The Network Topology (AWS Example)

**Answer:** They all live on the **SAME Network** (Virtual Private Cloud / VPC) for security and speed, but on **DIFFERENT Instances** (Virtual Machines / Containers).

```mermaid
graph TB
    subgraph VPC [🔒 Private Network (VPC 10.0.0.0/16)]
        
        subgraph Public_Subnet [Public Zone]
            LB[Load Balancer]
        end

        subgraph App_Tier [Compute Layer]
            API1[API Server 1]
            API2[API Server 2]
            Worker1[Worker Node 1]
            Worker2[Worker Node 2]
        end

        subgraph Data_Tier [Data Layer]
            Redis[(Redis Cache)]
            DB[(Postgres Primary)]
        end
    end

    Internet -- HTTPS --> LB
    LB -- HTTP --> API1
    LB -- HTTP --> API2
    
    API1 -- Fast Write --> Redis
    API2 -- Fast Write --> Redis
    
    Worker1 -- Read --> Redis
    Worker2 -- Read --> Redis
    
    Worker1 -- Bulk Insert --> DB
    Worker2 -- Bulk Insert --> DB
```

---

## 2. Why Different Instances? (The "Resource Profile")

We split them because they "eat" different things. If you put them on the same machine, they fight for resources.

| Component | Resource Hungry For... | Scaling Strategy |
| :--- | :--- | :--- |
| **API Server** | **CPU** (JSON parsing, SSL) | **Horizontal** (Auto-scale 5 -> 50 nodes) |
| **Redis** | **RAM** (Storing queues) | **Vertical** (Get a bigger RAM machine) |
| **Worker** | **CPU & Network** (Batch processing) | **Horizontal** (Add more workers if queue builds up) |
| **Postgres** | **Disk I/O** (Writing to SSD) | **Vertical** (Better SSDs, more IOPS) |

## 3. Network Latency Rules

*   **API -> Redis:** Must be **< 1ms**. They must be in the same Data Center (Availability Zone).
*   **Worker -> DB:** Can be slower (5-10ms) because we are doing large batches, so latency matters less.

## 4. Security
*   **Public Access:** Only the **Load Balancer** has a Public IP.
*   **Private Access:** The API, Redis, Worker, and DB have **Private IPs** only. You cannot "hack" the database directly from the internet because it has no door to the outside world.

## Summary
*   **Same Network?** YES (Private VPC).
*   **Same Instance?** NO.
*   **Why?** To prevent the "Noisy Neighbor" effect. If the API gets flooded with traffic and maxes out the CPU, we don't want the Database to crash because it was on the same CPU.
