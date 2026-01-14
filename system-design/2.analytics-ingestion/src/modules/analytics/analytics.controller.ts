
import { AnalyticsService } from "./analytics.service";

/**
 * The Controller is "dumb". It just handles HTTP.
 */
export class AnalyticsController {
    constructor(private readonly service: AnalyticsService) {}

    async handlePostRequest(req: any, res: any) {
        try {
            // "Fire and Forget" logic from the client's perspective
            await this.service.trackEvent(req.body);
            res.status(202).send({ status: "Accepted" }); 
        } catch (err: any) {
            res.status(400).send({ error: err.message });
        }
    }
}
