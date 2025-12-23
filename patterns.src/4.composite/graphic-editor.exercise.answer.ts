import { Circle, CompoundGraphic } from './graphic-editor.exercise';
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

class Circle implements GraphicObject{
    constructor(x: number, y: number, z: number) { }
    move(x: number, y: number): void {
        console.log("Circle: move by ", { x, y})
    }
    render(): void {
        console.log("Circle, rendering objects")
    }
    resize(scale: number): void {
        console.log("Circle, resize by ", {scale})
    }
}

class Square implements GraphicObject{
    constructor(x:number, y: number, z:number){}
    move(x: number, y: number): void {
        console.log("Square: move by ", { x, y})
    }
    render(): void {
        console.log("Square, rendering objects")
    }
    resize(scale: number): void {
        console.log("Square, resize by ", {scale})
    }

}


class CompoundGraphic implements GraphicObject{

    private children: GraphicObject[] = []
    constructor() {    }

    add(object: GraphicObject) {
        this.children.push(object)
    }
    remove(object: GraphicObject) {
        this.children = this.children.filter(o => o !==object)
    }

    move(x: number, y: number): void {
        this.children.forEach(o => o.move(x, y))
    }
    render(): void {
        this.children.forEach(o => o.render())
    }
    resize(scale: number): void {
        this.children.forEach(o => o.resize(scale))
    }

}

// === USAGE / TEST ===
// console.log("--- Graphic Editor Challenge ---");

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
