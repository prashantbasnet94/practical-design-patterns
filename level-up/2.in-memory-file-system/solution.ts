export class FileSystem {
    constructor() {
        // Initialize root directory
    }

    ls(path: string): string[] {
        return [];
    }

    mkdir(path: string): void {
        
    }

    addContentToFile(filePath: string, content: string): void {
        
    }

    readContentFromFile(filePath: string): string {
        return "";
    }
}

// --- Test Area ---
const fs = new FileSystem();
console.log("--- Starting Test ---");
fs.mkdir("/a/b/c");
console.log("Created /a/b/c");
fs.addContentToFile("/a/b/c/file.txt", "Hello World");
console.log("Read Content:", fs.readContentFromFile("/a/b/c/file.txt")); // Expected: Hello World
console.log("List /a/b/c:", fs.ls("/a/b/c")); // Expected: ["file.txt"]
