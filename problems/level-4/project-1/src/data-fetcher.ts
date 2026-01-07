import { OldApiClient } from "./api-clients";

// SMELL: This class is tightly coupled to the OldApiClient.
// We can't use the NewV2ApiClient with this class directly.
export class DataFetcher {
    constructor(private apiClient: OldApiClient) {}

    fetchAndDisplayUsers() {
        const users = this.apiClient.getUsers();
        console.log('Displaying users:');
        users.forEach(user => console.log(`- ${user.name} (ID: ${user.id})`));
    }
}
