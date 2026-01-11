export class SnakeGame {
    width: number;
    height: number;
    score: number;
    // TODO: Add snake body storage

    constructor(width: number, height: number, food: number[][]) {
        this.width = width;
        this.height = height;
        this.score = 0;
    }

    move(direction: string): number {
        // Directions: 'U' (Up), 'D' (Down), 'L' (Left), 'R' (Right)
        // Return score or -1 if game over
        return -1;
    }
}

// --- Test Area ---
const game = new SnakeGame(3, 2, [[0, 1]]); // 3x2 grid, food at [0,1]
console.log("Move R:", game.move('R')); // Expected: 1 (eats food at 0,1)
console.log("Move D:", game.move('D')); // Expected: 1 (moves to 1,1)
console.log("Move L:", game.move('L')); // Expected: 1 (moves to 1,0)
console.log("Move U:", game.move('U')); // Expected: -1 (Collision with body at 0,0 - wait, did it move?)
