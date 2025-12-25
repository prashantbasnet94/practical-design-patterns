/**
 * CHALLENGE 2: COMPLEX USER PROFILE BUILDER
 * 
 * INSTRUCTIONS:
 * Create a `UserProfile` class that has many properties (mandatory and optional).
 * Using a constructor for 10+ fields is messy. Use the Builder pattern to simplify creation.
 * 
 * PROPERTIES:
 * - Mandatory: username, email
 * - Optional: firstName, lastName, age, phoneNumber, address, bio, themePreference, notificationSettings
 * 
 * REQUIREMENTS:
 * 1. Validations:
 *    - Age cannot be negative.
 *    - Phone number must be 10 digits (simple check).
 * 2. `build()` should throw an error if mandatory fields are missing.
 */

class UserProfile {
    // Define properties here

    constructor(
        public username: string,
        public email: string,
        // ... other props
    ) { }
}

export class UserProfileBuilder {
    // TODO: Maintain state

    constructor(username: string, email: string) {
        // Mandatory fields can be forced in the builder constructor
    }

    setFirstName(name: string): UserProfileBuilder {
        return this;
    }

    setLastName(name: string): UserProfileBuilder {
        return this;
    }

    setAge(age: number): UserProfileBuilder {
        // TODO: Validate age
        return this;
    }

    // ... Implement other setters ...

    build(): UserProfile {
        return {} as UserProfile; // Replace
    }
}

// --- TEST CASE ---
try {
    console.log("Building User Profile...");

    const builder = new UserProfileBuilder("jdoe", "jdoe@example.com");
    const user = builder
        .setFirstName("John")
        .setLastName("Doe")
        .setAge(30)
        // .setAge(-5) // Should throw error
        .build();

    console.log("User created:", user);

} catch (e) {
    console.error(e);
}
