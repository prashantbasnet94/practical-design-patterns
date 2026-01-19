# Level 14, Project 1: The Time Machine (Event Sourcing) ⏳

## The Scenario
You are building a banking system. The auditors require a perfect history of every account change. Storing just the `currentBalance` is illegal; you must store *every transaction*.

## The Problem
You need a system where the state of an account is derived by replaying a sequence of events (e.g., `AccountOpened`, `MoneyDeposited`, `MoneyWithdrawn`).

## Your Goal
Implement an **Event Sourcing Engine**.

## Decision Tree & Logic Flow

### 1. State Rehydration (Flowchart)
How to get the current balance:

```mermaid
graph LR
    DB[(Event Store)] -->|Load Events| Stream[Event Stream]
    Stream -->|Event 1| Apply1[Apply: Created (0)]
    Apply1 -->|Event 2| Apply2[Apply: Deposit (+100)]
    Apply2 -->|Event 3| Apply3[Apply: Withdraw (-20)]
    Apply3 -->|Final| State[Current State: 80]
```

## Setup
Work in `src/event-store.ts`.
