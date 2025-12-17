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

 interface ILogger{
    log(msg: string): void
 }

 class ConsoleLogger implements ILogger{
    private static instance: ConsoleLogger
    private constructor(){}
    log(msg: string){
        console.log("Hello Console: ", msg)
    }
    static getInstance(){
        if(!ConsoleLogger.instance){
            ConsoleLogger.instance = new ConsoleLogger()
        }
        return ConsoleLogger.instance
    }

 }

 class SentryLogger implements ILogger{
    private static instance: SentryLogger
    private constructor(){}
    log(msg: string){
        console.log("Sentry Logger: ", msg)
    }
    static getInstance(){
        if(!SentryLogger.instance){
            SentryLogger.instance = new SentryLogger()
        }
        return SentryLogger.instance
    }
 }

 class PostHogLogger implements ILogger{
    private static instance: PostHogLogger
    private constructor(){}
    log(msg: string){
       console.log("Hello Cloud"+  msg)
    }
    static getInstance(){
        if(!PostHogLogger.instance){
            PostHogLogger.instance = new PostHogLogger()
        }
        return PostHogLogger.instance
    }
 }

type LoggerType = 'console' | 'file' | 'cloud';

// TODO: Implement this Factory Function
function LoggerFactory(type: LoggerType): ILogger {
    // TODO: Return the appropriate logger class based on 'type'
    let consoleLogger = ConsoleLogger.getInstance()
    let sentryLogger = SentryLogger.getInstance()
    let postHogLogger = PostHogLogger.getInstance()

    switch(type){
        case 'console':
            return consoleLogger
        case 'file':
            return sentryLogger
        case 'cloud':
            return postHogLogger
        default: 
            return consoleLogger
        
    }
}

// --- VERIFICATION ---
// Run with: npx tsx src/design-patterns/2.factory.practice.ts

try {
    console.log("--- TEST START ---");

    const logger1 = LoggerFactory('console');
    logger1.log("Hello Console"); // Should print [Console] ...

    const logger2 = LoggerFactory('cloud');
    logger2.log("Hello Cloud"); // Should print [AWS CloudWatch] ...

    if (logger1 instanceof ConsoleLogger && logger2 instanceof PostHogLogger) {
      console.log("✅ SUCCESS: Factory returned correct types");
    }

    console.log("--- TEST END ---");
} catch (e) {
    console.error(e);
}
