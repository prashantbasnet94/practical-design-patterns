/**
 * WHY USE THE ADAPTER PATTERN?
 * 
 * This file demonstrates the difference between "Bad Code" (No Adapter)
 * and "Good Code" (With Adapter).
 */

// --- THE SERVICES (3rd Party) ---
class SlackService {
    post(text: string) { console.log("Slack: " + text); }
}
class EmailService {
    sendEmail(text: string) { console.log("Email: " + text); }
}


// ==========================================================
// 🔴 WITHOUT ADAPTER (THE ANTI-PATTERN)
// ==========================================================
// - Problem 1: Tight Coupling (Manager knows about SlackService AND EmailService)
// - Problem 2: Open/Closed Violation (Adding "SMS" means modifying this class)
// ==========================================================

class BadNotificationManager {
    // We have to hold specific references to every type!
    private slackServices: SlackService[] = [];
    private emailServices: EmailService[] = [];

    addSlack(s: SlackService) { this.slackServices.push(s); }
    addEmail(e: EmailService) { this.emailServices.push(e); }

    notifyAll(msg: string) {
        // UGLY: We need a loop for EVERY type of service
        this.slackServices.forEach(s => s.post(msg));
        this.emailServices.forEach(e => e.sendEmail(msg));

        // If we add SMS, we need to add a new array, a new method, and a new loop here.
    }
}


// ==========================================================
// 🟢 WITH ADAPTER (THE CLEAN WAY)
// ==========================================================
// - Benefit 1: Decoupling (Manager ONLY knows INotifier)
// - Benefit 2: Open/Closed Principle (Add SMS? No changes to Manager!)
// ==========================================================

interface INotifier {
    send(msg: string): void;
}

class GoodNotificationManager {
    // Clean: One list for everything
    private notifiers: INotifier[] = [];

    register(n: INotifier) {
        this.notifiers.push(n);
    }

    notifyAll(msg: string) {
        // Clean: One loop. The Manager doesn't care if it's Slack, Email, or Carrier Pigeon.
        this.notifiers.forEach(n => n.send(msg));
    }
}

// THE ADAPTERS (Connecting the unrelated classes to the Interface)
class SlackAdapter implements INotifier {
    constructor(private slack: SlackService) { }
    send(msg: string) { this.slack.post(msg); }
}

class EmailAdapter implements INotifier {
    constructor(private email: EmailService) { }
    send(msg: string) { this.email.sendEmail(msg); }
}
