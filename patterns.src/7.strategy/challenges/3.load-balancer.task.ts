/**
 * CHALLENGE 3: LOAD BALANCER (System Design)
 * 
 * Scenario:
 * You have a list of backend servers: ['Server A', 'Server B', 'Server C'].
 * You need to distribute incoming requests among them.
 * 
 * Problem:
 * Different traffic patterns require different distribution logic.
 * 
 * Task:
 * Implement `ILoadBalancingStrategy` with `getNextServer(servers: string[]): string`.
 * 1. `RandomStrategy`: Picks a random server.
 * 2. `RoundRobinStrategy`: Picks A, then B, then C, then A... (Stateful!).
 * 3. `FirstAvailableStrategy`: Always picks the first one (simple).
 */

// --- 1. Interface ---
interface ILoadBalancingStrategy {
    getNextServer(servers: string[]): string;
}

// --- 2. Strategies ---

class RandomStrategy {
    // TODO: Math.random()
}

class RoundRobinStrategy {
    // TODO: Needs to keep track of current index!
    private currentIndex = 0;
}

// --- 3. Context ---

class LoadBalancer {
    constructor(
        private servers: string[],
        private strategy: ILoadBalancingStrategy
    ) { }

    setStrategy(strategy: ILoadBalancingStrategy) {
        this.strategy = strategy;
    }

    handleRequest(reqId: string) {
        const server = "TODO"; // this.strategy.getNextServer(this.servers);
        console.log(`Request ${reqId} routed to -> ${server}`);
    }
}

// --- Verification ---
console.log("--- Load Balancer Challenge ---");
const servers = ["Server-1", "Server-2", "Server-3"];

// const lb = new LoadBalancer(servers, new RoundRobinStrategy());
// lb.handleRequest("1"); // Server-1
// lb.handleRequest("2"); // Server-2
// lb.handleRequest("3"); // Server-3
// lb.handleRequest("4"); // Server-1

// console.log("--- Switching to Random ---");
// lb.setStrategy(new RandomStrategy());
// lb.handleRequest("5"); // Random
