/**
 * REFACTORING CHALLENGE 3: TELESCOPING CONFIGuration
 * 
 * SMELLS:
 * 1. Too many arguments in one function.
 * 2. "Boolean Blindness": What does `true, false` mean?
 * 3. Hard to extend: Adding a new option breaks every caller.
 * 
 * GOAL:
 * Refactor using **Builder Pattern**:
 * Create a `ServerBuilder` to handle this configuration cleanly.
 */

// Look at this mess!
function initServer(
    port: number,
    host: string,
    useHttps: boolean,
    sslKeyPath: string | null,
    sslCertPath: string | null,
    maxConnections: number,
    timeout: number,
    enableLogging: boolean,
    logLevel: string
) {
    console.log(`Starting server on ${host}:${port}...`);
    if (useHttps && (!sslKeyPath || !sslCertPath)) {
        throw new Error("SSL required for HTTPS!");
    }
    console.log(`Config: MaxConn=${maxConnections}, Timeout=${timeout}, Log=${logLevel}`);
}

// Usage is nightmare:
try {
    // Is 'true' for HTTPS or Logging? Who knows?
    initServer(8080, "localhost", true, "/key", "/cert", 1000, 30, true, "debug");

    // Changing one thing is painful:
    // initServer(8080, "localhost", false, null, null, 1000, 30, true, "debug"); 
} catch (e) {
    console.error(e);
}
