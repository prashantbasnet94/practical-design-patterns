/**
 * CHALLENGE 1: API WRAPPER FACADE
 * 
 * CONTEXT:
 * You are working with a messy 3rd party API client (`ComplexTravelApi`).
 * It requires 5 steps just to book a trip (auth, find distinct flights, book hotel, reserve car, process payment).
 * 
 * GOAL:
 * Create a `TravelFacade` with a simple method: `bookTrip(destination, dates)`.
 * 
 * REQUIREMENTS:
 * The facade should handle:
 * 1. Logging in (getting a token).
 * 2. Calling the internal sub-methods.
 * 3. Handling errors (if payment fails, cancel booking).
 */

class ComplexTravelApi {
    login(apiKey: string) { console.log("Logged in with", apiKey); }
    findFlight(from: string, to: string) { console.log(`Found flight ${from}->${to}`); return "FL-123"; }
    bookHotel(city: string) { console.log(`Booked hotel in ${city}`); return "HTL-999"; }
    rentCar(city: string) { console.log(`Rented car in ${city}`); return "CAR-555"; }
    processPayment(amount: number) { console.log(`Charged $${amount}`); }
}

export class TravelFacade {
    private api: ComplexTravelApi;

    constructor() {
        this.api = new ComplexTravelApi();
    }

    bookFullTrip(destination: string, date: string) {
        // TODO: Implement the simplified logic
        // 1. Login
        // 2. Find Flight
        // 3. Book Hotel
        // 4. Rent Car
        // 5. Pay
    }
}

// --- TEST CASE ---
try {
    const travelAgent = new TravelFacade();
    travelAgent.bookFullTrip("Paris", "2024-06-01");

    // Expected Output:
    // Logged in...
    // Found flight...
    // Booked hotel...
    // Rented car...
    // Charged...

} catch (e) {
    console.error(e);
}
