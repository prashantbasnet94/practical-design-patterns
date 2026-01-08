import { Document } from './document';

const doc = new Document("Initial Content");

console.log(`[${doc.getStatus()}] Modifying content...`);
doc.modify("Updated Content");

console.log(`[${doc.getStatus()}] Submitting for review...`);
doc.submitForReview();

console.log(`[${doc.getStatus()}] Trying to modify... (Should fail)`);
doc.modify("Hacked Content");

console.log(`[${doc.getStatus()}] Approving...`);
doc.approve();

console.log(`[${doc.getStatus()}] Archiving...`);
doc.archive();

console.log(`[${doc.getStatus()}] Trying to submit for review... (Should fail)`);
doc.submitForReview();
