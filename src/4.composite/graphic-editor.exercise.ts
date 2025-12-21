/**
 * COMPOSITE PATTERN CHALLENGE: Graphic Design Tool
 * 
 * SCENARIO:
 * You are building a graphic design tool (like Figma or Adobe Illustrator).
 * Users can create basic Shapes (Circle, Square) and group them together into ComplexShapes.
 * Operations performed on a Group should propagate to all its children.
 * 
 * GOAL:
 * Implement a uniform interface so that `move`, `render`, and `resize` work on both single shapes and groups.
 * 
 * TODO:
 * 1. Define `GraphicObject` interface with `move(x, y)`, `render()`, `resize(scale)`.
 * 2. Implement `Circle` and `Square` (Leaves).
 * 3. Implement `CompoundGraphic` (Composite) which holds children.
 */

// 1. Component Interface
export interface GraphicObject {
    move(x: number, y: number): void;
    render(): void;
    resize(scale: number): void;
}

// 2. Leaf: Circle
export class Circle implements GraphicObject {
    constructor(private x: number, private y: number, private radius: number) { }

    move(x: number, y: number): void {
        // TODO: update x and y
    }

    render(): void {
        // console.log(`Circle at (${this.x}, ${this.y}) with radius ${this.radius}`);
    }

    resize(scale: number): void {
        // TODO: scale radius
    }
}

// 2. Leaf: Square
export class Square implements GraphicObject {
    constructor(private x: number, private y: number, private side: number) { }

    move(x: number, y: number): void {
        // TODO: update x and y
    }

    render(): void {
        // console.log(`Square at (${this.x}, ${this.y}) with side ${this.side}`);
    }

    resize(scale: number): void {
        // TODO: scale side
    }
}

// 3. Composite: CompoundGraphic
export class CompoundGraphic implements GraphicObject {
    private children: GraphicObject[] = [];

    add(child: GraphicObject) {
        // TODO
    }

    remove(child: GraphicObject) {
        // TODO
    }

    move(x: number, y: number): void {
        // TODO: forward to all children
    }

    render(): void {
        // console.log("Compound Graphic Group:");
        // TODO: forward to all children
    }

    resize(scale: number): void {
        // TODO: forward to all children
    }
}

// === USAGE / TEST ===
// console.log("--- Graphic Editor Challenge ---");

/*
const group1 = new CompoundGraphic();
group1.add(new Circle(10, 10, 5));
group1.add(new Square(20, 20, 10));

const group2 = new CompoundGraphic();
group2.add(new Circle(50, 50, 8));
group2.add(group1); // Nested group

console.log("Initial Render:");
group2.render();

console.log("\nMoving Group 2 by (10, 10):");
group2.move(10, 10);
group2.render();
// All coordinates should increase by 10
*/
