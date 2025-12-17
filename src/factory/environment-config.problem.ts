export { }

/**
 * PATTERN: FACTORY METHOD
 * SCENARIO: Environment Configuration Loader
 * 
 * REAL WORLD CONTEXT:
 * Every engineering team has multiple environments: Local, Dev, Staging, Prod.
 * Each environment needs different settings:
 * - Local: Mock APIs, Debug Logging, Local DB
 * - Prod: Real APIs, Error Logging, Read-Replica DBs, Sentry enabled
 * 
 * PROBLEM:
 * We have a messy `loadConfig()` function that hardcodes all these rules.
 * If we add a new environment (e.g. "QA"), we risk breaking "Prod".
 * 
 * YOUR TASK:
 * 1. Create an interface `IEnvironmentConfig` with properties:
 *    - `apiUrl`: string
 *    - `enableSentry`: boolean
 *    - `logLevel`: string
 * 2. Create classes `LocalConfig`, `ProductionConfig`, `StagingConfig`.
 * 3. Create `ConfigFactory.createConfig(env: string): IEnvironmentConfig`.
 * 4. Refactor `appStart` to use the factory.
 */

// ❌ MESSY CODE (Refactor this!)
function loadConfig(env: string) {
    console.log(`Loading config for: ${env.toUpperCase()}`);

    if (env === 'local') {
        return {
            apiUrl: 'http://localhost:3000',
            enableSentry: false,
            logLevel: 'debug'
        };
    } else if (env === 'production') {
        return {
            apiUrl: 'https://api.myapp.com',
            enableSentry: true,
            logLevel: 'error'
        };
    } else if (env === 'staging') {
        return {
            apiUrl: 'https://staging-api.myapp.com',
            enableSentry: false,
            logLevel: 'info'
        };
    } else {
        throw new Error(`Unknown environment: ${env}`);
    }
}

function appStart(env: string) {
    const config = loadConfig(env);

    console.log(`--- APP STARTING IN [${env.toUpperCase()}] ---`);
    console.log(`API: ${config.apiUrl}`);
    console.log(`Sentry: ${config.enableSentry ? 'ON' : 'OFF'}`);
    console.log(`Logs: ${config.logLevel}`);
}

// --- EXECUTION ---
appStart('local');
appStart('production');
// appStart('qa'); // Should work after you add QA support easily!


/*

 * 
 * YOUR TASK:
 * 1. Create an interface `IEnvironmentConfig` with properties:
 *    - `apiUrl`: string
 *    - `enableSentry`: boolean
 *    - `logLevel`: string
 * 2. Create classes `LocalConfig`, `ProductionConfig`, `StagingConfig`.
 * 3. Create `ConfigFactory.createConfig(env: string): IEnvironmentConfig`.
 * 4. Refactor `appStart` to use the factory.
*/

interface IEnvironmentConfig {
    apiUrl: string,
    enableSentry: boolean,
    logLevel: string
}

class LocalConfig implements IEnvironmentConfig {
    apiUrl: string;
    enableSentry: boolean;
    logLevel: string;

    constructor(config: { apiUrl: string, enableSentry: boolean, logLevel: string }) {
        this.apiUrl = config.apiUrl
        this.enableSentry = config.enableSentry
        this.logLevel = config.logLevel
    }
}
class StagingConfig implements IEnvironmentConfig {
    apiUrl: string;
    enableSentry: boolean;
    logLevel: string;

    constructor(config: { apiUrl: string, enableSentry: boolean, logLevel: string }) {
        this.apiUrl = config.apiUrl
        this.enableSentry = config.enableSentry
        this.logLevel = config.logLevel
    }
}
class ProductionConfig implements IEnvironmentConfig {
    apiUrl: string;
    enableSentry: boolean;
    logLevel: string;

    constructor(config: { apiUrl: string, enableSentry: boolean, logLevel: string }) {
        this.apiUrl = config.apiUrl
        this.enableSentry = config.enableSentry
        this.logLevel = config.logLevel
    }
}

type TypeEnv = 'Local' | 'Dev' | 'Staging' | 'Prod' | 'QA'
class ConfigFactory {
    private static instance: ConfigFactory
    private config!: LocalConfig


    private constructor() { }
    static getIntance() {
        if (!ConfigFactory.instance) {
            ConfigFactory.instance = new ConfigFactory()
        }
        return ConfigFactory.instance
    }
    createConfig(env: TypeEnv) {
        switch (env) {
            case 'Local':
                this.config = new LocalConfig({
                    apiUrl: 'http://localhost:3000',
                    enableSentry: false,
                    logLevel: 'debug'
                })
                return this.config
            case 'Dev':
                this.config = new StagingConfig({
                    apiUrl: 'https://staging-api.myapp.com',
                    enableSentry: false,
                    logLevel: 'info'
                })
                return this.config
            case 'Prod':
                this.config = new ProductionConfig({
                    apiUrl: 'https://api.myapp.com',
                    enableSentry: true,
                    logLevel: 'error'
                })
                return this.config

            case 'QA':
                this.config = new ProductionConfig({
                    apiUrl: 'https://api.myapp.com',
                    enableSentry: true,
                    logLevel: 'error'
                })
                return this.config
            default:
                this.config = new LocalConfig({
                    apiUrl: 'http://localhost:3000',
                    enableSentry: false,
                    logLevel: 'debug'
                })
                return this.config
        }
    }
}


//after refoator

function newLoadConfig(env: string) {
    console.log(`Loading config for: ${env.toUpperCase()}`);

    if (env === 'local') {
        return ConfigFactory.getIntance().createConfig('Local')
    } else if (env === 'production') {
        return ConfigFactory.getIntance().createConfig('Prod')
    } else if (env === 'staging') {
        return ConfigFactory.getIntance().createConfig('Staging')
    } else if (env === 'QA') {
        return ConfigFactory.getIntance().createConfig('QA')
    } else {
        throw new Error(`Unknown environment: ${env}`);
    }
}


function newAppStart(env: string) {
    const config = newLoadConfig(env);

    console.log(`--- APP STARTING IN [${env.toUpperCase()}] ---`);
    console.log(`API: ${config.apiUrl}`);
    console.log(`Sentry: ${config.enableSentry ? 'ON' : 'OFF'}`);
    console.log(`Logs: ${config.logLevel}`);
}

// --- EXECUTION ---
console.log()
console.log()
console.log('-----------Refacoting-----------')
console.log()
console.log()
newAppStart('local');
newAppStart('production');
newAppStart('QA'); // Should work after you add QA support easily!
