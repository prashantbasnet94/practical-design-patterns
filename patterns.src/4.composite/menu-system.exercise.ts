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
export abstract class MenuComponent {
    protected disabled: boolean = false;

    constructor(protected title: string, protected url?: string) { }

    // Basic management
    add(component: MenuComponent): void {
        throw new Error("Cannot add to a leaf");
    }

    remove(component: MenuComponent): void {
        throw new Error("Cannot remove from a leaf");
    }

    getChild(index: number): MenuComponent {
        throw new Error("Leaf has no children");
    }

    disable(): void {
        this.disabled = true;
    }

    abstract render(indent?: number): void;
}

// 2. Leaf: MenuItem
export class MenuItem extends MenuComponent {
    render(indent: number = 0): void {
        // TODO: print title and URL. If disabled, print "[DISABLED]" prefix or similar.
        // e.g., "  Settings (link: /settings)"
    }
}

// 3. Composite: SubMenu
export class SubMenu extends MenuComponent {
    private items: MenuComponent[] = [];

    constructor(title: string) {
        super(title);
    }

    add(component: MenuComponent): void {
        // TODO
    }

    remove(component: MenuComponent): void {
        // TODO
    }

    getChild(index: number): MenuComponent {
        // TODO
        throw new Error("Method not implemented.");
    }

    render(indent: number = 0): void {
        // TODO: Print SubMenu title.
        // If this SubMenu is disabled, you might choose to skip rendering children 
        // OR render them as grayed out.
        // For this exercise: If SubMenu is disabled, DO NOT render its children.
    }
}

// === USAGE / TEST ===
// console.log("--- Menu System Challenge ---");

/*
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
mainMenu.render();

console.log("\n--- Disabling Edit Menu ---");
editMenu.disable(); // Should hide Copy and Paste
mainMenu.render();
*/
