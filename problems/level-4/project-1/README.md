# Level 4, Project 1: The Inflexible API Client

## The Scenario

You are working on an application that fetches user data from a third-party service. The original implementation uses a client class called `OldApiClient` which is used throughout the application in services like the `DataFetcher`.

The third-party service has just released a new, much faster and more reliable V2 API. A new `NewV2ApiClient` has been written to interact with it, but its method names and data formats are completely different from the old one.

## The Problem

Your team wants to migrate to the new V2 API to take advantage of its benefits. However, a significant amount of existing code, like the `DataFetcher` in `src/data-fetcher.ts`, is tightly coupled to the interface of the `OldApiClient` (e.g., it calls the `.getUsers()` method).

Rewriting all the services that use the old client would be a massive, risky undertaking.

## Your Goal

Your task is to apply the **Adapter pattern** to allow the `DataFetcher` and other potential client services to use the `NewV2ApiClient` without changing their own code.

**Key Requirements:**

1.  Create an adapter class that has the same interface as the `OldApiClient` but internally uses the `NewV2ApiClient`.
2.  The `DataFetcher` class should not be modified, but it should be able to fetch data using the new V2 client via your adapter.
3.  The `main.ts` file should demonstrate how to use the `DataFetcher` with both the old client and the new client (via the adapter) to prove the solution works and is flexible.