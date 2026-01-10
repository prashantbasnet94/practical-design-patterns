export interface IDocumentState{
    // these are the events that are tiggered to update the state

    submitForReview(document: IDocument): void
    reject(document: IDocument): void
    approve(docuement: IDocument): void
    archive(docuemnt: IDocument): void
    publish(document: IDocument): void
    startReview(document: IDocument): void
}


export interface IDocument{
    content: string
    state: IDocumentState
    setState(state: IDocumentState):void
    //events
    submitForReview(): void
    reject(): void
    approve(): void
    archive(): void
    publish(): void

    modify(newContent: string): void

    //features of document:
    onSubmission(): void
    onRejection(): void
    onApproval(): void
    onArchival(): void
    onReviewSubmission(): void
    onPublish():void
}



