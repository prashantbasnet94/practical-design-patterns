/**
 * CHALLENGE 4: CLOUD RESOURCE PROVISIONER (AWS Style)
 * 
 * CONTEXT:
 * "Spinning up a server" actually involves 5+ distinct cloud APIs:
 * IAM (Permissions) -> VPC (Networking) -> EC2 (Compute) -> EBS (Storage) -> RDS (Database).
 * 
 * GOAL:
 * Create a `CloudManagerFacade` with: `provisionServer(region, size)`.
 * 
 * REQUIREMENTS:
 * The facade must:
 * 1. Create a KeyPair (IAM).
 * 2. Create a Security Group (VPC).
 * 3. Launch the Instance (EC2) using the key & group.
 * 4. Attach a Volume (EBS).
 * 5. Return the Public IP.
 * 
 * If any step fails, it should try to rollback (optional complexity).
 */

class IAM {
    createKeyPair(name: string) { console.log(`[IAM] KeyPair '${name}' created`); return "key-123"; }
}

class VPC {
    createSecurityGroup(region: string) { console.log(`[VPC] SecGroup created in ${region}`); return "sg-999"; }
}

class EC2 {
    launch(key: string, sg: string, size: string) { console.log(`[EC2] ${size} instance launched`); return "i-555"; }
    getPublicIP(instanceId: string) { return "1.2.3.4"; }
}

class EBS {
    createVolume(size: number) { console.log(`[EBS] ${size}GB volume created`); return "vol-777"; }
    attach(volId: string, instanceId: string) { console.log(`[EBS] Volume ${volId} attached to ${instanceId}`); }
}

export class CloudManagerFacade {
    // TODO: Maintain API references

    constructor() {
        // Init service clients
    }

    provisionServer(region: string, size: string): string {
        console.log(`Starting provision in ${region}...`);

        // Orchestrate the complexity!

        return "1.2.3.4"; // Return IP
    }
}

// --- TEST CASE ---
try {
    const cloud = new CloudManagerFacade();
    const ip = cloud.provisionServer("us-east-1", "t3.micro");
    console.log("Server ready at:", ip);

} catch (e) {
    console.error(e);
}
