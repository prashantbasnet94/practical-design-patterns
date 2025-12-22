/**
 * CORE INTERFACES
 * FILE: types.ts
 *
 * CONCEPT:
 * Clean architecture relies on contracts (interfaces).
 * We define WHAT a device looks like before we define HOW it works.
 *
 * TODO IMPLEMENTATION DETAILS:
 * 1. Define `ISmartDevice` interface:
 *    - `id`: string (unique uuid)
 *    - `name`: string (user friendly name)
 *    - `type`: string ('light', 'lock', etc)
 *    - `turnOn()`: void
 *    - `turnOff()`: void
 *    - `getStatus()`: boolean | object
 *
 * 2. (Optional) Define `ISensor` interface if sensors behave differently than actuators.
 */

// export interface ISmartDevice { ... }
