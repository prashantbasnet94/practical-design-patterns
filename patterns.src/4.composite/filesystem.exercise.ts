/**
 * COMPOSITE PATTERN CHALLENGE: File System Simulator
 * 
 * SCENARIO:
 * You are building a simulation of a file system for an OS.
 * The file system consists of Files and Directories.
 * - A File has a name and a size.
 * - A Directory has a name and can simulate containing other components (Files or other Directories).
 * 
 * GOAL:
 * Implement a uniform interface to treat Files and Directories recursively.
 * 
 * TODO:
 * 1. Create an abstract class or interface `FileSystemComponent` with:
 *    - `getName(): string`
 *    - `getSize(): number` - For a file, it's the file size. For a directory, it's the sum of all synthesized children.
 *    - `ls(indent: number): void` - Print the tree structure.
 * 2. Implement `FileClass` (Leaf).
 * 3. Implement `DirectoryClass` (Composite).
 *    - Should allow adding/removing components.
 */

// 1. Interface/Abstract Component
export abstract class FileSystemComponent {
    constructor(protected name: string) { }

    abstract getSize(): number;
    abstract ls(indent?: number): void;
}

// 2. Leaf: File
export class FileClass extends FileSystemComponent {
    constructor(name: string, private size: number) {
        super(name);
    }

    // TODO: Implement getSize()
    getSize(): number {
        throw new Error("Method not implemented.");
    }

    // TODO: Implement ls() - print name with indentation
    ls(indent: number = 0): void {
        throw new Error("Method not implemented.");
    }
}

// 3. Composite: Directory
export class DirectoryClass extends FileSystemComponent {
    private components: FileSystemComponent[] = [];

    constructor(name: string) {
        super(name);
    }

    add(component: FileSystemComponent): void {
        // TODO: Add component
    }

    remove(component: FileSystemComponent): void {
        // TODO: Remove component
    }

    // TODO: Return sum of all children's sizes
    getSize(): number {
        throw new Error("Method not implemented.");
    }

    // TODO: Print directory name, then recursively ls() all children (indent + 1)
    ls(indent: number = 0): void {
        throw new Error("Method not implemented.");
    }
}

// === USAGE / TEST ===
// console.log("--- File System Challenge ---");

/*
const root = new DirectoryClass("root");
const home = new DirectoryClass("home");
const user = new DirectoryClass("user");
const file1 = new FileClass("resume.pdf", 500);
const file2 = new FileClass("photo.jpg", 1200);
const sysFile = new FileClass("config.sys", 100);

root.add(home);
root.add(sysFile);
home.add(user);
user.add(file1);
user.add(file2);

console.log("Structure:");
root.ls();
// Expected Output:
// root
//   home
//     user
//       resume.pdf
//       photo.jpg
//   config.sys

console.log(`Total Size: ${root.getSize()}`); // Expected: 1800
*/
