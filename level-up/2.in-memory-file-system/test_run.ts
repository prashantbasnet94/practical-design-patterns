import { FileSystem } from './index';

const fs = new FileSystem();

console.log("1. Initial ls '/':", fs.ls("/")); // Expected: []

console.log("2. mkdir '/a/b/c'");
fs.mkdir("/a/b/c");

console.log("3. addContentToFile '/a/b/c/d' with 'hello'");
fs.addContentToFile("/a/b/c/d", "hello");

console.log("4. ls '/':", fs.ls("/")); // Expected: ["a"]

console.log("5. readContentFromFile '/a/b/c/d':", fs.readContentFromFile("/a/b/c/d")); // Expected: "hello"

console.log("6. ls '/a/b/c':", fs.ls("/a/b/c")); // Expected: ["d"]

console.log("7. appending content to existing file...");
fs.addContentToFile("/a/b/c/d", " world");
console.log("   readContentFromFile:", fs.readContentFromFile("/a/b/c/d")); // Expected: "hello world"
