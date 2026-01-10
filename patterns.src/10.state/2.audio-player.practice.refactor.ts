import { set } from 'better-auth';

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




interface IAudioPlayerState {
    clickPlay(player: IAudioPlayer): void
    clickLock(player: IAudioPlayer): void
    next(player: IAudioPlayer): void
}
interface IAudioPlayer{
    state: IAudioPlayerState
    setState(state: IAudioPlayerState): void

    clickPlay(): void
    clickLock(): void
    next(): void


    startPlayback(): void
    stopPlayback(): void
    nextSong(): void
    fastForward(sec: number): void
    rewind(sec: number): void
}



export class AudioPlayer implements IAudioPlayer {
    state: IAudioPlayerState
    constructor() {
        this.state = new StoppedState()
    }
    clickPlay(): void {
        this.state.clickPlay(this)
    }
    clickLock(): void {
        this.state.clickLock(this)
    }
    next(): void {
        this.state.next(this)
    }
    setState(state: IAudioPlayerState) {
            this.state = state
    }
    public startPlayback() { console.log("Music started."); }
    public stopPlayback() { console.log("Music stopped."); }
    public nextSong() { console.log("Skipping to next song..."); }
    public fastForward(sec: number) { console.log(`Fast forwarding ${sec}s`); }
    public rewind(sec: number) { console.log(`Rewinding ${sec}s`); }
}

export class StoppedState implements IAudioPlayerState {
    clickPlay(player: IAudioPlayer): void {
        player.startPlayback()
        player.setState(new PlayState())
    }
    clickLock(player: IAudioPlayer): void {
        player.setState(new LockedState())
        console.log("player locked")
    }
    next(player: IAudioPlayer): void {
        console.log("Cannot skip, player is locked")
    }

}

export class PauseState implements IAudioPlayerState{
    clickPlay(player: IAudioPlayer): void {
        player.startPlayback()
        player.setState(new PlayState())
    }
    clickLock(player: IAudioPlayer): void {
        player.setState(new LockedState())
        console.log("Player locked")
    }
    next(player: IAudioPlayer): void {
            player.nextSong()
    }
}

export class PlayState implements IAudioPlayerState{
    clickPlay(player: IAudioPlayer): void {
        player.stopPlayback()
        player.setState(new PauseState())
    }
    clickLock(player: IAudioPlayer): void {
        player.setState(new LockedState())
        console.log("Player Locked")
    }
    next(player: IAudioPlayer): void {
        player.nextSong()
    }
}
export class LockedState implements IAudioPlayerState{
    clickPlay(player: IAudioPlayer): void {
        console.log("Locked, do nothing")
    }
    clickLock(player: IAudioPlayer): void {
        player.setState(new StoppedState())
        console.log("player unlocked")
    }
    next(): void {
        console.log("Locked, do nothing")
    }
}
// UNCOMMENT TO TEST
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
