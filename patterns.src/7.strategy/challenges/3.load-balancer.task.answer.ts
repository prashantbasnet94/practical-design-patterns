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
interface ILoadBalancingStrategy {
    getNextServer(servers: string[]): string
}

class RandomStrategy implements ILoadBalancingStrategy {
    getNextServer(servers: string[]): string {
        console.log('@RandomStrategy: finding next available server',)
        let randomIdx = Math.random() * servers.length
        return servers[ randomIdx ]
    }
}
class RoundRobinStrategy implements ILoadBalancingStrategy {
    private index: number = 0
    getNextServer(servers: string[]): string {
        console.log('@RoundRobinStrategy: finding next available server',)
        const server = servers[ this.index ]
        this.index = (this.index + 1) % servers.length
        return server
    }
}
class FirstAvailableStrategy implements ILoadBalancingStrategy {
    getNextServer(servers: string[]): string {
        console.log('@FirstAvailableStrategy: finding next available server',)
        return servers[ 0 ]
    }
}

class LoadBalancer {
    constructor(private servers: string[],
        private balancingStrategy: ILoadBalancingStrategy) { }
    setStrategy(strategy: ILoadBalancingStrategy) {
        this.balancingStrategy = strategy
    }
    distribute(reqId: string) {
        console.log('LoadBalander, distributing ', reqId)
        let server = this.balancingStrategy.getNextServer(servers)
        console.log('availbale server is ', server)
        console.log()
    }
}

const servers =["Server-1", "Server-2", "Server-3"];

let loadBalander = new LoadBalancer(servers, new FirstAvailableStrategy())
loadBalander.distribute('1')

loadBalander.setStrategy(new RoundRobinStrategy())
loadBalander.distribute('2')

loadBalander.setStrategy(new FirstAvailableStrategy())
loadBalander.distribute('3')

