# Level 12, Project 1: The Cache Master (LRU Cache) ⚡

## The Scenario
Your e-commerce API is too slow because it fetches product details from the database every time. You need a caching layer.

## The Problem
A simple array or Map isn't enough because memory is limited. You need a cache that automatically removes the **Least Recently Used (LRU)** items when it gets full.

## Your Goal
Implement an `LRUCache` class with `get` and `put` methods that run in **O(1)** (constant time).

## Decision Tree & Logic Flow

### 1. LRU Logic (Flowchart)

```mermaid
graph TD
    Start[Put Key/Value] --> Exists{Key Exists?}
    
    Exists -- Yes --> Update[Update Value]
    Update --> MoveFront[Move to Front (Most Recent)]
    
    Exists -- No --> CheckCap{Is Full?}
    CheckCap -- No --> AddNew[Add New Node]
    AddNew --> MoveFront
    
    CheckCap -- Yes --> Evict[🗑️ Remove Last Node (LRU)]
    Evict --> AddNew
```

## Setup
Work in `src/lru.ts`.
*   **Tip:** Use a `Map` combined with a **Doubly Linked List** to achieve O(1).
