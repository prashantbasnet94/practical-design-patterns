/**
 * PRACTICE: AUDIO PLAYER STATE MACHINE
 * 
 * Goal: Implement an Audio Player that behaves differently based on its state.
 * 
 * States:
 * 1. StoppedState (Initial)
 *    - clickPlay() -> Transitions to PlayingState
 *    - clickLock() -> Transitions to LockedState
 *    - next() -> Does nothing
 * 
 * 2. PlayingState
 *    - clickPlay() -> Transitions to PausedState
 *    - clickLock() -> Transitions to LockedState
 *    - next() -> Plays next song
 * 
 * 3. PausedState
 *    - clickPlay() -> Transitions to PlayingState
 *    - clickLock() -> Transitions to LockedState
 *    - next() -> Plays next song (and goes to PlayingState)
 * 
 * 4. LockedState (Buttons are disabled)
 *    - clickPlay() -> Does nothing
 *    - clickLock() -> Transitions to StoppedState (Unlocks)
 *    - next() -> Does nothing
 */

// 1. The Interface
interface State {
    clickPlay(player: AudioPlayer): void;
    clickLock(player: AudioPlayer): void;
    clickNext(player: AudioPlayer): void;
}

// 2. The Context
export class AudioPlayer {
    private state: State;
    public isPlaying: boolean = false; // Just for simulation

    constructor() {
        // TODO: Set initial state to StoppedState
    }

    public changeState(state: State): void {
        this.state = state;
    }

    public getState(): State {
        return this.state;
    }

    // UI Events delegate to state
    public clickPlay(): void {
        this.state.clickPlay(this);
    }

    public clickLock(): void {
        this.state.clickLock(this);
    }

    public clickNext(): void {
        this.state.clickNext(this);
    }

    // Helper methods for the actual logic (simulated)
    public startPlayback(): void {
        console.log("Starts playing.");
        this.isPlaying = true;
    }

    public stopPlayback(): void {
        console.log("Stops playing.");
        this.isPlaying = false;
    }

    public nextSong(): void {
        console.log("Switches to next song...");
    }

    public fastForward(time: number): void {
        console.log("Fast forward " + time + "s");
    }

    public rewind(time: number): void {
        console.log("Rewind " + time + "s");
    }
}

// 3. Concrete States - IMPLEMENT THESE

class StoppedState implements State {
    clickPlay(player: AudioPlayer): void {
        // TODO: Implement logic
        // 1. Call player.startPlayback()
        // 2. Transition to PlayingState
    }

    clickLock(player: AudioPlayer): void {
        // TODO: Transition to LockedState
        console.log("Player locked.");
    }

    clickNext(player: AudioPlayer): void {
        console.log("Locked... nothing happens.");
    }
}

class PlayingState implements State {
    clickPlay(player: AudioPlayer): void {
        // TODO: 
        // 1. Call player.stopPlayback()
        // 2. Transition to PausedState
    }

    clickLock(player: AudioPlayer): void {
        player.changeState(new LockedState());
        console.log("Player locked.");
    }

    clickNext(player: AudioPlayer): void {
        if (event.doubleClick) { // Psuedo-code
            player.nextSong();
        } else {
            player.fastForward(5);
        }
    }
}

class PausedState implements State {
    clickPlay(player: AudioPlayer): void {
        player.startPlayback();
        player.changeState(new PlayingState());
    }

    clickLock(player: AudioPlayer): void {
        player.changeState(new LockedState());
        console.log("Player locked.");
    }

    clickNext(player: AudioPlayer): void {
        player.nextSong();
        player.startPlayback();
        player.changeState(new PlayingState());
    }
}

class LockedState implements State {
    clickPlay(player: AudioPlayer): void {
        // Locked, do nothing
        console.log("Locked... cannot play.");
    }

    clickLock(player: AudioPlayer): void {
        player.changeState(new StoppedState());
        console.log("Player unlocked.");
    }

    clickNext(player: AudioPlayer): void {
        console.log("Locked... cannot skip.");
    }
}

// UNCOMMENT TO TEST
/*
const player = new AudioPlayer();
console.log("--- Initial: Stopped ---");
player.clickPlay(); // Should start playing

console.log("\n--- Playing ---");
player.clickPlay(); // Should pause

console.log("\n--- Paused ---");
player.clickPlay(); // Should resume

console.log("\n--- Locking ---");
player.clickLock(); // Should lock

console.log("\n--- Locked ---");
player.clickPlay(); // Should do nothing
*/
