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


/**
 * REVIEW HINT (Composite):
 * Key Requirement: The Composite (Group) must implement the SAME interface as the Leaf (Device).
 *
 * Change `implements IMember` -> `implements ISmartDevice`.
 * This allows you to nest groups: `new DeviceGroup().add(new DeviceGroup())`.
 */
export class DeviceGroup implements ISmartDevice {
    private children: ISmartDevice[] = []
    public constructor(private id: string, private name: string){}

    add(device: ISmartDevice) {
        this.children.push(device)
    }
    remove(device: ISmartDevice) {
        console.log("Group : ", this.name, " removing children ")
        this.children = this.children.filter(o => o !== device)
    }
    turnOn(): void {
        console.log("GROUP turning on : ", this.name)
        this.children.forEach(o => o.turnOn())
    }
    turnOff(): void {
        console.log('GROUP turning off : ', this.name)
        this.children.forEach(o => o.turnOff())
    }
     getStatus(): string {
        return this.name + ' status: ' + this.children.map(o => o.getStatus())
    }
}
