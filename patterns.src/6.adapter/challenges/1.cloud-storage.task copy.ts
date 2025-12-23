/**
 * CHALLENGE 1: SIMPLE ADAPTER
 *
 * Scenario:
 * Your application allows users to save files.
 * specificically, you are using the `ICloudStorage` interface.
 *
 * Problem:
 * You decided to switch to "AWS S3" (simulated below), but its SDK methods
 * don't match your interface.
 *
 * Task:
 * 1. Implement `S3Adapter` to make `MainApp` work with `AWSS3Service`.
 * 2. Run the code to verify.
 */

// --- 1. The Target Interface ---
interface ICloudStorage {
    upload(fileName: string): void;
    download(fileName: string): void;
}

// --- 2. The Incompatible Service (Adaptee) ---
class AWSS3Service {
    putObject(key: string) {
        console.log(`[AWS S3] Uploading object with key: ${key}`);
    }

    getObject(key: string) {
        console.log(`[AWS S3] Retrieving object with key: ${key}`);
    }
}

// --- 3. Client Code (Do not change this) ---
class MainApp {
    constructor(private storage: ICloudStorage) { }

    saveFile(name: string) {
        this.storage.upload(name);
    }

    loadFile(name: string) {
        this.storage.download(name);
    }
}

// --- YOUR WORK STARTS HERE ---
class S3Adapter implements ICloudStorage{
    constructor(private storage: AWSS3Service){}
     upload(fileName: string): void {
        this.storage.putObject(fileName)
     }
    download(fileName: string): void {
        this.storage.getObject(fileName)
    }
}
 /*
    1. adapter always implmemnt the exsiting interface
    2. adapter has a private var, which interface to the new service
    3. we pass object of the new class tot this adapter
    4. we pass the object of adapter call to the main app.

    newService -> adapter(newService) -> main(adapter(newService))


 */
// --- VERIFICATION ---
console.log("--- Challenge 1: Cloud Storage ---");

try {
    const s3 = new AWSS3Service();
    const adapter = new S3Adapter(s3);
    const app = new MainApp(adapter);

    app.saveFile("user_avatar.png");
    app.loadFile("user_avatar.png");

    console.log("Success! (If you see the logs above)");
} catch (e) {
    console.error("Error:", e);
}
