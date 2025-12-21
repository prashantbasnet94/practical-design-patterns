export { }

// --- THE PROBLEM: MESSY CODEBASE ---
// Scenario: We have an Analytics Service that tracks user actions.
// Ideally, the Session ID should be the SAME for the whole app run.
// However, currently every component creates its own instance.

class AnalyticsService {
    public readonly sessionId: number;

    constructor() {
        // Generates a random session ID every time it's created
        this.sessionId = Math.floor(Math.random() * 10000);
        console.log(`✨ Analytics Service Initialized. Session ID: ${this.sessionId}`);
    }

    trackEvent(eventName: string) {
        console.log(`[Session: ${this.sessionId}] Tracking: ${eventName}`);
    }
}

// --- CLIENT CODE (Simulating different parts of the app) ---

function componentA() {
    console.log("--> Component A starting...");
    const analytics = new AnalyticsService(); // ❌ Mistake: creating a new instance
    analytics.trackEvent("User Clicked Login");
}

function componentB() {
    console.log("--> Component B starting...");
    const analytics = new AnalyticsService(); // ❌ Mistake: creating ANOTHER instance
    analytics.trackEvent("User Viewed Dashboard");
}

// --- EXECUTION ---
console.log("--- APP START ---");
componentA();
componentB();

/* 
   YOUR TASK:
   1. Refactor `AnalyticsService` to be a Singleton.
   2. Ensure `sessionId` remains the same across both components.
   3. Fix `componentA` and `componentB` to use the Singleton instance.
*/


class NewAnalyticsService{
    private static instance: NewAnalyticsService
    public readonly sessionId: number
    private constructor(){
        this.sessionId = Math.random() * 10000
    }
    public trackEvent(eventName: string){
        console.log(this.sessionId)
        console.log("this.trackEvent " + eventName)
    }
    static getInstance(){
        if(!NewAnalyticsService.instance){
            NewAnalyticsService.instance = new NewAnalyticsService()
        }
        return NewAnalyticsService.instance
    }
}


function CompA(){
    let analytics = NewAnalyticsService.getInstance()
    analytics.trackEvent("login")
}

function CompB(){
    let analytics = NewAnalyticsService.getInstance()
    analytics.trackEvent("homePage")
}


console.log("after refactoring!")
CompA()
CompB()