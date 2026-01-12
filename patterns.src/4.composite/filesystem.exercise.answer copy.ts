import { number } from 'better-auth';
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

interface IFileSystemComp{
    name:string
    getName(): string
    getSize(): number
    ls(indent: number): void
}

export class FileClassLeaf implements IFileSystemComp{
    name : string
    constructor(name: string, private size: number) {
        this.name = name
    }
    getName(): string {
        return this.name
    }
    getSize(): number {
        return this.size
    }
    ls(indent: number): void {
        console.log(" ".repeat(indent), this.name)
    }
}

export class Dir implements IFileSystemComp{
    name = ""
    private comps: IFileSystemComp[] = []
    constructor(name: string) {
        this.name = name
    }

    getName(): string {
        return this.name
    }
    getSize(): number {
        let size = 0
        for (let file of this.comps) {
            size += file.getSize()
        }
        return size
    }
    ls(indent: number): void {
        console.log(" ".repeat(indent) +' dir: ' +  this.name)
        for (let file of this.comps) {
           file.ls(indent)
        }
    }

    add(cmp: IFileSystemComp) {
         this.comps.push(cmp)
    }
    remove(cmp: IFileSystemComp) {
        this.comps = this.comps.filter(o => o !== cmp)
    }
}