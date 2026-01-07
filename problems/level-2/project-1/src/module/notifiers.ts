import { INotifier } from '../interface/notifier.interface';

export class EmailNotifier implements INotifier{
    notify(temperature: number) {
        console.log(`[EMAIL] Temperature is now: ${temperature}°C`);
    }
}

export class SmsNotifier  implements INotifier{
    notify(temperature: number) {
        console.log(`[SMS] Temperature is now: ${temperature}°C`);
    }
}

export class PushNotifier implements INotifier{
    notify(temperature: number): void {
         console.log(`[PUSH ] Temperature is now: ${temperature}°C`);
    }
}