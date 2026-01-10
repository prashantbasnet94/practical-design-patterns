export interface IDocuement{
    isDraft: boolean
    isInReview: boolean
    isPublished: boolean
    isRejected: boolean
    isArchived: boolean
    modify (newContent: string) : string
}
export class Document implements IDocuement{
    constructor(public content: string) { }
    public isDraft: boolean = true
    public isInReview: boolean = false
    public isPublished: boolean = false
    public isRejected: boolean = false
    public isArchived: boolean = false
    modify(newContent: string): string {
        this.content = newContent
        return this.content
    }
}

abstract class DocumentDecorator implements IDocuement{
    constructor(private document: IDocuement) { }
    public isDraft: boolean = true
    public isInReview: boolean = false
    public isPublished: boolean = false
    public isRejected: boolean = false
    public isArchived: boolean = false
    modify(newContent: string): string {
        return this.document.modify(newContent)
    }
}

export class DocumentSubmission extends DocumentDecorator{
    submitForReview() {
        if(super.ins)
    }
}