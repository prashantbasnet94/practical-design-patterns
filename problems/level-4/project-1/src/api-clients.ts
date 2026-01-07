// This is the old, legacy API client.
export class OldApiClient {
    getUsers(): { id: string; name: string }[] {
        console.log('Fetching users from OLD API V1...');
        return [
            { id: 'user_1', name: 'John Old' },
            { id: 'user_2', name: 'Jane Old' },
        ];
    }
}

// This is the new, shiny API client with a different interface.
export class NewV2ApiClient {
    fetchUserData(): { data: { userId: string; userName: string }[] } {
        console.log('Fetching user data from NEW API V2...');
        return {
            data: [
                { userId: 'user_a', userName: 'Peter New' },
                { userId: 'user_b', userName: 'Mary New' },
            ],
        };
    }
}
