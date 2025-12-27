/**
 * SMELL: Inconsistent Logging / No Singleton
 * We are creating multiple instances of Logger, which might write to different files 
 * or duplicate connections. Also, it's hard to swap this with a 3rd party like 'Winston'.
 */

export class Logger {
    log(msg: string) {
        console.log(`[LOG - ${new Date().toISOString()}]: ${msg}`);
    }

    error(msg: string) {
        console.error(`[ERR]: ${msg}`);
    }
}

// Simulating a 3rd party library we might want to use later
export class FancyLoggerLib {
    logWithDate(message: string) {
        console.log(`Fancy: ${message}`);
    }
}
