export { }

/**
 * PATTERN: SINGLETON
 * SCENARIO: Game State Management
 * 
 * PROBLEM:
 * In a game, we have multiple components:
 * 1. "Enemy" (updates score when killed)
 * 2. "ScoreBoard" (displays the current score)
 * 3. "LevelLoader" (checks current level)
 * 
 * If these components create their own `GameState` objects, 
 * the score will never update correctly!
 * 
 * YOUR TASK:
 * 1. Create a `GameState` Singleton.
 * 2. It should hold: `score` (number), `level` (number).
 * 3. Implement `addScore(points)` and `getLevel()`.
 * 4. Ensure that when `Enemy` adds score, `ScoreBoard` sees the new value.
 */

// ❌ BAD IMPLEMENTATION (To be refactored by you)
// currently this class allows multiple instances!
class GameState {
    private score: number = 0;
    private level: number = 1;

    constructor() {
        console.log("🎮 New GameState created (This should only happen ONCE!)");
    }

    addScore(points: number) {
        this.score += points;
        console.log(`+${points} pts! Total: ${this.score}`);
    }

    getScore() {
        return this.score;
    }
}

// --- SIMULATION ---

function onEnemyKilled() {
    // ❌ WRONG: Creates a NEW state, so points go into a black hole
    const state = new GameState();
    state.addScore(100);
}

function renderScoreBoard() {
    // ❌ WRONG: Creates ANOTHER state, which has score 0
    const state = new GameState();
    console.log("ScoreBoard Display: " + state.getScore());
}

console.log("--- GAME START ---");
onEnemyKilled();    // Should result in score 100
renderScoreBoard(); // Should display 100 (currently displays 0)
console.log("--- GAME OVER ---");


class NewGameState {
    private static instance: NewGameState
    private score: number = 0
    private level: number = 0

    private constructor() { }

    addScore(score: number) {
        this.score += score
        console.log(`+${score} pts! Total: ${this.score}`);
    }
    getScore(): number {
        return this.score
    }
    getLevel(): number {
        return this.level
    }

    static getInstance() {
        if (!NewGameState.instance) {
            NewGameState.instance = new NewGameState()
        }
        return NewGameState.instance
    }
}


console.log()
console.log("after refactoring")
console.log()
function onEnemyKilledN() {
    const state = NewGameState.getInstance()
    state.addScore(100);
}

function renderScoreBoardN() {
    const state = NewGameState.getInstance()
    console.log("ScoreBoard Display: " + state.getScore());
}

console.log("--- GAME START ---");
onEnemyKilledN();    // Should result in score 100
renderScoreBoardN(); // Should display 100 (currently displays 0)
console.log("--- GAME OVER ---");
