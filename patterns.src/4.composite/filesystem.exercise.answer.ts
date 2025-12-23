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
interface IFileSystemComponent{
    getName(): string
    getSize(): number
    ls(indent: number): void
}

// 2. Leaf: File
class FileClass implements IFileSystemComponent{
    constructor(public name:string, public size: number){}
    getName(): string {
       return this.name
    }
    getSize(): number {
        return this.size
    }
    ls(indent: number): void {
        console.log(" ".repeat(indent), this.name + ' ' + this.size)
    }

}

// 3. Composite: Directory

class DirectoryClass implements IFileSystemComponent{
    children: IFileSystemComponent[] = []
    constructor( public name: string) { }
    add(cmp: IFileSystemComponent) {
        this.children.push(cmp)
    }
    remove(cmp: IFileSystemComponent) {
        this.children = this.children.filter(o => o !== cmp)
    }
    getName(): string {
        return this.name
    }
    getSize(): number {
        let totalSize = 0
        this.children.forEach(o => {
            totalSize +=o.getSize()
        })
        return totalSize
    }
    ls(indent: number): void {
        console.log(" ".repeat(indent) + `${this.name}/`)

        this.children.forEach(o => {
            o.ls(indent + 2)
        })
    }

}
// === USAGE / TEST ===
// console.log("--- File System Challenge ---");

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
root.ls(5);
// Expected Output:
// root
//   home
//     user
//       resume.pdf
//       photo.jpg
//   config.sys

console.log(`Total Size: ${root.getSize()}`); // Expected: 1800
