// Simulates independent microservices with artificial delays.

export interface Profile { id: string; name: string; plan: string }
export interface Notification { id: string; message: string }
export interface Stats { activeProjects: number; totalHours: number }

export const Api = {
    getProfile(userId: string): Promise<Profile> {
        return new Promise((resolve) => {
            console.log('⏳ Fetching Profile...');
            setTimeout(() => {
                console.log('✅ Profile loaded');
                resolve({ id: userId, name: 'Alice Developer', plan: 'Pro' });
            }, 1000);
        });
    },

    getNotifications(userId: string): Promise<Notification[]> {
        return new Promise((resolve, reject) => {
            console.log('⏳ Fetching Notifications...');
            setTimeout(() => {
                // Simulating a 20% chance of failure for the Bonus Challenge
                const randomFail = Math.random() < 0.2; 
                if (randomFail) {
                    console.log('❌ Notifications Failed!');
                    reject(new Error('Notification Service Timeout'));
                } else {
                    console.log('✅ Notifications loaded');
                    resolve([
                        { id: 'n1', message: 'Your subscription expires soon' },
                        { id: 'n2', message: 'New comment on Project A' }
                    ]);
                }
            }, 1000);
        });
    },

    getProjectStats(userId: string): Promise<Stats> {
        return new Promise((resolve) => {
            console.log('⏳ Fetching Stats...');
            setTimeout(() => {
                console.log('✅ Stats loaded');
                resolve({ activeProjects: 5, totalHours: 142 });
            }, 1000);
        });
    }
};
