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
    private cpu: string = "default-cpu";
    private ram: string = "default-ram";
    private storage: string = "default-storage";
    private gpu?: string;

    setCPU(cpu: string): ComputerBuilder {
        this.cpu = cpu;
        return this; // Return 'this' for chaining
    }

    setRAM(ram: string): ComputerBuilder {
        this.ram = ram;
        return this;
    }

    setStorage(storage: string): ComputerBuilder {
        this.storage = storage;
        return this;
    }

    setGPU(gpu: string): ComputerBuilder {
        this.gpu = gpu;
        return this;
    }

    build(): Computer {
        // Validation logic can go here (e.g., must have CPU)
        return new Computer(this.cpu, this.ram, this.storage, this.gpu);
    }
}

// USAGE
const gamingPc = new ComputerBuilder()
    .setCPU("Intel i9")
    .setRAM("32GB")
    .setStorage("1TB NVMe")
    .setGPU("RTX 4090")
    .build();

gamingPc.describe();


/**
 * -- EXAMPLE 2: DIRECTOR (Orchestrator) --
 * Less common in JS/TS but classic GoF. 
 * A "Director" class controls the order of construction steps.
 */

class ComputerDirector {
    private builder: ComputerBuilder;

    constructor(builder: ComputerBuilder) {
        this.builder = builder;
    }

    constructGamingPC(): Computer {
        return this.builder
            .setCPU("AMD Ryzen 9")
            .setRAM("64GB")
            .setStorage("2TB SSD")
            .setGPU("RX 7900 XTX")
            .build();
    }

    constructOfficePC(): Computer {
        return this.builder
            .setCPU("Intel i5")
            .setRAM("16GB")
            .setStorage("512GB SSD")
            .build();
    }
}

// USAGE
const director = new ComputerDirector(new ComputerBuilder());
const officePc = director.constructOfficePC();
officePc.describe();
