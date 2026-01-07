import { EmailNotifier, PushNotifier, SmsNotifier } from './module/notifiers';
import { WeatherStation } from "./weather-station.answer";

const weatherStation = WeatherStation.getInstance()

weatherStation.subsribe(new EmailNotifier())
weatherStation.subsribe(new SmsNotifier())
weatherStation.subsribe(new PushNotifier())
weatherStation.setTemperature(25);
console.log('---');
weatherStation.setTemperature(30);
