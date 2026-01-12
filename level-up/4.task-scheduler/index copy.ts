class TaskScheduler {
    // Graph: Dependency -> [Dependents]
    // "When key finishes, these tasks (values) can proceed"
    graph: Map<string, string[]> = new Map()

    // Indegree: Task -> Count
    // "How many prerequisites does this task have?"
    indegree: Map<string, number> = new Map()

    addTask(task: string, deps: string[]) {
        // 1. Initialize the Task itself
        if (!this.graph.has(task)) this.graph.set(task, [])
        if (!this.indegree.has(task)) this.indegree.set(task, 0)

        // The task's wait count is exactly the number of dependencies it lists
        const currentCount = this.indegree.get(task) || 0;
        this.indegree.set(task, currentCount + deps.length)

        // 2. Process Dependencies
        for (let dep of deps) {
            // Ensure dependency exists in tracking
            if (!this.graph.has(dep)) this.graph.set(dep, [])
            if (!this.indegree.has(dep)) this.indegree.set(dep, 0)

            // Add Edge: Dependency -> Task
            // "When 'dep' is done -> notify 'task'"
            this.graph.get(dep)!.push(task)
        }
    }

    run() {
        let queue: string[] = []

        // 1. Find tasks with 0 prerequisites
        for (let [node, count] of this.indegree) {
            if (count === 0) {
                queue.push(node)
            }
        }

        let result: string[] = []

        while (queue.length > 0) {
            let node = queue.shift() as string
            result.push(node)

            // 2. Notify neighbors (Dependents)
            let neighbours = this.graph.get(node) || []
            for (let neighbour of neighbours) {
                // Decrement dependency count safely
                const newCount = (this.indegree.get(neighbour)!) - 1
                this.indegree.set(neighbour, newCount)

                // If all prereqs are met, add to queue
                if (newCount === 0) {
                    queue.push(neighbour)
                }
            }
        }

        console.log(result)
        return result
    }
}


const scheduler = new TaskScheduler();

// We can now add tasks in ANY order!
scheduler.addTask("B", ["A"]);   // B needs A
scheduler.addTask("A", []);      // A has no dependencies
scheduler.addTask("C", ["B"]);   // C needs B
scheduler.addTask("D", ["A"]);   // D needs A

// Expected Valid Order: ["A", "B", "D", "C"] or ["A", "D", "B", "C"]
scheduler.run();