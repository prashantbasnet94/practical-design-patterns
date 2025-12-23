/**
 * PATTERN: ADAPTER
 * CONCEPT: STRUCTURAL
 * 
 * Analogy:
 * You have an iPhone (Lightning port) but only have a USB-C charger.
 * You need a "Dongle" (Adapter) to make them connect.
 */

// 1. The Target Interface (What the client expects)
// "I just want to plug into a USB-C port"
interface USBCPort {
    plugConnector(): void;
    charge(volts: number): void;
}

// 2. The Adaptee (The Incompatible Class)
// "I am an old Lightning cable"
class LightningCable {
    plugLightning(): void {
        console.log("Lightning connector plugged in.");
    }

    chargeLightning(volts: number): void {
        console.log(`Charging via Lightning at ${volts}V`);
    }
}

// 3. The Adapter (The Bridge)
// "I look like a USBCPort, but I internally use the LightningCable"
class LightningToUSBCAdapter implements USBCPort {
    private cable: LightningCable;

    constructor(cable: LightningCable) {
        this.cable = cable;
    }

    plugConnector(): void {
        console.log("Adapter: Converting USBC plug -> Lightning plug");
        this.cable.plugLightning();
    }

    charge(volts: number): void {
        console.log("Adapter: Converting USBC power -> Lightning power");
        this.cable.chargeLightning(volts);
    }
}

// 4. Client Code
// The client ONLY knows about USBCPort. It doesn't know it's actually using a Lightning cable.
function chargeLaptop(port: USBCPort) {
    port.plugConnector();
    port.charge(20);
}

// --- USAGE ---
console.log("--- Client: I have a USBC port ---");
const oldCable = new LightningCable();
// const direct = chargeLaptop(oldCable); // Error: Incompatible types!

console.log("--- Client: Using Adapter ---");
const adapter = new LightningToUSBCAdapter(oldCable);
chargeLaptop(adapter);
