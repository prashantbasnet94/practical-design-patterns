/**
 * Back-of-the-envelope Estimation: Phase 1 (At Launch)
 *
 *  1 ride = 1 post api call
 *  1 api payload is 2kb
 *  1 sec we have 5 * 2 = 10kb data to be stored in peak time
 *  1 day has 10,000 rides
 *  86400 sec has 10,0000 rides
 *  1 sec has 10,000/86400 rides
 *  1 sec has  0.11 rides
 *  in peak time, 1 sec has 5 rides = 10 kb
 *
 *
 *
 *
 *
 *
 *
 * Context:
 * - 1 Ride = 1 API Call (POST /ride-completed)
 * - The driver app sends this single request when the trip ends.
 *
 * Assumptions:
 * - Daily Rides: 10,000 rides/day
 * - Peak Traffic: 5 rides/sec (RPS)
 * - Payload Size: 2 KB
 *
 * 1. Throughput (Requests Per Second)
 *    - Peak: 5 requests/sec
 *    - Average: 10,000 / 86,400 (seconds in a day) ≈ 0.12 requests/sec
 *    - Conclusion: 5 RPS is very low. A single Node.js instance can handle ~1k+ RPS.
 *      Two instances behind a load balancer is overkill for capacity, but good for redundancy.
 *
 * 2. Bandwidth (Network I/O)
 *    - Peak Inbound Data: 5 requests/sec * 2 KB = 10 KB/sec
 *    - Conclusion: Trivial. Any standard server network interface (1Gbps) can handle this easily.
 *
 * 3. Storage Growth (Database)
 *    - Daily: 10,000 rides * 2 KB = 20 MB/day
 *    - Monthly: 20 MB * 30 days = 600 MB/month
 *    - Yearly: 600 MB * 12 months = ~7.2 GB/year
 *    - Conclusion: 16GB RAM + SSD is more than enough to hold the entire active dataset in memory or on disk for years.
 *
 * Overall Status (Phase 1):
 * The system is effectively "idle" most of the time. The team's choice to keep it simple (KISS) was correct for this scale.
 */