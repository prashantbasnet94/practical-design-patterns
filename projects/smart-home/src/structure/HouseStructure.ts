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

import { ISmartDevice } from "../devices/types"

interface IMember {
    turnOn(): void
    turnOff(): void
}
/**
 * REVIEW HINT (Composite):
 * Key Requirement: The Composite (Group) must implement the SAME interface as the Leaf (Device).
 *
 * Change `implements IMember` -> `implements ISmartDevice`.
 * This allows you to nest groups: `new DeviceGroup().add(new DeviceGroup())`.
 */
export class DeviceGroup implements IMember {
    private children: ISmartDevice[] = []
    add(device: ISmartDevice) {
        this.children.push(device)
    }
    remove(device: ISmartDevice) {
        this.children = this.children.filter(o => o !== device)
    }
    turnOn(): void {
        this.children.forEach(o => o.turnOn())
    }
    turnOff(): void {
        this.children.forEach(o => o.turnOff())
    }
}
