import { Api, Profile, Notification, Stats } from './api';

interface DashboardData {
    user: Profile;
    alerts: Notification[];
    metrics: Stats;
}

async function loadDashboard(userId: string) {
    console.time('Total Load Time'); // Timer to measure performance

    // --- PROBLEM AREA ---
    // These await statements happen one after another.
    // This is a "Waterfall" and is slow for independent data.
    
    console.log('--- Starting Sequential Fetch ---');
    
    const user = await Api.getProfile(userId);
    const alerts = await Api.getNotifications(userId);
    const metrics = await Api.getProjectStats(userId);

    // --------------------

    const dashboard: DashboardData = {
        user,
        alerts,
        metrics
    };

    console.log('\n--- Dashboard Loaded ---');
    console.log(dashboard);
    
    console.timeEnd('Total Load Time'); // Expect ~3000ms+
}

loadDashboard('user_123').catch(err => console.error('Dashboard Error:', err));
