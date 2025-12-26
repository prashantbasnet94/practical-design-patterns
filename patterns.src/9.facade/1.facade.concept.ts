/**
 * PATTERN: FACADE
 * 
 * CONCEPT:
 * A Facade is a class that provides a simple interface to a complex subsystem which contains lots of moving parts.
 * A Facade might provide limited functionality in comparison to working with the subsystem directly.
 * However, it includes only those features that clients really care about.
 * 
 * -- EXAMPLE: HOME THEATER SYSTEM --
 */

// --- The Complex Subsystems ---
class Amplifier {
    on() { console.log('Amp on'); }
    setVolume(level: number) { console.log(`Amp volume set to ${level}`); }
}

class Tuner {
    on() { console.log('Tuner on'); }
    setFrequency(freq: number) { console.log(`Tuner frequency set to ${freq}`); }
}

class Projector {
    on() { console.log('Projector on'); }
    setInput(input: string) { console.log(`Projector input set to ${input}`); }
    wideScreenMode() { console.log('Projector in widescreen mode (16:9)'); }
}

class Lights {
    dim(level: number) { console.log(`Lights dimmed to ${level}%`); }
}

// --- The Facade ---
// The user just wants to "Watch a Movie". They don't care about Amp volume or Projector inputs.

class HomeTheaterFacade {
    constructor(
        private amp: Amplifier,
        private tuner: Tuner,
        private projector: Projector,
        private lights: Lights
    ) { }

    watchMovie(movie: string) {
        console.log(`Get ready to watch a movie: ${movie}...`);
        this.lights.dim(10);
        this.projector.on();
        this.projector.setInput('Blu-ray');
        this.projector.wideScreenMode();
        this.amp.on();
        this.amp.setVolume(5);
    }

    endMovie() {
        console.log("Shutting movie theater down...");
        // simplifed shutdown logic
        // ...
    }
}

// --- USAGE ---
const homeTheater = new HomeTheaterFacade(
    new Amplifier(),
    new Tuner(),
    new Projector(),
    new Lights()
);

homeTheater.watchMovie("Inception");
