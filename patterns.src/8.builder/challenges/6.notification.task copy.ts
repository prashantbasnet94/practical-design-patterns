/**
 * CHALLENGE 6: NOTIFICATION BUILDER
 * 
 * CONTEXT:
 * A notification system might send emails, SMS, or push notifications.
 * Each channel requires different data (subject for email, image for push).
 * 
 * GOAL:
 * Build a `Notification` object that validates if the necessary data for the selected channel is present.
 * 
 * REQUIREMENTS:
 * 1. `setChannel(channel)`: 'EMAIL' | 'SMS' | 'PUSH'.
 * 2. `setTitle(title)`: Required for Email/Push.
 * 3. `setBody(body)`: Required for all.
 * 4. `setRecipient(contact)`: Email address or Phone number.
 * 5. `setAttachment(file)`: Optional for Email.
 * 
 * VALIDATION:
 * - If channel is SMS, cannot have Title or Attachment.
 * - If channel is Email, must have Title.
 */

type Channel = 'EMAIL' | 'SMS' | 'PUSH';

interface NotificationConfig {
    channel: Channel;
    recipient: string;
    title?: string;
    body: string;
    attachment?: string;
}

export class NotificationBuilder {
    // TODO: State

    setChannel(channel: Channel): NotificationBuilder {
        return this;
    }

    // ... Implement setters ...

    build(): NotificationConfig {
        // TODO: Complex validation logic based on Channel
        return {} as NotificationConfig;
    }
}

// --- TEST CASE ---
try {
    // Valid Email
    const email = new NotificationBuilder()
        .setChannel("EMAIL")
        .setRecipient("user@example.com")
        .setTitle("Welcome")
        .setBody("Hello there!")
        .build();

    // Invalid SMS (should fail if title provided)
    // const sms = new NotificationBuilder()
    //     .setChannel("SMS")
    //     .setRecipient("555-1234")
    //     .setTitle("Oops") // Error: SMS cannot have title
    //     .setBody("Code: 1234")
    //     .build();

    console.log("Email ready:", email);

} catch (e) {
    console.error(e);
}
