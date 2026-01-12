class TaskScheduler {
    graph: Map<string, string[]> = new Map()
    indegree = new Map()
    addTask(task: string, deps: string[]) {
        if (!this.graph.has(task))  this.graph.set(task, [])
        if (!this.indegree.get(task)) this.indegree.set(task, 0)

        // how many deps are poiniting to this task?
        this.indegree.set(task, deps.length)

        // now processing the deps
        for (let dep of deps) {
            if (!this.graph.get(dep)) this.graph.set(dep, [])
            if (!this.indegree.get(dep)) this.indegree.set(dep, 0)

            // now we have task -> dep, we should do dep -> task
            this.graph.get(dep)?.push(task)
        }
    }

    run() {

        /*
            1. implementing toploglical sorting
                a. use indegree that is 0 first
                b. push nodes into queues whose indegrees are 0
                    queue = [C, D]


        */
        let queue : string[] = []
        for (let [ node, indegre ] of this.indegree) {
            if (indegre === 0) {
                queue.push(node)
            }
        }
        let result = []
        while (0 < queue.length) {
            let node = queue.shift() as string
            let neighbours = this.graph.get(node) || []
            result.push(node)
            for (let neighbour of neighbours) {
                this.indegree.set(neighbour, this.indegree.get(neighbour) - 1)
                if (this.indegree.get(neighbour) === 0) {
                    queue.push(neighbour)
                }
            }
        }

        console.log(result)

        return result
    }


}


const scheduler = new TaskScheduler();

scheduler.addTask("A", []);      // A has no dependencies
scheduler.addTask("B", ["A"]);   // B needs A
scheduler.addTask("C", ["B"]);   // C needs B
scheduler.addTask("D", ["A"]);   // D needs A

// Possible Valid Order: ["A", "B", "D", "C"] or ["A", "B", "C", "D"]
scheduler.run();