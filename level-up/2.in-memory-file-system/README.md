# In-Memory File System

## Objective
Design a data structure that simulates an in-memory file system. This is a classic interview question that tests your understanding of **Trees (Tries)** and **Object Oriented Design**.

## Functional Requirements

1.  **`ls(path: string): string[]`**
    *   If `path` is a directory, return a list of all children (files and subdirectories) sorted lexicographically.
    *   If `path` is a file, return a list containing just that file's name.

2.  **`mkdir(path: string): void`**
    *   Creates a new directory at the given path.
    *   If the parent directories don't exist, they should be created automatically.

3.  **`addContentToFile(filePath: string, content: string): void`**
    *   If the file doesn't exist, create it.
    *   Append the content to the file.

4.  **`readContentFromFile(filePath: string): string`**
    *   Return the content of the file.

## Example

```typescript
const fs = new FileSystem();

fs.ls("/"); // []
fs.mkdir("/a/b/c");
fs.addContentToFile("/a/b/c/d", "hello");
fs.ls("/"); // ["a"]
fs.readContentFromFile("/a/b/c/d"); // "hello"
```
