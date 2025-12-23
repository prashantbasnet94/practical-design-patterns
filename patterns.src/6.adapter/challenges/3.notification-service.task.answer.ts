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
interface INotifier{
    notify(msg: string): void
}

class NotificationManager{
    private notifiers: INotifier[] = []
    public register(notify: INotifier) {
        this.notifiers.push(notify)
    }
    public notifyAll(msg: string) {
        this.notifiers.forEach(o => o.notify(msg))
    }
}
class SlackClient{
    postToChannel(channel: string, text: string) {
        console.log("posting to ", channel, {text})
    }
}
class EmailClient{
    sendEmail(to: string, subject: string, body: string) {
        console.log('Sending email to: ', {to, subject, body})
    }
}

class SlackAdapter implements INotifier{
    constructor(private slack: SlackClient, private channel: string){}
    notify(msg: string): void {
        this.slack.postToChannel(this.channel, msg)
    }
}

class EmailAdapter implements INotifier{
    constructor(private email: EmailClient, private to: string) { }
    notify(msg: string): void {
        this.email.sendEmail(this.to, 'subject', msg)
    }
}

let manager = new NotificationManager()
let mySlack = new SlackClient()
let myEmail = new EmailClient()
manager.register(new SlackAdapter(mySlack, '#general'))
manager.register(new EmailAdapter(myEmail, 'holly.molly'))

manager.notifyAll('Server is down!!!')