import { IDocument, IDocumentState } from "./document.interface";

export class Document implements IDocument {
    content: string;
    state: IDocumentState;
    constructor(content: string) {
        this.content = content
        this.state = new DraftState()
    }

    setState(state: IDocumentState): void {
        this.state = state
    }
    archive(): void {
        this.state.archive(this)
    }
    publish(): void {
        this.state.publish(this)
    }
    submitForReview(): void {
        this.state.submitForReview(this)
    }
    reject(): void {
        this.state.reject(this)
    }
    approve(): void {
        this.state.approve(this)
    }
    modify(newContent: string): void {
        console.log("modifying content data")
        this.content = newContent
    }
    onSubmission(): void {
        console.log("Draft to be submitted for review")
    }
    onRejection(): void {
        console.log("Submission Result:: Draft is rejected!")
    }
    onApproval(): void {
        console.log("Submission Result: Draft is approved!")
    }
    onArchival(): void {
        console.log(" Arhiveing this post")
    }
    onReviewSubmission(): void{
        console.log("Reviewing Submission: please wait!")
    }
    onPublish(): void{
        console.log("Publishing your post!")
    }
}

class DraftState implements IDocumentState {
    startReview(document: IDocument): void {
       console.log("Cannot review in draft.");
    }
    archive(docuemnt: IDocument): void {
        console.log("Cannot archive in draft.");
    }
    publish(document: IDocument): void {
        console.log("Cannot publish from draft");
    }
    submitForReview(document: IDocument): void {
        document.onReviewSubmission()
        document.setState(new ReviewState())
    }
    reject(document: IDocument): void {
        console.log("Cannot reject in draft")
    }
    approve(docuement: IDocument): void {
        console.log("Connot apporve in draft")
    }

}
class ReviewState implements IDocumentState {
    startReview(document: IDocument): void {
        console.log("Cannot review twice")
    }
    submitForReview(document: IDocument): void {
       console.log("Cannot submit for review twice")
    }
    reject(document: IDocument): void {
        document.onRejection()
        document.setState(new RejectedState())
    }
    approve(docuement: IDocument): void {
        docuement.onApproval()
        docuement.setState(new ApprovedState())
    }
    archive(docuemnt: IDocument): void {
        console.log("Cannot archive from review.");
    }
    publish(document: IDocument): void {
        console.log("Cannot publish from review");
    }

}

class RejectedState implements IDocumentState {
    startReview(document: IDocument): void {
        console.log("cannot review after rejected")
    }
    submitForReview(document: IDocument): void {
        console.log("Cannot Submit after rejected");
    }
    reject(document: IDocument): void {
        console.log("Cannot reject twice");
    }
    approve(docuement: IDocument): void {
        console.log("Cannot approve after rejection");
    }
    archive(docuemnt: IDocument): void {
        console.log("Cannot archive after rejection.");
    }
    publish(document: IDocument): void {
        console.log("Cannot publish after rejection");
    }
}

class ApprovedState implements IDocumentState {
    startReview(document: IDocument): void {
       console.log("cannot review after apporval")
    }
    submitForReview(document: IDocument): void {
        console.log("Cannot approve multiple times")
    }
    reject(document: IDocument): void {
        console.log("Cannot reject multiple times")
    }
    approve(docuement: IDocument): void {
        console.log("Cannot approve multiple times")
    }
    archive(docuemnt: IDocument): void {
        console.log("Cannot archive from Approved directly.");
    }
    publish(document: IDocument): void {
        document.onPublish()
        document.setState(new PublishedState())
    }
}
class PublishedState implements IDocumentState {
    startReview(document: IDocument): void {
       console.log("Cannot review after published")
    }
    submitForReview(document: IDocument): void {
        console.log("Cannot Review again for published draft");
    }
    reject(document: IDocument): void {
        console.log("Cannot reject once published.");
    }
    approve(docuement: IDocument): void {
        console.log("Cannot approve again once published.");
    }
    archive(docuemnt: IDocument): void {
        docuemnt.onArchival()
        docuemnt.setState(new ArchivedState())
    }
    publish(document: IDocument): void {
       console.log("Cannot publish same docuemnt twice")
    }
}

class ArchivedState implements IDocumentState {
    startReview(document: IDocument): void {
        console.log("cannot review after arvhived")
    }
    submitForReview(document: IDocument): void {
        console.log("Cannot submit for review once archived")
    }
    reject(document: IDocument): void {
        console.log("Cannot rejct once archived")
    }
    approve(docuement: IDocument): void {
        console.log("Cannot approve again once archived")
    }
    archive(docuemnt: IDocument): void {
       console.log("Cannot archive twice")
    }
    publish(document: IDocument): void {
        console.log("Cannot published again once archived")
    }
}


let document = new Document("Master Diploma")
console.log("\n Prashant Basnet")
document.submitForReview()
document.approve()
document.publish()
document.archive()

document = new Document("Blog Post 200k")
console.log("\n Hacker 85")
document.submitForReview()
document.approve()
document.modify("Metaprogramming to efficiency")
document.publish()
document.archive()



document = new Document("5 problems 1 solution")
console.log("\n Leetcoder ")
document.submitForReview()
document.reject()
document.publish()
document.archive()


document = new Document("Python is cool")
console.log("\n AJ ")
document.modify("God of JS")
document.submitForReview()
document.approve()
document.publish()


document = new Document("ML/AI is fun")
console.log("\n Nishan ")
document.submitForReview()
document.publish()