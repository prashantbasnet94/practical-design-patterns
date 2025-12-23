export { };

/**
 * CHALLENGE: centralized Logging & Monitoring System
 * 
 * PATTERNS: Singleton, Factory, Observer
 * 
 * SCENARIO:
 * You are building a Logging System for a backend API.
 * 
 * 1. `Logger` (Singleton):
 *    - The application must have only ONE Logger instance to manage written logs and configuration.
 *    - It should support different log levels: INFO, WARN, ERROR.
 * 
 * 2. `LogTransport` (Factory):
 *    - Logs can be output to different places:
 *      - `ConsoleTransport`: Writes to console.log
 *      - `FileTransport`: Simulates writing to a file (just console.log "[FILE] ...")
 *      - `CloudTransport`: Simulates sending to a URL (just console.log "[CLOUD] ...")
 *    - Use a Factory to create these transports based on config.
 * 
 * 3. `LogMonitor` (Observer):
 *    - Critical errors need to trigger alerts.
 *    - Create monitors that listen to the Logger.
 *      - `PagerDutyMonitor`: If log level is ERROR, print "SENDING PAGE TO ON-CALL TEAM".
 *      - `AnalyticsMonitor`: Counts how many logs of each type have occurred.
 * 
 * YOUR TASKS:
 * 1. Implement `Logger` as Singleton + Subject (Observable).
 * 2. Implement `ILogTransport` and concrete transports.
 * 3. Implement `ILogObserver` and concrete monitors.
 * 4. Wire everything together in the test section.
 */

// ---------------------------------------------------------
// 1. Interfaces & Types
// ---------------------------------------------------------
type LogLevel = 'INFO' | 'WARN' | 'ERROR';
type TransportType = 'CONSOLE' | 'FILE' | 'CLOUD';

interface ILogObserver {
    onLog(level: LogLevel, message: string): void;
}

interface ILogTransport {
    log(level: LogLevel, message: string): void;
}

// ---------------------------------------------------------
// 2. Concrete Transports (Products)
// ---------------------------------------------------------
// TODO: Implement ConsoleTransport, FileTransport, CloudTransport


class ConsoleTransport implements ILogTransport {
    log(level: LogLevel, message: string): void {
        console.log("console.log " + message)
    }
}

class FileTransport implements ILogTransport {
    log(level: LogLevel, message: string): void {
        console.log("[FILE] ... " + message)

    }
}

class CloudTransport implements ILogTransport {
    log(level: LogLevel, message: string): void {
        console.log("[CLOUD] ... ", message)
    }
}




// ---------------------------------------------------------
// 3. Transport Factory
// ---------------------------------------------------------
class TransportFactory {
    static createTransport(type: TransportType): ILogTransport {
        switch (type) {
            case 'CONSOLE':
                return new ConsoleTransport()
            case 'FILE':
                return new FileTransport()
            case 'CLOUD':
                return new CloudTransport()
            default:
                throw new Error("Must have a transport type")
        }
    }
}

// ---------------------------------------------------------
// 4. Concrete Monitors (Observers)
// ---------------------------------------------------------
// TODO: Implement PagerDutyMonitor (Observer)
// TODO: Implement AnalyticsMonitor (Observer)

class PagerDutyMonitor implements ILogObserver {
    onLog(level: LogLevel, message: string): void {
        if (level === 'ERROR') {
            console.log(`[PagerDuty] 🚨 ALERT! SENDING PAGE TO TEAM: ${message}`);
        }
    }
}
class AnalyticsMonitor implements ILogObserver {
    onLog(level: LogLevel, message: string): void {
        console.log(`[Analytics] Logging event: ${level}`);
    }
}


// ---------------------------------------------------------
// 5. Logger (Singleton + Subject)
// ---------------------------------------------------------

interface ILogger {
    addTransport(transport: ILogTransport): void
    addMonitor(observer: ILogObserver): void
    log(loglevel: LogLevel, log: string): void
    subscribe(observer: ILogObserver): void
    unsubscribe(observer: ILogObserver): void
}


class Logger implements ILogger {
    private static instance: Logger
    private constructor() { }
    private logger?: ILogger
    private observer: ILogObserver[] = []
    private transports: ILogTransport[] = []

    subscribe(observer: ILogObserver): void {
        this.observer.push(observer)
    }
    unsubscribe(observer: ILogObserver): void {
        this.observer = this.observer.filter(o => o !== observer)
    }
    log(level: LogLevel, message: string) {
        this.transports.forEach(o => o.log(level, message))
        this.observer.forEach(o => o.onLog(level, message))
    }
    addTransport(transport: ILogTransport): void {
        this.transports.push(transport)
    }
    addMonitor(observer: ILogObserver): void {
        this.subscribe(observer)
    }

    static getInstance() {
        if (!Logger.instance) {
            Logger.instance = new Logger()
        }
        return Logger.instance
    }
}


// ---------------------------------------------------------
// 6. Test
// ---------------------------------------------------------
const logger = Logger.getInstance();

// // Add Transports (Factory)
logger.addTransport(TransportFactory.createTransport('CONSOLE'));
logger.addTransport(TransportFactory.createTransport('CLOUD'));

// // Add Monitors (Observers)
logger.addMonitor(new PagerDutyMonitor());
logger.addMonitor(new AnalyticsMonitor());

// // Run
logger.log('INFO', 'Application started');
logger.log('WARN', 'Memory usage high');
logger.log('ERROR', 'Database connection failed!'); // Should trigger PagerDuty
