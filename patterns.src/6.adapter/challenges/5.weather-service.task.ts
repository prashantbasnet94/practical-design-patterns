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

// --- 1. Target Interface (Normalized) ---
interface IWeather {
    temperature: number; // Must be in Celsius
    condition: "Sunny" | "Rainy" | "Cloudy";
}

interface IWeatherProvider {
    getCurrentWeather(city: string): IWeather;
}

// --- 2. Adaptees (The Messy Reality) ---

class USWeatherAPI {
    getTempInF(city: string) { return 104; } // Hot!
    getSummary(city: string) { return "Sunny"; }
}

class EuroWeatherAPI {
    // Returns: { temp: number, code: 1 | 2 | 3 }
    // 1=Sunny, 2=Rainy, 3=Cloudy
    getCityData(city: string) {
        return { temp: 20, code: 2 };
    }
}

// --- YOUR WORK STARTS HERE ---

class USAdapter implements IWeatherProvider {
    constructor(private api: USWeatherAPI) { }

    getCurrentWeather(city: string): IWeather {
        // TODO: Convert F to C ((F - 32) * 5/9)
        // TODO: Map string summary
        return { temperature: 0, condition: "Sunny" }
    }
}

class EuroAdapter implements IWeatherProvider {
    constructor(private api: EuroWeatherAPI) { }

    getCurrentWeather(city: string): IWeather {
        // TODO: Map code (1,2,3) to ("Sunny", "Rainy", "Cloudy")
        return { temperature: 0, condition: "Sunny" }
    }
}


// --- VERIFICATION ---
console.log("--- Challenge 5: Weather Normalization ---");

function printWeather(provider: IWeatherProvider) {
    const data = provider.getCurrentWeather("London");
    console.log(`Temp: ${data.temperature.toFixed(1)}°C, Condition: ${data.condition}`);
}

// Uncomment to test
// printWeather(new USAdapter(new USWeatherAPI()));   // Expect: ~40°C, Sunny
// printWeather(new EuroAdapter(new EuroWeatherAPI())); // Expect: 20°C, Rainy
