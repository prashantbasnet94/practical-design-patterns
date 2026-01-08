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

    // const user = await Api.getProfile(userId);
    // const alerts = await Api.getNotifications(userId);
    // const metrics = await Api.getProjectStats(userId);
    const { getProfile, getNotifications, getProjectStats } = Api
    Promise.allSettled([ getProfile(userId), getNotifications(userId), getProjectStats(userId) ]).then(([ user, alerts, metrics ]) => {
        // console.log({ user, alerts, metrics })
        //
        if (user.status === 'rejected') {
            throw new Error('Critical User Profile failed')
        }
        if (metrics.status === 'rejected') {
            throw new Error('Critical Metrics Failed')
        }

        const safeAlerts = alerts.status === 'fulfilled' ? alerts.value : []

        const dashboard: DashboardData = {
            user: user.value,
            metrics: metrics.value,
            alerts: safeAlerts
        };
        console.log('\n--- Dashboard Loaded ---');
        console.log(dashboard);

        console.timeEnd('Total Load Time'); // Expect ~3000ms+
    }).catch(err => {
        console.log(err)
    })

    // --------------------

}

loadDashboard('user_123').catch(err => console.error('Dashboard Error:', err));
