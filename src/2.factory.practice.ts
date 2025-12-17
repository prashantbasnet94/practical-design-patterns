/**
 * PATTERN: FACTORY METHOD
 * 
 * Definition:
 * Defines an interface for creating an object, but let subclasses or helper methods
 * decide which class to instantiate.
 * 
 * Real World Context:
     used in `src/infrastructure/logging/composite.logging.writer.ts` 
 * to create the complex hierarchy of writers (Sentry, Console, PostHog) based on config.
 * 
 * YOUR TASK:
 * Implement `createLogger` to return the correct Logger instance based on the interface.
 */

interface ILogger {
    log(message: string): void;
}

class ConsoleLogger implements ILogger {
    log(message: string) { console.log(`[Console] ${message}`); }
}

class FileLogger implements ILogger {
    log(message: string) { console.log(`[File System] Writing: ${message}`); }
}

class CloudLogger implements ILogger {
    log(message: string) { console.log(`[AWS CloudWatch] Sending: ${message}`); }
}

type LoggerType = 'console' | 'file' | 'cloud';

// TODO: Implement this Factory Function
function LoggerFactory(type: LoggerType): ILogger {
    // TODO: Return the appropriate logger class based on 'type'
    throw new Error("Factory not implemented");
}

// --- VERIFICATION ---
// Run with: npx tsx src/design-patterns/2.factory.practice.ts

try {
    console.log("--- TEST START ---");

    // const logger1 = LoggerFactory('console');
    // logger1.log("Hello Console"); // Should print [Console] ...

    // const logger2 = LoggerFactory('cloud');
    // logger2.log("Hello Cloud"); // Should print [AWS CloudWatch] ...

    // if (logger1 instanceof ConsoleLogger && logger2 instanceof CloudLogger) {
    //   console.log("✅ SUCCESS: Factory returned correct types");
    // }

    console.log("--- TEST END ---");
} catch (e) {
    console.error(e);
}
