import { IRequestProcessor } from './interface/index';
import { RequestProcessorDecorator } from "./request-processor.refactor";

type factories = new (next: IRequestProcessor) => RequestProcessorDecorator

export class PipelineBuilder {
    private decorators: factories[] = []
    add(decorator: factories) : PipelineBuilder{
        this.decorators.push(decorator)
        return this
    }
    build(core: IRequestProcessor): IRequestProcessor {
        let wrapped = core
        for (let i = this.decorators.length - 1; -1 < i; i--){
            let DecoratorClass = this.decorators[ i ]
            wrapped = new DecoratorClass(wrapped)
        }
        return wrapped
    }
}
