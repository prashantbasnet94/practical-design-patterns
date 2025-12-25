/**
 * CHALLENGE 4: TEST FIXTURE BUILDER (Object Mother)
 * 
 * CONTEXT:
 * In tests, you often need valid objects with slight variations.
 * A "UserBuilder" helps keep tests clean by hiding the boilerplate of creating valid users.
 * 
 * GOAL:
 * Create a `UserTestFixture` builder that creates `User` objects with valid defaults (randomized or static).
 * 
 * REQUIREMENTS:
 * 1. `withAdminRole()`: sets role to 'ADMIN'.
 * 2. `withVerifiedEmail()`: sets `emailVerified` to true.
 * 3. `withBannedStatus()`: sets `banned` to true.
 * 4. `withBalance(amount)`: sets account balance.
 * 5. Default state: Role='USER', banned=false, emailVerified=false, balance=0.
 */

interface User {
    id: string;
    username: string;
    role: 'ADMIN' | 'USER' | 'GUEST';
    emailVerified: boolean;
    banned: boolean;
    balance: number;
}

export class UserTestFixture {
    // TODO: Define sensible defaults

    withAdminRole(): UserTestFixture {
        return this;
    }

    withVerifiedEmail(): UserTestFixture {
        return this;
    }

    // ... Implement others ...

    build(): User {
        // Generate random ID if not set?
        // Return structured user
        return {} as User;
    }
}

// --- TEST CASE ---
try {
    const adminUser = new UserTestFixture()
        .withAdminRole()
        .withVerifiedEmail()
        .build();

    const bannedUser = new UserTestFixture()
        .withBannedStatus()
        .build();

    console.log("Admin:", adminUser);
    console.log("Banned user:", bannedUser);

} catch (e) {
    console.error(e);
}
