/**
 * COMPOSITE PATTERN CHALLENGE: Organization Hierarchy
 * 
 * SCENARIO:
 * A large corporation needs to calculate the total salary budget for its departments.
 * The hierarchy consists of Employees (Leaves) and Departments (Composites).
 * A Department can contain Employees and other Departments (sub-departments).
 * 
 * GOAL:
 * Implement `getSalaries()` to calculate the total salary recursively.
 * 
 * TODO:
 * 1. Create `OrganizationComponent` interface:
 *    - `getName(): string`
 *    - `getSalary(): number`
 * 2. Implement `Employee` (Leaf).
 *    - Has a fixed salary.
 * 3. Implement `Department` (Composite).
 *    - Has a name.
 *    - `getSalary()` is the sum of all members (leaves and sub-departments).
 *    - Methods to add/remove members.
 */

// 1. Interface
export interface OrganizationComponent {
    getName(): string;
    getSalary(): number;
}

// 2. Leaf: Employee
export class Employee implements OrganizationComponent {
    constructor(private name: string, private salary: number) { }

    getName(): string {
        return this.name;
    }

    getSalary(): number {
        // TODO: return salary
        throw new Error("Method not implemented.");
    }
}

// 3. Composite: Department
export class Department implements OrganizationComponent {
    private members: OrganizationComponent[] = [];

    constructor(private name: string) { }

    getName(): string {
        return this.name;
    }

    addMember(member: OrganizationComponent): void {
        // TODO
    }

    removeMember(member: OrganizationComponent): void {
        // TODO
    }

    getSalary(): number {
        // TODO: Calculate total salary of all members recursively
        throw new Error("Method not implemented.");
    }
}

// === USAGE / TEST ===
// console.log("--- Organization Hierarchy Challenge ---");

/*
const engineering = new Department("Engineering");
const frontend = new Department("Frontend Team");
const backend = new Department("Backend Team");

const alice = new Employee("Alice", 80000); // Frontend
const bob = new Employee("Bob", 90000);     // Backend
const charlie = new Employee("Charlie", 120000); // Engineering Manager

frontend.addMember(alice);
backend.addMember(bob);

engineering.addMember(frontend);
engineering.addMember(backend);
engineering.addMember(charlie); // Manager directly under Engineering

console.log(`Total Engineering Budget: $${engineering.getSalary()}`);
// Expected: 80000 + 90000 + 120000 = 290000
*/
