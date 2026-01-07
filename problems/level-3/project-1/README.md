# Level 3, Project 1: The E-commerce God Class

## The Scenario

You are working on the backend for a new e-commerce platform. A single, large `ECommerceSystem` class was created to handle all the core logic. It manages products, user accounts, and processing orders.

## The Problem

The `ECommerceSystem` class in `src/ecommerce-system.ts` is a "god class". It does too much, making it incredibly difficult to understand, test, and maintain. If a bug occurs in order processing, you have to dig through this huge class that also contains unrelated logic for user and product management. This violates the Single Responsibility Principle and is a common issue in rapidly developed projects.

## Your Goal

Your task is to refactor this system by breaking the `ECommerceSystem` class down into smaller, more focused classes. Each new class should handle a single responsibility (e.g., `ProductManager`, `UserManager`, `OrderProcessor`).

Then, you should create an `ECommerceFacade` class that provides a simple, unified interface for clients to interact with the system, preserving the ease of use of the original class while hiding the new complexity of the subsystem.

**Key Requirements:**

1.  Break down the `ECommerceSystem` into smaller classes, each with a single responsibility.
2.  Create a `ECommerceFacade` that provides a clean, high-level API for common tasks (like purchasing a product).
3.  The client code in `src/main.ts` should be updated to use your new facade.