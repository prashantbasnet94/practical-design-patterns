# Task Scheduler (Dependency Resolution)

## Objective
Design a task scheduler that can accept tasks with dependencies and execute them in the correct order. This is a classic **Graph (Directed Acyclic Graph)** problem requiring **Topological Sort**.

## Functional Requirements

1.  **`addTask(taskId: string, dependencies: string[]): void`**
    *   Registers a task and its prerequisites.
    *   Example: Task 'A' depends on ['B', 'C'].

2.  **`run(): string[]`**
    *   Returns an ordered list of task IDs representing the execution order.
    *   If a circular dependency is detected (e.g., A -> B -> A), throw an error or return an empty list.

## Example

```typescript
const scheduler = new TaskScheduler();

scheduler.addTask("A", []);      // A has no dependencies
scheduler.addTask("B", ["A"]);   // B needs A
scheduler.addTask("C", ["B"]);   // C needs B
scheduler.addTask("D", ["A"]);   // D needs A

// Possible Valid Order: ["A", "B", "D", "C"] or ["A", "B", "C", "D"]
scheduler.run(); 
```

## Hints
*   Calculate "indegree" (number of incoming edges) for each node.
*   Tasks with 0 indegree are ready to run.
