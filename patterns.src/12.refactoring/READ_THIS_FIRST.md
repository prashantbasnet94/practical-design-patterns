# Read This First: The Refactoring Workshop 🧹

## Welcome to the Mess! 🗑️
In this module, we are doing things differently. The code you will find here is **INTENTIONALLY BAD**.
It mimics "Legacy Code" — the kind you find in 10-year-old projects that have had 20 different developers working on them.

## The Goal 🎯
Your job is to apply the Design Patterns you've learned to clean up this code.

## The Code Smells 👃
Look for these signs of rotting code:

### 1. The God Class (Code Smell) -> Fix: **Facade Pattern**
*   **Sign**: A single class `Manager` or `Util` that has 3000 lines and imports `Database`, `Email`, `User`, `Product`, and `Logger`.
*   **Why bad**: High coupling. Change one thing, break everything.

### 2. Telescoping Constructor (Code Smell) -> Fix: **Builder Pattern**
*   **Sign**: `new Server(8080, true, false, null, "admin", 1000, ...)`
*   **Why bad**: Impossible to read. Easy to swap `true` and `false` by accident.

### 3. Spaghetti Switch Types (Code Smell) -> Fix: **Strategy Pattern**
*   **Sign**: Giant `switch` statements checking `if (type === 'PAYPAL') ... else if (type === 'STRIPE') ...` scattered everywhere.
*   **Why bad**: Violates **Open/Closed Principle**. Adding a new type requires editing existing code (risky!).

## The SOLID Principles 🧱
As you refactor, aim for:
*   **S**ingle Responsibility: One class, one job.
*   **O**pen/Closed: Open for extension, closed for modification.
*   **D**ependency Inversion: Depend on abstractions (interfaces), not concrete details.
