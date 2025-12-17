"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var GameState = /** @class */ (function () {
    function GameState() {
        this.score = 0;
        this.level = 1;
        console.log("🎮 New GameState created (This should only happen ONCE!)");
    }
    GameState.prototype.addScore = function (points) {
        this.score += points;
        console.log("+".concat(points, " pts! Total: ").concat(this.score));
    };
    GameState.prototype.getScore = function () {
        return this.score;
    };
    return GameState;
}());
// --- SIMULATION ---
function onEnemyKilled() {
    // ❌ WRONG: Creates a NEW state, so points go into a black hole
    var state = new GameState();
    state.addScore(100);
}
function renderScoreBoard() {
    // ❌ WRONG: Creates ANOTHER state, which has score 0
    var state = new GameState();
    console.log("ScoreBoard Display: " + state.getScore());
}
console.log("--- GAME START ---");
onEnemyKilled(); // Should result in score 100
renderScoreBoard(); // Should display 100 (currently displays 0)
console.log("--- GAME OVER ---");
var NewGameState = /** @class */ (function () {
    function NewGameState() {
        this.score = 0;
        this.level = 0;
    }
    NewGameState.prototype.addScore = function (score) {
        this.score += score;
        console.log("+".concat(score, " pts! Total: ").concat(this.score));
    };
    NewGameState.prototype.getScore = function () {
        return this.score;
    };
    NewGameState.prototype.getLevel = function () {
        return this.level;
    };
    NewGameState.getInstance = function () {
        if (!NewGameState.instance) {
            NewGameState.instance = new NewGameState();
        }
        return NewGameState.instance;
    };
    return NewGameState;
}());
console.log();
console.log("after refactoring");
console.log();
function onEnemyKilledN() {
    var state = NewGameState.getInstance();
    state.addScore(100);
}
function renderScoreBoardN() {
    var state = NewGameState.getInstance();
    console.log("ScoreBoard Display: " + state.getScore());
}
console.log("--- GAME START ---");
onEnemyKilledN(); // Should result in score 100
renderScoreBoardN(); // Should display 100 (currently displays 0)
console.log("--- GAME OVER ---");
