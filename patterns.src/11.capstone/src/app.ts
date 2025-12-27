/**
 * SMELL: God Class / Tight Coupling
 * This file initializes EVERYTHING and knows too much about internal details.
 */

import { ExternalPaymentService } from './payment';
import { Logger } from './logger';

class ECommerceApp {
    private db: any;
    private cache: any;
    private paymentService: ExternalPaymentService;
    private logger: Logger;

    constructor() {
        this.logger = new Logger(); // Hard dependency
        this.paymentService = new ExternalPaymentService(); // Hard dependency
    }

    init() {
        this.logger.log("Initializing Database...");
        // db connection logic...
        this.db = { connected: true };

        this.logger.log("Initializing Cache...");
        // cache connection logic...
        this.cache = { connected: true };

        this.logger.log("Initializing Payment Gateway...");
        this.paymentService.connect();

        this.logger.log("App ready!");
    }

    shutdown() {
        this.logger.log("Disconnecting DB...");
        // db close...
        this.logger.log("Disconnecting Cache...");
        // cache close...
        this.logger.log("Bye!");
    }
}

// Usage
const app = new ECommerceApp();
app.init();
