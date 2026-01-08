import { NewV2ApiClient } from './api-clients';

export interface IClient{
    getUsers(): {id:string, name:string}[]
}

export class ClientAdapter implements IClient{
    constructor(private clientApi: NewV2ApiClient){}
    getUsers(): { id: string; name: string; }[] {
        return this.clientApi.fetchUserData().data.map(o => {
            return ({
                id: o.userId, name: o.userName
            })
        })
    }
}