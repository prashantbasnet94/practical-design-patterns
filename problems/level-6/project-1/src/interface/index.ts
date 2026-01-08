export interface IRequest {
    id: string;
    userId: string;
    token?: string;
    body: any;
    meta: {
        timestamp: number;
        sourceIp: string;
    };
}

export interface IResponse {
    statusCode: number;
    data: any;
    error?: string;
}

export interface IRequestProcessor{
    process(req: IRequest): IResponse
}