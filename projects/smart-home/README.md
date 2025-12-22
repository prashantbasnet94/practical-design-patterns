# Smart Home Automation System 🏠

## Overview
This project serves as a **Reference Implementation & Practice Ground** for the first 5 standard Design Patterns. It mimics a professional ("FAANG-style") architectural approach to a common problem: building a scalable Smart Home system.

**Current State:** 🚧 **Scaffolding / Practice Mode**
The files contain **architectural comments and TODOs** but NO implementation logic. This is designed for you to practice implementing the patterns based on professional specs.

## Patterns Implemented

| Pattern | Component | File | Role |
| :--- | :--- | :--- | :--- |
| **Singleton** | `HomeHub` | `src/core/HomeHub.ts` | The central brain. Ensures only one system controller exists to manage state and cloud connections. |
| **Observer** | `EventBus` | `src/core/EventBus.ts` | Decoupled communication. Allows devices to react to events (e.g., Motion -> Light On) without direct dependencies. |
| **Factory** | `DeviceFactory` | `src/devices/DeviceFactory.ts` | Centralized creation. Abstracts away the complexity of instantiating different device types (Lights, Locks, Thermostats). |
| **Composite** | `DeviceGroup` | `src/structure/HouseStructure.ts` | Uniform structure. Treat a single Light and a whole Room (group of lights) exactly the same way. |
| **Decorator** | `Decorators` | `src/features/Decorators.ts` | Dynamic behavior. Add "Security" (PIN codes) or "Logging" to any device at runtime without inheritance explosion. |

## How to Use This Project

1.  **Explore**: Read the `TODO` comments in each file to understand the *Why* and *How* of the pattern.
2.  **Implement**: Write the code to fulfill the requirements in the comments.
3.  **Extend**: Try adding a new pattern (e.g., *Adapter* for an old device) once you are comfortable.

## Directory Structure
```
projects/smart-home/
├── src/
│   ├── core/           # Infrastructure (Singleton, Observer)
│   ├── devices/        # Hardware definitions (Factory)
│   ├── structure/      # Grouping logic (Composite)
│   └── features/       # Enhancements (Decorator)
└── README.md
```
