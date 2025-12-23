/**
 * PATTERN: ADAPTER
 * ANALOGY: THE UNIVERSAL TRANSLATOR
 * 
 * Scenario:
 * - The `Commander` (Client) speaks English.
 * - The `AlienRobot` (Adaptee) speaks Binary.
 * - We need a `Translator` (Adapter) to communicate.
 */

// 1. TARGET INTERFACE
// This is what the Commander expects to use ("I want to speak English")
interface IEnglishSpeaker {
    sayHello(): void;
}

// 2. ADAPTEE (The Incompatible Class)
// This robot connects to the team but only understands Binary.
class AlienRobot {
    emitBinaryCode() {
        console.log("ROBOT: 01001000 01001001"); // "HI" in Binary
    }
}

// 3. ADAPTER (The Translator)
// It wears a "English Speaker" uniform (implements interface),
// but internally talks to the Robot.
class RobotTranslator implements IEnglishSpeaker {
    private robot: AlienRobot;

    constructor(robot: AlienRobot) {
        this.robot = robot;
    }

    sayHello(): void {
        console.log("TRANSLATOR: The Commander said 'Hello'. Translating...");
        // The "Translation" logic happens here
        this.robot.emitBinaryCode();
    }
}

// 4. CLIENT
// The Commander doesn't know there's a robot. He just talks to "someone who speaks English".
function runMission(crewMember: IEnglishSpeaker) {
    console.log("COMMANDER: Asking crew member to greet...");
    crewMember.sayHello();
}

// --- USAGE ---
const robot = new AlienRobot();
const translator = new RobotTranslator(robot);

// runMission(robot); // ERROR! Robot doesn't speak English.
runMission(translator); // WORKS! The translator handles it.
