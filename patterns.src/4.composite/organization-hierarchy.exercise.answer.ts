import { Employee } from './organization-hierarchy.exercise';
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

// === USAGE / TEST ===
// console.log("--- Organization Hierarchy Challenge ---");

interface IOrgComponent{
    getName(): string
    getSalary(): number
    indent(indent:number): void
}

class Employee implements IOrgComponent{
    constructor(public name: string, public salary: number) { }
    getName(): string {
        return this.name
    }
    getSalary(): number {
        return this.salary
    }
    indent(indent: number) {
        console.log(" ".repeat(indent), {name: this.name, salary: this.salary})
    }
}

class Department implements IOrgComponent {
    private members: IOrgComponent[] = []
    constructor(public name: string) { }

    addMember(member: IOrgComponent) {
        this.members.push(member)
    }
    remove(member: IOrgComponent) {
        this.members = this.members.filter(o => o != member)
    }
    getName(): string {
        return this.name
    }
    getSalary(): number {
        let total = 0
        this.members.forEach(o => {
            total +=o.getSalary()
        })
        return total
    }
    indent(indent: number): void {
        console.log(" Department : ", this.name)
        this.members.forEach(o => {
            o.indent(indent)
        })
    }
}
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
console.log()
backend.indent(2)
frontend.indent(2)
engineering.indent(2)

// Expected: 80000 + 90000 + 120000 = 290000
