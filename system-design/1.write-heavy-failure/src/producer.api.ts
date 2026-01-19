import express from 'express';
import { emailQueue, db } from './config';

const app = express();
app.use(express.json());

/**
 * THE PRODUCER
 * Goal: Accept request, Save Data, Offload Heavy Task, Respond Fast.
 */
app.post('/ride-completed', async (req, res) => {
  try {
    const { driverId, rideDetails } = req.body;

    // 1. Critical Path: Save to DB (Sync)
    // We MUST do this before responding.
    const savedRide = await db.saveRide({
      driverId,
      ...rideDetails,
      status: 'PENDING'
    });

    // 2. Offload Path: Add to Queue (Async)
    // We do NOT await the email sending. We only await the "Acknowledgement"
    // that the job was added to the queue (which is <5ms).
    await emailQueue.add(
      'send-receipt',
      {
        rideId: savedRide.id,
        email: 'driver@example.com' // Pretend we looked this up
      },
      {
        attempts: 3, // If it fails, retry 3 times
        backoff: {
          type: 'exponential',
          delay: 1000 // Wait 1s, then 2s, then 4s...
        }
      }
    );

    console.log(`🚀 API: Job added to queue for ride ${savedRide.id}`);

    // 3. Respond immediately
    res
      .status(200)
      .json({ success: true, message: 'Ride processed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start Server
// app.listen(3000, () => console.log('API Server running on port 3000'));
export const apiApp = app;
