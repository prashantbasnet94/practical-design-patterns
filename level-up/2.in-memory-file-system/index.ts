/*
const fs = new FileSystem();

fs.ls("/"); // []
fs.mkdir("/a/b/c");
fs.addContentToFile("/a/b/c/d", "hello");
fs.ls("/"); // ["a"]
fs.readContentFromFile("/a/b/c/d"); // "hello"
*/

// 1. Leaf Node (File)
class FileLeaf {
    isFile = true; // Helper tag
    content = "";

    constructor(public name: string) {}
}

// 2. Composite Node (Directory)
class Dir {
    isFile = false; // Helper tag
    // Using a Map allows O(1) lookup for children by name
    children = new Map<string, Dir | FileLeaf>();

    constructor(public name: string) {}
}

// 3. Main System (The API)
export class FileSystem {
    private root: Dir;

    constructor() {
        this.root = new Dir("/");
    }

    ls(path: string): string[] {
        const node = this.traverse(path);
        
        // If path doesn't exist
        if (!node) return [];

        // If it's a file, just return its name
        if (node.isFile) {
            return [node.name];
        }

        // If it's a directory, return sorted keys
        const dir = node as Dir;
        return Array.from(dir.children.keys()).sort();
    }

    mkdir(path: string): void {
        const parts = this.splitPath(path);
        let current = this.root;

        for (const part of parts) {
            // If child doesn't exist, create it
            if (!current.children.has(part)) {
                current.children.set(part, new Dir(part));
            }
            
            // Move pointer down
            current = current.children.get(part) as Dir;
        }
    }

    addContentToFile(filePath: string, content: string): void {
        const parts = this.splitPath(filePath);
        // The last part is the file name, the rest is the directory path
        const fileName = parts.pop()!;
        
        // Traverse to the parent directory (create dirs if they don't exist, per reqs usually? 
        // The prompt implies simple traversal, but robust mkdir logic helps)
        let current = this.root;
        for (const part of parts) {
            if (!current.children.has(part)) {
                 current.children.set(part, new Dir(part));
            }
            current = current.children.get(part) as Dir;
        }

        // Now handle the file itself
        if (!current.children.has(fileName)) {
            current.children.set(fileName, new FileLeaf(fileName));
        }

        const file = current.children.get(fileName) as FileLeaf;
        file.content += content;
    }

    readContentFromFile(filePath: string): string {
        const node = this.traverse(filePath);
        if (!node || !node.isFile) {
            throw new Error(`File not found: ${filePath}`);
        }
        return (node as FileLeaf).content;
    }

    // --- Helpers ---

    // Cleanly split path: "/a//b/c/" -> ["a", "b", "c"]
    private splitPath(path: string): string[] {
        return path.split('/').filter(p => p.length > 0);
    }

    // Walk the tree to find a node
    private traverse(path: string): Dir | FileLeaf | null {
        if (path === "/") return this.root;
        
        const parts = this.splitPath(path);
        let current: Dir | FileLeaf = this.root;

        for (const part of parts) {
            // If current is a file, we can't go deeper
            if (current.isFile) return null;

            const dir = current as Dir;
            if (!dir.children.has(part)) {
                return null;
            }
            current = dir.children.get(part)!;
        }
        return current;
    }
}