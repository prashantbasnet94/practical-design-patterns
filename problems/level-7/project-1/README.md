# Level 7, Project 1: The Boolean State Hell

## The Scenario

You are building a Content Management System (CMS) for a publishing house. The core entity is a `Document`. A document goes through a strict workflow:
`Draft` -> `Review` -> `Published`.

It can also be `Rejected` (from Review) or `Archived` (from Published).

## The Problem

The `Document` class in `src/document.ts` manages its state using a collection of boolean flags: `isDraft`, `isInReview`, `isPublished`, `isArchived`, etc.

The logic in methods like `submitForReview()`, `approve()`, and `reject()` is a tangled mess of `if/else` checks to ensure valid transitions (e.g., you can't archive a document that is in draft).

This approach is:
1.  **Bug-prone:** It's easy to accidentally set two flags to true (e.g., `isDraft = true` AND `isPublished = true`).
2.  **Hard to extend:** Adding a "Scheduled" state would require checking every other flag in every method.
3.  **Hard to read:** The business rules are buried in conditional logic.

## Your Goal

Refactor the `Document` class to use the **State Pattern**.

**Key Requirements:**
1.  Define a `State` interface (or abstract class) with methods for each transition (e.g., `publish()`, `reject()`).
2.  Create concrete state classes: `DraftState`, `ReviewState`, `PublishedState`, etc.
3.  The `Document` class should delegate behavior to its current state object.
4.  Remove all boolean state flags (`isDraft`, etc.) from the `Document` class.

## Current State Visualization

Here is the state machine diagram and decision logic of the current messy implementation.

### 1. State Transition Diagram (The "Happy Path" & Valid Flows)

This diagram shows how the document *should* move between states.

```mermaid
stateDiagram-v2
    [*] --> Draft

    state Draft {
        [*] --> Edit
        Edit --> [*]
    }
    
    Draft --> Review: submitForReview()
    Review --> Published: approve()
    Review --> Rejected: reject()
    Rejected --> Draft: modify()
    Published --> Archived: archive()

    note right of Review : Cannot Modify
    note right of Published : Cannot Modify
    note right of Archived : Final State
```

### 2. Decision Logic Tree (The "Messy" Reality)

This represents the current `if/else` logic implemented in the class.

#### `modify(content)`
```mermaid
graph TD
    A["Start: modify"] --> B{"isPublished OR isArchived?"}
    B -- "Yes" --> C["Error: Cannot modify"]
    B -- "No" --> D{"isInReview?"}
    D -- "Yes" --> E["Error: Cannot modify"]
    D -- "No" --> F["Update Content"]
    F --> G{"isRejected?"}
    G -- "Yes" --> H["isRejected = false<br/>isDraft = true"]
    G -- "No" --> I["End"]
```

#### `submitForReview()`
```mermaid
graph TD
    A["Start: submitForReview"] --> B{"isInReview?"}
    B -- "Yes" --> C["Error: Already in review"]
    B -- "No" --> D{"isPublished OR isArchived?"}
    D -- "Yes" --> E["Error: Cannot submit"]
    D -- "No" --> F["isDraft = false<br/>isInReview = true<br/>isRejected = false"]
```

#### `approve()`, `reject()`, `archive()`
```mermaid
graph TD
    subgraph approve
    A1["Start"] --> B1{"isInReview?"}
    B1 -- "No" --> C1["Error"]
    B1 -- "Yes" --> D1["isInReview = false<br/>isPublished = true"]
    end

    subgraph reject
    E2["Start"] --> F2{"isInReview?"}
    F2 -- "No" --> G2["Error"]
    F2 -- "Yes" --> H2["isInReview = false<br/>isRejected = true"]
    end

    subgraph archive
    I3["Start"] --> J3{"isPublished?"}
    J3 -- "No" --> K3["Error"]
    J3 -- "Yes" --> L3["isPublished = false<br/>isArchived = true"]
    end
```
