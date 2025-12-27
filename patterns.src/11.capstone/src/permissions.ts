/**
 * SMELL: Complex Tree Logic
 * We need to check if a user has access to a resource.
 * Resources can be grouped (e.g., "FullAdmin" includes "UserRead", "UserGeneric").
 * 
 * Currently, we are just using arrays of strings and iterating manually.
 */

export class PermissionManager {
    // Array of strings? Grouping is implicit and messy.
    private userPermissions: string[] = ["admin_dashboard", "edit_users", "view_reports"];

    hasAccess(permission: string): boolean {
        // What if 'permission' is a group like "SuperAdmin"? 
        // We'd need to check every child permission manually.
        return this.userPermissions.includes(permission);
    }
}

// Desired Structure (Hint: Composite):
// Root
//  ├── Admin
//  │    ├── Edit Users
//  │    └── View Reports
//  └── Guest
//       └── View Home
