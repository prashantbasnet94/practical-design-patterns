import { EmailNotifier, SmsNotifier } from "./notifiers";

// SMELL: This class is tightly coupled to concrete Notifier classes.
export class WeatherStation {
    private temperature: number;
    private emailNotifier: EmailNotifier;
    private smsNotifier: SmsNotifier;

    constructor() {
        this.temperature = 0;
        this.emailNotifier = new EmailNotifier();
        this.smsNotifier = new SmsNotifier();
    }

    setTemperature(temp: number) {
        console.log(`Weather station setting temperature to ${temp}°C`);
        this.temperature = temp;
        
        // SMELL: Directly calling methods of concrete classes.
        this.emailNotifier.notify(this.temperature);
        this.smsNotifier.notify(this.temperature);
    }
}
