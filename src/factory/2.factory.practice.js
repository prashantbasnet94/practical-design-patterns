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
var ConsoleLogger = /** @class */ (function () {
    function ConsoleLogger() {
    }
    ConsoleLogger.prototype.log = function (msg) {
        console.log("Hello Console: ", msg);
    };
    ConsoleLogger.getInstance = function () {
        if (!ConsoleLogger.instance) {
            ConsoleLogger.instance = new ConsoleLogger();
        }
        return ConsoleLogger.instance;
    };
    return ConsoleLogger;
}());
var SentryLogger = /** @class */ (function () {
    function SentryLogger() {
    }
    SentryLogger.prototype.log = function (msg) {
        console.log("Sentry Logger: ", msg);
    };
    SentryLogger.getInstance = function () {
        if (!SentryLogger.instance) {
            SentryLogger.instance = new SentryLogger();
        }
        return SentryLogger.instance;
    };
    return SentryLogger;
}());
var PostHogLogger = /** @class */ (function () {
    function PostHogLogger() {
    }
    PostHogLogger.prototype.log = function (msg) {
        console.log("Hello Cloud" + msg);
    };
    PostHogLogger.getInstance = function () {
        if (!PostHogLogger.instance) {
            PostHogLogger.instance = new PostHogLogger();
        }
        return PostHogLogger.instance;
    };
    return PostHogLogger;
}());
// TODO: Implement this Factory Function
function LoggerFactory(type) {
    // TODO: Return the appropriate logger class based on 'type'
    var consoleLogger = ConsoleLogger.getInstance();
    var sentryLogger = SentryLogger.getInstance();
    var postHogLogger = PostHogLogger.getInstance();
    switch (type) {
        case 'console':
            return consoleLogger;
        case 'file':
            return sentryLogger;
        case 'cloud':
            return postHogLogger;
        default:
            return consoleLogger;
    }
}
// --- VERIFICATION ---
// Run with: npx tsx src/design-patterns/2.factory.practice.ts
try {
    console.log("--- TEST START ---");
    var logger1 = LoggerFactory('console');
    logger1.log("Hello Console"); // Should print [Console] ...
    var logger2 = LoggerFactory('cloud');
    logger2.log("Hello Cloud"); // Should print [AWS CloudWatch] ...
    if (logger1 instanceof ConsoleLogger && logger2 instanceof PostHogLogger) {
        console.log("✅ SUCCESS: Factory returned correct types");
    }
    console.log("--- TEST END ---");
}
catch (e) {
    console.error(e);
}
