import { INotifier } from './interface/notifier.interface';

// SMELL: This class is tightly coupled to concrete Notifier classes.
export class WeatherStation {
    public static instance: WeatherStation
    private temperature: number;
   
    // private observers : Set<INotifier> = new Set()
    private observers: Set<INotifier> = new Set()

    constructor() {
        this.temperature = 0;
        // this.emailNotifier = new EmailNotifier();
        // this.smsNotifier = new SmsNotifier();
    }

    setTemperature(temp: number) {
        console.log(`Weather station setting temperature to ${temp}°C`);
        this.temperature = temp;
        
        // SMELL: Directly calling methods of concrete classes.
        // this.emailNotifier.notify(this.temperature);
        // this.smsNotifier.notify(this.temperature);
        for(let observer of this.observers){
            observer.notify(temp)
        }
    }
    subsribe(notifer: INotifier){
        this.observers.add(notifer)
        return true
    }
    unsubsribe(notifier: INotifier){
        this.observers.delete(notifier)
    }
    static getInstance(){
        if(!WeatherStation.instance){
            WeatherStation.instance = new WeatherStation()
        }
        return WeatherStation.instance
    }
}
