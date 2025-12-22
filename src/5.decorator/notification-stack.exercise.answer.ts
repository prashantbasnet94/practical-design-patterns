export { };

/**
 * DECORATOR PATTERN CHALLENGE: Notification Stack
 *
 * SCENARIO:
 * A system sends alerts. By default, it sends an Email.
 * User settings may require getting SMS and Slack notifications AS WELL for important alerts.
 *
 * GOAL:
 * - `INotifier`: `send(message: string): void`
 * - `EmailNotifier` (Base): Prints "Sending Email: {msg}"
 * - `SMSDecorator`: Prints "Sending SMS: {msg}" THEN delegates to wrapped notifier.
 * - `SlackDecorator`: Prints "Sending Slack: {msg}" THEN delegates to wrapped notifier.
 *
 * NOTE:
 * This is slightly different from the Logging example because we want ALL actions to happen,
 * not just "before/after" logic. We are "stacking" behaviors.
 */

interface INotifier{
    send(msg: string): void
}

class EmailNotifier implements INotifier{
    send(msg: string): void {
        console.log("Email: Sending Email Msg: ", msg)
    }
}

abstract class DecoratorNotify implements INotifier{
    constructor(protected notify: INotifier) { }
    send(msg: string): void {
        this.notify.send(msg)
    }
}



// Implement SMSDecorator and SlackDecorator...
class SMSDecorator extends DecoratorNotify{
    send(msg: string): void {
        console.log("SMS Sent : ", msg)
        return super.send(msg)
    }
}
class SlackDecorator extends DecoratorNotify{
    send(msg: string) {
        console.log("Slack Sent : ", msg)
        return super.send(msg)
    }
}


// === USAGE / TEST ===
const notifier = new SlackDecorator(
                   new SMSDecorator(
                     new EmailNotifier()
                   )
                 );

notifier.send("Server is Down!");
// // Expected Output (order may vary depending on implementation, but typically stack unwinds):
// // 💬 Sending Slack: ...
// // 📱 Sending SMS: ...
// // 📧 Sending Email: ...
