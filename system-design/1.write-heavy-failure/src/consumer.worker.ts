import { Worker } from 'bullmq';
import { QUEUE_NAME, db, sendGrid } from './config';

/**
 * THE CONSUMER
 * Goal: Process background jobs reliably. 
 * If it crashes, it retries. If it's slow, no one cares.
 */
console.log("👷 Worker: Listening for jobs...");

const worker = new Worker(QUEUE_NAME, async (job) => {
    // This function is called whenever there is a job in the queue
    console.log(`\n📥 Worker: Processing Job ${job.id}`);

    const { rideId, email } = job.data;

    try {
        // 1. Perform the Heavy Task
        // This takes 2 seconds, but it's happening in the background.
        await sendGrid.send(email);

        // 2. Update State
        // Mark the ride as "receipt sent" in the DB
        await db.updateRideStatus(rideId, 'RECEIPT_SENT');

        console.log(`✨ Worker: Job ${job.id} Complete`);
        return { success: true };

    } catch (error) {
        // If we throw an error here, BullMQ will schedule a retry automatically!
        console.error(`💥 Worker: Job ${job.id} Failed!`, error);
        throw error;
    }

}, {
    // Concurrency: How many jobs to process in parallel?
    // If SendGrid allows 50 concurrent connections, set this to 50.
    concurrency: 50,
    
    // Connection config
    connection: { host: 'localhost', port: 6379 }
});

// Event listeners for logging
worker.on('completed', (job) => {
    // console.log(`${job.id} has completed!`);
});

worker.on('failed', (job, err) => {
    console.log(`${job?.id} has failed with ${err.message}`);
});
