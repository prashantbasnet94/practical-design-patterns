/**
 * CHALLENGE 5: UNIFYING MULTIPLE PROVIDERS (WEATHER)
 *
 * Scenario:
 * You want to build a "Weather Aggregator".
 * It needs to effectively use MULTIPLE completely different weather APIs.
 *
 * Problem:
 * 1. `USWeatherAPI`: Returns Fahrenheit, uses "summary" for condition.
 * 2. `EuroWeatherAPI`: Returns Celsius, uses "weather_code" (1=sunny, 2=rainy).
 *
 * Task:
 * Implementing adapters that normalize EVERYTHING into `IWeather`.
 * - Convert F -> C
 * - Map weather codes -> strings
 */

class USWeatherAPI{
    getCondition() {
        let data = {
            fahrenheit: 90,
            summary:'cloudy and hot'
        }
        console.log('Us weather api: ', data)
        return data
    }
}

class EuroWeatherAPI{
    getCityData() {
        let data = {
            celsius: 20,
            weather_code: 2
        }
        console.log('EURO API: ', data)
        return data
    }
}

interface IWeather{
    currentWeather(): {celsius: number, des: string}
}

class WeatherAggregator{
    private apis: IWeather[]= []
    register(api: IWeather) {
        this.apis.push(api)
    }
    getStats() {
        this.apis.forEach(o => o.currentWeather())
    }
}

let wA = new WeatherAggregator()
let usApi = new USWeatherAPI()
let euroApi = new EuroWeatherAPI()
// wA.register(usApi)
// wA.register(euroApi)

class UsAdapter implements IWeather{
    constructor(private usApi: USWeatherAPI){}
    currentWeather(): { celsius: number; des: string } {
        let result = this.usApi.getCondition()
        return {
            celsius: result.fahrenheit,
            des: result.summary
        }
    }
}

class EuroAdapter implements IWeather{
    constructor(private euroApi: EuroWeatherAPI) { }
    currentWeather(): { celsius: number; des: string } {
        let result = this.euroApi.getCityData()
        return {
            celsius: result.celsius,
            des: result.weather_code === 1? 'sunny' : 'rainny'
        }
    }
}


let usAdpter = new UsAdapter(usApi)
let euroAdapter = new EuroAdapter(euroApi)
wA.register(usAdpter)
wA.register(euroAdapter)

console.log(wA.getStats())