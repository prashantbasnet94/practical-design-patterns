export { };

/**
 * DECORATOR PATTERN CHALLENGE: Data Stream Processing
 *
 * SCENARIO:
 * You are building a data processing pipeline.
 * You write data to a `DataSource`.
 * You want to optionally COMPRESS and then ENCRYPT the data before writing it.
 *
 * GOAL:
 * - `IDataSource`: `writeData(data: string): void`
 * - `FileDataSource`: Simulates writing to a file (prints "Writing to file: {data}").
 * - `EncryptionDecorator`: Encrypts data (e.g., reverse string or base64) -> calls wrapped.
 * - `CompressionDecorator`: Compresses data (e.g., replaces " " with "") -> calls wrapped.
 *
 * TODO:
 * Implement the decorators so you can mix and match.
 */

interface IDataSource{
    writeData(data:string): void
}
class FileDataSource implements IDataSource{
    writeData(data: string): void {
        console.log("File: Writing Data")
    }
}

abstract class DataDecorator implements IDataSource{
    constructor(private source: IDataSource){}
    writeData(data: string): void {
        return this.source.writeData(data)
    }
}
// Implement EncryptionDecorator and CompressionDecorator...
class EncryptionDecorator extends DataDecorator{
    writeData(data: string): void {
        super.writeData(data)
    }
}

class CompressionDecorator extends DataDecorator{
    writeData(data: string): void {
        super.writeData(data)
    }
}

// === USAGE / TEST ===
const source = new FileDataSource();
const encrypted = new EncryptionDecorator(source);
const compressedAndEncrypted = new CompressionDecorator(encrypted);

compressedAndEncrypted.writeData("Hello World Design Patterns");
// // Flow: "Hello World Design Patterns" -> Compressed ("HelloWorldDesignPatterns") -> Encrypted -> Written
