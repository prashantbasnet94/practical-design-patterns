export class EmailNotifier {
    notify(temperature: number) {
        console.log(`[EMAIL] Temperature is now: ${temperature}°C`);
    }
}

export class SmsNotifier {
    notify(temperature: number) {
        console.log(`[SMS] Temperature is now: ${temperature}°C`);
    }
}
