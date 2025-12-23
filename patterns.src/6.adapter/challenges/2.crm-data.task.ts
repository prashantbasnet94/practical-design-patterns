/**
 * CHALLENGE 2: DATA TRANSFORMATION ADAPTER
 *
 * Scenario:
 * Your app displays a list of users. It uses the `IUserSource` interface.
 *
 * Problem:
 * You need to fetch users from a `LegacyCRMSystem`.
 * - Your app expects: `fullName` (string).
 * - Legacy CRM provides: `firstName` and `lastName` (separate strings).
 *
 * Task:
 * Implement `CRMAdapter` to concatenate the names correctly.

// --- 1. Target Interface ---
interface IUserSource {
    getUsers(): { fullName: string }[];
}

// --- 2. Adaptee (Legacy System) ---
class LegacyCRMSystem {
    getAllContacts() {
        return [
            { first_name: "John", last_name: "Doe" },
            { first_name: "Alice", last_name: "Smith" }
        ];
    }
}

// --- 3. Client Code ---
function displayUsers(source: IUserSource) {
    const users = source.getUsers();
    users.forEach(u => console.log(`User: ${u.fullName}`));
}

// --- YOUR WORK STARTS HERE ---

class CRMAdapter implements IUserSource {
    private crm: LegacyCRMSystem;

    constructor(crm: LegacyCRMSystem) {
        this.crm = crm;
    }

    getUsers(): { fullName: string }[] {
        // TODO: Call this.crm.getAllContacts()
        // TODO: Map the results to match { fullName: string }
        return [];
    }
}

// --- VERIFICATION ---
console.log("--- Challenge 2: CRM Adapter ---");

const legacySystem = new LegacyCRMSystem();
const adapter = new CRMAdapter(legacySystem);

displayUsers(adapter);
// Expected Output:
// User: John Doe
// User: Alice Smith
 */
