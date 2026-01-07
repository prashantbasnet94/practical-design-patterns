import { OldApiClient, NewV2ApiClient } from "./api-clients";
import { DataFetcher } from "./data-fetcher";

console.log('--- Using the Old API Client ---');
const oldClient = new OldApiClient();
const dataFetcher1 = new DataFetcher(oldClient);
dataFetcher1.fetchAndDisplayUsers();

console.log('\n--- We want to use the New V2 Client here, but how? ---');
// const newClient = new NewV2ApiClient();
// const dataFetcher2 = new DataFetcher(newClient); // This will cause a TypeScript error!
// dataFetcher2.fetchAndDisplayUsers();
