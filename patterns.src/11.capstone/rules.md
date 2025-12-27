# The Legacy E-Commerce App: Rules of Engagement 📜

Welcome to the **Capstone Project**. You have inherited a codebase from a team that didn't believe in Design Patterns. It works, but it's a nightmare to maintain.

## Phase 1: The Audit 🕵️‍♂️
Your first task is NOT to write code. It is to **Audit** the codebase.

Open the file `11.capstone/audit.md` (create it if it doesn't exist) and fill in this table:

| File | Code Smell | Proposed Pattern | Why? |
|------|------------|------------------|------|
| `src/app.ts` | God Class, Tight Coupling | **Facade** | To hide subsystem complexity. |
| `src/payment.ts` | ... | ... | ... |
| `src/order.ts` | ... | ... | ... |
| `src/logger.ts` | ... | ... | ... |
| `src/permissions.ts` | ... | ... | ... |

## Phase 2: The Refactor 🛠️
Once you have identified the patterns, we will go file-by-file and refactor them.

---
**Patterns to Look For:**
*   Singleton
*   Factory
*   Builder
*   Adapter
*   Decorator
*   Facade
*   Strategy
*   Observer
*   Composite
