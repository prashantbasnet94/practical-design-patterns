/**
 * PATTERN: FACADE
 * 
 * Definition:
 * Provides a simplified interface to a library, a framework, or any other complex set of classes.
 * 
 * Real World Context:
 *  `ServiceFactory` acts as a facade over appropriate object creation.
 * Or a `PaymentFacade` might handle talking to `UserRepo`, `BankAPI`, and `EmailService` in one method.
 * 
 * YOUR TASK:
 * Implement `SystemFacade` that initializes the Subsystems (Audio, Video, Input) with one call.
 */

class AudioSystem {
    init() { console.log("Audio System Initialized"); }
}

class VideoSystem {
    init() { console.log("Video System Initialized"); }
}

class InputSystem {
    init() { console.log("Input System Initialized"); }
}

class GameEngineFacade {
    private audio: AudioSystem;
    private video: VideoSystem;
    private input: InputSystem;

    constructor() {
        this.audio = new AudioSystem();
        this.video = new VideoSystem();
        this.input = new InputSystem();
    }

    // TODO: Implement startGame()
    startGame() {
        console.log("Starting Game Engine...");
        // TODO: Initialize all subsystems
    }
}

// --- VERIFICATION ---
// Run with: npx tsx src/design-patterns/9.facade.practice.ts

try {
    console.log("--- TEST START ---");

    // const engine = new GameEngineFacade();
    // engine.startGame();

    // Expected Output:
    // Starting Game Engine...
    // Audio System Initialized
    // Video System Initialized
    // Input System Initialized

    console.log("--- TEST END ---");
} catch (e) {
    console.error(e);
}
