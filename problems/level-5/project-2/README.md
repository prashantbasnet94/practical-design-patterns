# Level 5, Project 2: The Slow Dashboard

## The Scenario

You are building the "Overview" page for a SaaS application. To render this page, you need to fetch data from three different microservices:
1.  **User Profile** (Basic info)
2.  **User Notifications** (Alerts)
3.  **User Project Stats** (Graphs/Charts data)

## The Problem

The current implementation in `src/main.ts` works, but it is **too slow**.
It fetches these data points one by one (sequentially).
- Fetch Profile (1s)
- *Then* Fetch Notifications (1s)
- *Then* Fetch Stats (1s)
Total time: ~3 seconds.

Since these three pieces of data are **independent** of each other (fetching stats doesn't require the profile data), this is inefficient.

## Your Goal

Refactor `src/main.ts` to:
1.  Fetch all three data points **in parallel**.
2.  The total operation should take only as long as the slowest request (~1 second).
3.  Aggregate the results into a single `DashboardData` object.

## Bonus Challenge (Optional)
What happens if the "Notifications" service fails?
- **Standard**: The whole dashboard crashes (Promise.all behavior).
- **Advanced**: Can you make it so the dashboard still loads the Profile and Stats, but just returns an empty array `[]` for notifications if that specific request fails? (Hint: `Promise.allSettled` or individual `.catch`).
