/**
 * PATTERN: COMPOSITE
 * FILE: HouseStructure.ts
 *
 * CONCEPT:
 * Users want to control "The Whole House" or just "The Kitchen" or just "The Table Lamp".
 * The Composite pattern lets us treat individual items (Leaf) and groups of items (Composite) the same.
 *
 * TODO IMPLEMENTATION DETAILS:
 * 1. Create a `DeviceGroup` (or `Zone`) class that implements `ISmartDevice`.
 *    - It has an internal array: `children: ISmartDevice[]`.
 * 2. Implement `add(device)` and `remove(device)` methods.
 * 3. Implement the shared methods (`turnOn`, `turnOff`):
 *    - `turnOn()` for a Group should loop through all `children` and call `turnOn()` on them.
 *
 * FAANG-STYLE TIP:
 * - This allows recursive commands. `House.turnOff()` -> `Room.turnOff()` -> `Light.turnOff()`.
 */
export class DeviceGroup {
    // TODO: Add composite logic (array of children)
}
