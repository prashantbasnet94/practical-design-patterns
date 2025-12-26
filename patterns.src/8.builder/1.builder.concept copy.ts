/**
 * PATTERN: BUILDER
 *
 * CONCEPT:
 * The Builder pattern separates the construction of a complex object from its representation.
 * It allows you to produce different types and representations of an object using the same construction code.
 *
 * WHY USE IT?
 * 1. Simplicity: Avoids "telescoping constructors" (constructors with many parameters, some optional).
 * 2. Readability: Method chaining (`.setX().setY()`) makes code read like a sentence.
 * 3. Immutability: You can build an object step-by-step and then freeze it.
 *
 * -- EXAMPLE 1: SIMPLE BUILDER (Chaining) --
 * Most common in modern TypeScript/JS (like ORMs, Request builders).
 */

class Computer {
    constructor(
        public cpu: string,
        public ram: string,
        public storage: string,
        public gpu?: string // Optional
    ) { }

    describe(): void {
        console.log(`Computer: [CPU: ${this.cpu}, RAM: ${this.ram}, Storage: ${this.storage}, GPU: ${this.gpu || 'None'}]`);
    }
}

class ComputerBuilder {
    private cpu: string = 'default-cpu'
    private ram: string = 'default-ram'
    private storage: string = 'default-storage'
    private gpu?: string

    setCpu(cpu: string): ComputerBuilder {
        this.cpu = cpu
        return this
    }
    setRam(ram: string): ComputerBuilder {
        this.ram = ram
        return this
    }
    setStorage(storage: string): ComputerBuilder {
        this.storage = storage
        return this
    }
    setGpu(gpu: string): ComputerBuilder {
        this.gpu = gpu
        return this
    }
    build() {
        return new Computer(this.cpu, this.ram, this.storage, this.gpu)
    }
}



class ComputerDirector {
    constructor(public builder: ComputerBuilder) { }
    constructorGamingPc(): Computer {
        return this.builder.setCpu('Intel i9')
            .setRam('32GB')
            .setStorage('1TB')
            .setGpu('RTX 4090')
            .build()
    }
    constructOfficePC(): Computer{
        return this.builder
            .setCpu('Intel i5')
            .setRam('16GB')
            .setStorage('512GB')
            .build()
    }
}

let gamingPc = new ComputerBuilder()
    .setCpu('Intel i9')
    .setRam('32GB')
    .setStorage('1TB')
    .setGpu('RTX 4090')
    .build()


gamingPc.describe()

// USAGE
const director = new ComputerDirector(new ComputerBuilder());
const officePc = director.constructOfficePC();
officePc.describe();
