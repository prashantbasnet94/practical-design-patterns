"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// --- THE PROBLEM: MESSY CODEBASE ---
// Scenario: We have an Analytics Service that tracks user actions.
// Ideally, the Session ID should be the SAME for the whole app run.
// However, currently every component creates its own instance.
var AnalyticsService = /** @class */ (function () {
    function AnalyticsService() {
        // Generates a random session ID every time it's created
        this.sessionId = Math.floor(Math.random() * 10000);
        console.log("\u2728 Analytics Service Initialized. Session ID: ".concat(this.sessionId));
    }
    AnalyticsService.prototype.trackEvent = function (eventName) {
        console.log("[Session: ".concat(this.sessionId, "] Tracking: ").concat(eventName));
    };
    return AnalyticsService;
}());
// --- CLIENT CODE (Simulating different parts of the app) ---
function componentA() {
    console.log("--> Component A starting...");
    var analytics = new AnalyticsService(); // ❌ Mistake: creating a new instance
    analytics.trackEvent("User Clicked Login");
}
function componentB() {
    console.log("--> Component B starting...");
    var analytics = new AnalyticsService(); // ❌ Mistake: creating ANOTHER instance
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
var NewAnalyticsService = /** @class */ (function () {
    function NewAnalyticsService() {
        this.sessionId = Math.random() * 10000;
    }
    NewAnalyticsService.prototype.trackEvent = function (eventName) {
        console.log(this.sessionId);
        console.log("this.trackEvent " + eventName);
    };
    NewAnalyticsService.getInstance = function () {
        if (!NewAnalyticsService.instance) {
            NewAnalyticsService.instance = new NewAnalyticsService();
        }
        return NewAnalyticsService.instance;
    };
    return NewAnalyticsService;
}());
function CompA() {
    var analytics = NewAnalyticsService.getInstance();
    analytics.trackEvent("login");
}
function CompB() {
    var analytics = NewAnalyticsService.getInstance();
    analytics.trackEvent("homePage");
}
console.log("after refactoring!");
CompA();
CompB();
