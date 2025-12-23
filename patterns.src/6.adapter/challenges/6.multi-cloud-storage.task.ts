/**
 * CHALLENGE 6: MULTI-CLOUD STORAGE (VENDOR AGNOSTICISM)
 *
 * Scenario:
 * Your CTO wants the app to be "Cloud Agnostic".
 * We should be able to switch from AWS to Google Cloud without rewriting our app.
 *
 * Problem:
 * - AWS S3 uses `buckets` and `keys`.
 * - Google Cloud Storage (GCS) uses `buckets` and `files` (blobs).
 *
 * Task:
 * 1. Implement `S3Adapter` and `GCSAdapter`.
 * 2. They must align with `IStorageService`.
 */

// --- 1. Target Interface (The "Golden Standard") ---
interface IStorageService {
    saveFile(fileName: string, content: string): void;
    getFile(fileName: string): string;
}

// --- 2. Adaptees (The Incompatible Cloud SDKs) ---

class AwsS3SDK {
    uploadToBucket(key: string, data: string) {
        console.log(`[AWS] Uploading to S3: ${key}`);
    }
    getFromBucket(key: string): string {
        console.log(`[AWS] Downloading from S3: ${key}`);
        return "AWS_CONTENT";
    }
}

class GoogleCloudStorageSDK {
    uploadBlob(name: string, stream: string) {
        console.log(`[GCP] Uploading blob: ${name}`);
    }
    downloadBlob(name: string): string {
        console.log(`[GCP] Downloading blob: ${name}`);
        return "GCP_CONTENT";
    }
}

// --- 3. Client Code (The "Vendor Neutral" App) ---
class CloudApp {
    constructor(private storage: IStorageService) { }

    backupData(data: string) {
        this.storage.saveFile("backup.txt", data);
    }

    restoreData() {
        return this.storage.getFile("backup.txt");
    }
}


// --- YOUR WORK STARTS HERE ---

class S3Adapter implements IStorageService {
    constructor(private s3: AwsS3SDK) { }

    saveFile(fileName: string, content: string): void {
        // TODO: Adapt to s3.uploadToBucket
    }

    getFile(fileName: string): string {
        // TODO: Adapt to s3.getFromBucket
        return "";
    }
}

class GCSAdapter implements IStorageService {
    constructor(private gcs: GoogleCloudStorageSDK) { }

    saveFile(fileName: string, content: string): void {
        // TODO: Adapt to gcs.uploadBlob
    }

    getFile(fileName: string): string {
        // TODO: Adapt to gcs.downloadBlob
        return "";
    }
}


// --- VERIFICATION ---
console.log("--- Challenge 6: Multi-Cloud Storage ---");

const myAppAWS = new CloudApp(new S3Adapter(new AwsS3SDK()));
myAppAWS.backupData("Critical Data");

const myAppGCP = new CloudApp(new GCSAdapter(new GoogleCloudStorageSDK()));
myAppGCP.backupData("Critical Data");

// Expected Output:
// [AWS] Uploading to S3: backup.txt
// [GCP] Uploading blob: backup.txt
