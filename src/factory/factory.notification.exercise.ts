/**
 * EXERCISE: Factory Pattern - Notification System
 *
 * SCENARIO:
 * You're building a notification system that can send messages via different channels:
 * Email, SMS, and Push notifications. Each has different implementation details.
 *
 * YOUR TASKS:
 * 1. Create an INotification interface with a send(message, recipient) method
 * 2. Implement three classes: EmailNotification, SMSNotification, PushNotification
 * 3. Create a NotificationFactory that returns the correct notification type
 * 4. Each notification should have unique sending behavior
 *
 * BONUS CHALLENGE:
 * - Add a method to each notification type that returns sending cost
 * - Email: $0.01, SMS: $0.05, Push: $0.001
 * - Add validation (e.g., email format, phone number format)
 */

// TODO: Define INotification interface

// TODO: Implement EmailNotification class
// Should log: "Sending email to {recipient}: {message}"

// TODO: Implement SMSNotification class
// Should log: "Sending SMS to {recipient}: {message}"

// TODO: Implement PushNotification class
// Should log: "Sending push notification to {recipient}: {message}"

type NotificationType = 'email' | 'sms' | 'push';

// TODO: Implement NotificationFactory
function createNotification(type: NotificationType) {
    throw new Error("Not implemented");
}

// --- TESTS ---
// Uncomment when ready to test

// const emailNotif = createNotification('email');
// emailNotif.send('Welcome!', 'user@example.com');

// const smsNotif = createNotification('sms');
// smsNotif.send('Your code is 1234', '+1234567890');

// const pushNotif = createNotification('push');
// pushNotif.send('New message received', 'device-token-123');

export {};
