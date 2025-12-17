export { }

/**
 * PATTERN: FACTORY METHOD
 * SCENARIO: Multi-Channel Notification System
 * 
 * REAL WORLD CONTEXT:
 * Features often require sending notifications. But the *channel* changes:
 * - Forgot Password? -> Email
 * - Server Down? -> SMS / PagerDuty
 * - New Comment? -> Push Notification
 * 
 * PROBLEM:
 * The `IntegrationService` class is massive. It imports every single SDK 
 * (Twilio, SendGrid, SlackSDK) just to send a simple message.
 * This makes testing impossible and the bundle size huge.
 * 
 * YOUR TASK:
 * 1. Create `INotificationSender` interface with `send(to: string, msg: string): void`.
 * 2. Implement `EmailSender`, `SmsSender`, `SlackSender`.
 * 3. Create `NotificationFactory.getSender(type: 'email' | 'sms' | 'slack')`.
 * 4. Decouple the logic so the main code triggers the correct sender dynamically.
 */

// ❌ MESSY CODE (Refactor this!)
class NotificationService {
    sendNotification(type: string, to: string, message: string) {
        if (type === 'email') {
            console.log(`[SendGrid] Connecting...`);
            console.log(`[Email] To: ${to} | Body: ${message}`);
        }
        else if (type === 'sms') {
            console.log(`[Twilio] Initializing...`);
            console.log(`[SMS] To: ${to} | Msg: ${message}`);
        }
        else if (type === 'slack') {
            console.log(`[Slack] Posting to webhook...`);
            console.log(`[Slack] Channel: ${to} | Text: ${message}`);
        }
        else {
            throw new Error("Unsupported channel");
        }
    }
}

// --- EXECUTION ---
const service = new NotificationService();

console.log("--- SYSTEM ALERTS ---");
service.sendNotification('email', 'user@example.com', 'Welcome to the platform!');
service.sendNotification('sms', '+15550199', 'Your code is 1234');
service.sendNotification('slack', '#dev-ops', 'Deployment Successful');
