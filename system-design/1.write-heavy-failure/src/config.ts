import { Queue, Worker } from 'bullmq';

// 1. Configuration: Connect to Redis
// In a real app, these would come from process.env
const REDIS_CONFIG = {
    connection: {
        host: 'localhost',
        port: 6379
    }
};

export const QUEUE_NAME = 'email-receipts';

// Shared Queue Instance for Producer
export const emailQueue = new Queue(QUEUE_NAME, REDIS_CONFIG);

// Mock Database and 3rd Party Service for demonstration
export const db = {
    saveRide: async (data: any) => { 
        console.log('💾 DB: Ride saved to Postgres'); 
        return { id: Date.now(), ...data }; 
    },
    updateRideStatus: async (id: number, status: string) => {
        console.log(`💾 DB: Updated ride ${id} status to ${status}`);
    }
};

export const sendGrid = {
    send: async (email: string) => {
        return new Promise((resolve) => {
            console.log(`📧 SendGrid: Sending email to ${email}... (Waiting 2s)`);
            setTimeout(() => {
                console.log(`✅ SendGrid: Sent to ${email}`);
                resolve(true);
            }, 2000); // Simulate 2s latency
        });
    }
};
