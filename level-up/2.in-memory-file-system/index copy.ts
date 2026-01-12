import { set } from 'better-auth';
/*
const fs = new FileSystem();

fs.ls("/"); // []
fs.mkdir("/a/b/c");
fs.addContentToFile("/a/b/c/d", "hello");
fs.ls("/"); // ["a"]
fs.readContentFromFile("/a/b/c/d"); // "hello"


*/

interface IComp{
    name: string
    addContentToFile(path: string, content: string): void
    ls(path: string): string[]
    readContentFromFile(fName:string): string
}


export class FileLeaf implements IComp{
    name = ""
    constructor(name:string) {
        this.name = name
    }
    addContentToFile(path: string, content: string): void {
        throw new Error("Method not implemented.")
    }
    ls(path: string): string[] {
        throw new Error("Method not implemented.")
    }
    readContentFromFile(fName: string): string {
        throw new Error("Method not implemented.")
    }

}



export class Dir implements IComp{
    name = ""
    cmps: IComp[] = []
    map : Map<string, any> = new Map()
    constructor(name: string) {
        this.name = name
    }
    mkdir(path: string): void {
        let paths = path.split('/')
        for (let p of paths) {
            if(!this.map.has(p)){
                this.map.set(p, new Map())
            }
            this.map.get(p).set()
        }
    }
    addContentToFile(path: string, content: string): void {
        throw new Error("Method not implemented.")
    }
    ls(path: string): string[] {
        throw new Error("Method not implemented.")
    }
    readContentFromFile(fName: string): string {
        throw new Error("Method not implemented.")
    }


}