"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
function loadConfig(env) {
    console.log("Loading config for: ".concat(env.toUpperCase()));
    if (env === 'local') {
        return {
            apiUrl: 'http://localhost:3000',
            enableSentry: false,
            logLevel: 'debug'
        };
    }
    else if (env === 'production') {
        return {
            apiUrl: 'https://api.myapp.com',
            enableSentry: true,
            logLevel: 'error'
        };
    }
    else if (env === 'staging') {
        return {
            apiUrl: 'https://staging-api.myapp.com',
            enableSentry: false,
            logLevel: 'info'
        };
    }
    else {
        throw new Error("Unknown environment: ".concat(env));
    }
}
function appStart(env) {
    var config = loadConfig(env);
    console.log("--- APP STARTING IN [".concat(env.toUpperCase(), "] ---"));
    console.log("API: ".concat(config.apiUrl));
    console.log("Sentry: ".concat(config.enableSentry ? 'ON' : 'OFF'));
    console.log("Logs: ".concat(config.logLevel));
}
// --- EXECUTION ---
appStart('local');
appStart('production');
var LocalConfig = /** @class */ (function () {
    function LocalConfig(config) {
        this.apiUrl = config.apiUrl;
        this.enableSentry = config.enableSentry;
        this.logLevel = config.logLevel;
    }
    return LocalConfig;
}());
var StagingConfig = /** @class */ (function () {
    function StagingConfig(config) {
        this.apiUrl = config.apiUrl;
        this.enableSentry = config.enableSentry;
        this.logLevel = config.logLevel;
    }
    return StagingConfig;
}());
var ProductionConfig = /** @class */ (function () {
    function ProductionConfig(config) {
        this.apiUrl = config.apiUrl;
        this.enableSentry = config.enableSentry;
        this.logLevel = config.logLevel;
    }
    return ProductionConfig;
}());
var ConfigFactory = /** @class */ (function () {
    function ConfigFactory() {
    }
    ConfigFactory.getIntance = function () {
        if (!ConfigFactory.instance) {
            ConfigFactory.instance = new ConfigFactory();
        }
        return ConfigFactory.instance;
    };
    ConfigFactory.prototype.createConfig = function (env) {
        switch (env) {
            case 'Local':
                this.config = new LocalConfig({
                    apiUrl: 'http://localhost:3000',
                    enableSentry: false,
                    logLevel: 'debug'
                });
                return this.config;
            case 'Dev':
                this.config = new StagingConfig({
                    apiUrl: 'https://staging-api.myapp.com',
                    enableSentry: false,
                    logLevel: 'info'
                });
                return this.config;
            case 'Prod':
                this.config = new ProductionConfig({
                    apiUrl: 'https://api.myapp.com',
                    enableSentry: true,
                    logLevel: 'error'
                });
                return this.config;
            case 'QA':
                this.config = new ProductionConfig({
                    apiUrl: 'https://api.myapp.com',
                    enableSentry: true,
                    logLevel: 'error'
                });
                return this.config;
            default:
                this.config = new LocalConfig({
                    apiUrl: 'http://localhost:3000',
                    enableSentry: false,
                    logLevel: 'debug'
                });
                return this.config;
        }
    };
    return ConfigFactory;
}());
//after refoator
function newLoadConfig(env) {
    console.log("Loading config for: ".concat(env.toUpperCase()));
    if (env === 'local') {
        return ConfigFactory.getIntance().createConfig('Local');
    }
    else if (env === 'production') {
        return ConfigFactory.getIntance().createConfig('Prod');
    }
    else if (env === 'staging') {
        return ConfigFactory.getIntance().createConfig('Staging');
    }
    else if (env === 'QA' || env === 'qa') {
        return ConfigFactory.getIntance().createConfig('QA');
    }
    else {
        throw new Error("Unknown environment: ".concat(env));
    }
}
function newAppStart(env) {
    var config = newLoadConfig(env);
    console.log("--- APP STARTING IN [".concat(env.toUpperCase(), "] ---"));
    console.log("API: ".concat(config.apiUrl));
    console.log("Sentry: ".concat(config.enableSentry ? 'ON' : 'OFF'));
    console.log("Logs: ".concat(config.logLevel));
}
// --- EXECUTION ---
console.log();
console.log();
console.log('-----------Refacoting-----------');
console.log();
console.log();
newAppStart('local');
newAppStart('production');
newAppStart('QA'); // Should work after you add QA support easily!
