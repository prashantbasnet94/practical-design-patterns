# Snake Game (Design)

## Objective
Design the logic for the classic Snake game. This tests **State Management**, **Queues**, and **2D Grid logic**.

## Functional Requirements

1.  **`constructor(width: number, height: number, food: number[][])`**
    *   Initialize the board with dimensions.
    *   `food` is a list of coordinates where food will appear in order.
    *   Snake starts at `[0,0]`, length 1, moving Right.

2.  **`move(direction: string): number`**
    *   Moves the snake one step in the given direction ('U', 'D', 'L', 'R').
    *   **Returns:** Score (current length - 1) if successful.
    *   **Returns:** -1 if the snake hits a wall or itself (Game Over).
    *   **Food Logic:** If the head lands on food, the snake grows (tail stays). If not, the tail moves.

## Example

```typescript
// 3x3 Grid, Food at [1,2] and [0,1]
const game = new SnakeGame(3, 3, [[1, 2], [0, 1]]);

game.move('R'); // Moves from [0,0] -> [0,1]. Returns 0.
game.move('D'); // Moves from [0,1] -> [1,1]. Returns 0.
game.move('R'); // Moves from [1,1] -> [1,2] (Food!). Returns 1 (Score). Snake length 2.
game.move('U'); // Moves to [0,2]. Tail moves. Returns 1.
game.move('L'); // Moves to [0,1] (Food!). Returns 2.
game.move('U'); // Out of bounds! Returns -1.
```
