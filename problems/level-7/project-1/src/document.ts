export class Document {
    public content: string;
    
    // State Flags - The Nightmare
    private isDraft: boolean = true;
    private isInReview: boolean = false;
    private isPublished: boolean = false;
    private isRejected: boolean = false;
    private isArchived: boolean = false;

    constructor(content: string) {
        this.content = content;
    }

    public modify(newContent: string) {
        if (this.isPublished || this.isArchived) {
            console.log("Error: Cannot modify published or archived documents.");
            return;
        }
        if (this.isInReview) {
            console.log("Error: Cannot modify document while in review.");
            return;
        }
        console.log("Document modified.");
        this.content = newContent;
        // If it was rejected, modifying it brings it back to draft
        if (this.isRejected) {
            this.isRejected = false;
            this.isDraft = true;
            console.log("State changed: Rejected -> Draft");
        }
    }

    public submitForReview() {
        if (this.isInReview) {
            console.log("Error: Already in review.");
            return;
        }
        if (this.isPublished || this.isArchived) {
            console.log("Error: Cannot submit published or archived documents.");
            return;
        }
        
        this.isDraft = false;
        this.isInReview = true;
        this.isRejected = false;
        console.log("State changed: Draft -> Review");
    }

    public approve() {
        if (!this.isInReview) {
            console.log("Error: Can only approve documents currently in review.");
            return;
        }
        
        this.isInReview = false;
        this.isPublished = true;
        console.log("State changed: Review -> Published");
    }

    public reject() {
        if (!this.isInReview) {
            console.log("Error: Can only reject documents currently in review.");
            return;
        }
        
        this.isInReview = false;
        this.isRejected = true;
        console.log("State changed: Review -> Rejected");
    }

    public archive() {
        if (!this.isPublished) {
            console.log("Error: Can only archive published documents.");
            return;
        }

        this.isPublished = false;
        this.isArchived = true;
        console.log("State changed: Published -> Archived");
    }

    public getStatus(): string {
        if (this.isDraft) return "Draft";
        if (this.isInReview) return "In Review";
        if (this.isPublished) return "Published";
        if (this.isRejected) return "Rejected";
        if (this.isArchived) return "Archived";
        return "Unknown State";
    }
}
