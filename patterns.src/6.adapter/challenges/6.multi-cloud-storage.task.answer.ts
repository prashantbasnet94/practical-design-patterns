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
class AwsS3{
    putObject(key: string) {
        let data = "AWS: uploading object with key: " +  key
        console.log(data)
        return data
    }
    getObject(key: string) {
        let data = "AWS: featching object with key: " + key
        console.log(data)
        return data
    }
}

class GCPBlob{
    addFile(key: string) {
        let data = "GCP: upload file, " + key
        console.log(data)
        return data
    }
    getFile(key: string) {
        let data = 'GCP: get file '+ key
        console.log(data)
        return data
    }
}



interface ICloud{
    getItem(key: string): string
    setItem(key: string): string
}

class AwsAdapter implements ICloud{
    constructor(private aws: AwsS3){}
    getItem(key: string): string {
        return this.aws.getObject(key)
    }
    setItem(key: string): string {
        return this.aws.putObject(key)
    }
}

class GcpAdapter implements ICloud{
    constructor(private gcp: GCPBlob) { }
    getItem(key: string): string {
        return this.gcp.getFile(key)
    }
    setItem(key: string): string {
        return this.gcp.addFile(key)
    }
}

class CloudAgnoticApp {
    constructor(private cloud: ICloud){}
    handleUpload(key: string){
       return this.cloud?.setItem(key)
    }
    handleDownload(key:string) {
        return this.cloud?.getItem(key)
    }
}

let aws = new AwsS3()
let awsAdapter = new AwsAdapter(aws)
let gcp = new GCPBlob()
let gcpAdapter = new GcpAdapter(gcp)

let app = new CloudAgnoticApp(awsAdapter)
let app2 = new CloudAgnoticApp(gcpAdapter)



