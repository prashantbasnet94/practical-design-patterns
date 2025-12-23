/**
 * CHALLENGE 3: MULTIPLE ADAPTERS (POLYMORPHISM)
 * 
 * Scenario:
 * Your system needs to send alerts.
 * 
 * Problem:
 * You have two difference services: `SlackClient` and `EmailClient`.
 * They have totally different methods.
 * 
 * Task:
 * 1. Create `SlackAdapter`.
 * 2. Create `EmailAdapter`.
 * 3. Both must implement `INotifier`.
 * 4. Add them to the `NotificationManager`.
 */

// --- 1. Target Interface ---
interface INotifier {
    send(message: string): void;
}

// --- 2. Adaptees ---
class SlackClient {
    postToChannel(channel: string, text: string) {
        console.log(`[SLACK] Posting to ${channel}: ${text}`);
    }
}

class EmailClient {
    sendEmail(to: string, subject: string, body: string) {
        console.log(`[EMAIL] Sending to ${to}: [${subject}] ${body}`);
    }
}

// --- 3. Client Code ---
class NotificationManager {
    private notifiers: INotifier[] = [];

    register(notifier: INotifier) {
        this.notifiers.push(notifier);
    }

    notifyAll(msg: string) {
        this.notifiers.forEach(n => n.send(msg));
    }
}

// --- YOUR WORK STARTS HERE ---

class SlackAdapter implements INotifier {
    constructor(private slack: SlackClient, private channelId: string) { }

    send(message: string): void {
        // TODO: adapt to this.slack.postToChannel
    }
}

class EmailAdapter implements INotifier {
    constructor(private email: EmailClient, private adminEmail: string) { }

    send(message: string): void {
        // TODO: adapt to this.email.sendEmail
        // Subject can be "System Alert"
    }
}


// --- VERIFICATION ---
console.log("--- Challenge 3: Universal Notifier ---");

const manager = new NotificationManager();

const mySlack = new SlackClient();
const myEmail = new EmailClient();

// Uncomment when ready
// manager.register(new SlackAdapter(mySlack, "#general"));
// manager.register(new EmailAdapter(myEmail, "admin@company.com"));

manager.notifyAll("Server is down!");

// Expected Output:
// [SLACK] Posting to #general: Server is down!
// [EMAIL] Sending to admin@company.com: [System Alert] Server is down!
