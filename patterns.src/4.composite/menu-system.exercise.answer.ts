import { SubMenu } from './menu-system.exercise';
/**
 * COMPOSITE PATTERN CHALLENGE: UI Menu System
 *
 * SCENARIO:
 * You are building a dynamic menu for a web application.
 * Menus can contain individual MenuItems or SubMenus.
 * Some items should only be visible/clickable based on user permissions.
 *
 * GOAL:
 * Implement a `render()` method that respects permissions.
 * If a SubMenu is disabled/hidden, all its children are effectively hidden.
 *
 * TODO:
 * 1. Define `MenuComponent` abstract class.
 *    - `url`: string (optional)
 *    - `render(indent: number): void`
 *    - `disable()`: Marks the component as disabled.
 * 2. Implement `MenuItem` (Leaf).
 * 3. Implement `SubMenu` (Composite).
 *    - If `SubMenu` is disabled, its children should not be rendered or should be rendered as disabled.
 */

// 1. Abstract Component
interface IMenuComponent{
    render(indent: number): void
    disable(): void
}

class MenuItem implements IMenuComponent{
    private disabled: boolean = false
    constructor(public action: string, public url?: string) { }

    render(indent: number): void {
        !this.disabled && console.log(" ".repeat(indent), this.action, " " , {url: this.url})
    }
    disable(): void {
        this.disabled = true
    }
}

class SubMenu implements IMenuComponent{
    url?: string | undefined;
    private items : IMenuComponent[] = []
    constructor(public name: string) { }
    add(item: IMenuComponent) {
        this.items.push(item)
    }
    remove(item: IMenuComponent) {
        this.items = this.items.filter(o => o !== item)
    }
    render(indent: number): void {
        console.log(this.name , " :")
        this.items.forEach(o => o.render(indent))
    }
    disable(): void {
        console.log("disabling : ", this.name )
        this.items.forEach(o => o.disable())
    }

}

// === USAGE / TEST ===
// console.log("--- Menu System Challenge ---");

const mainMenu = new SubMenu("Main Menu");
const fileMenu = new SubMenu("File");
const editMenu = new SubMenu("Edit");

const open = new MenuItem("Open", "/open");
const save = new MenuItem("Save", "/save");
const copy = new MenuItem("Copy", "/copy");
const paste = new MenuItem("Paste", "/paste");

fileMenu.add(open);
fileMenu.add(save);
editMenu.add(copy);
editMenu.add(paste);

mainMenu.add(fileMenu);
mainMenu.add(editMenu);

console.log("--- Initial Render ---");
mainMenu.render(2);

console.log("\n--- Disabling Edit Menu ---");
editMenu.disable(); // Should hide Copy and Paste
mainMenu.render(2);
