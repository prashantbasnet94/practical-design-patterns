export interface IUser{
    users: Map<string, {name:string}>
    addUser(userid: string, name:string): void
    getUser(userId: string):  {name:string} | undefined
}

export class User implements IUser{
    public static instance: User
    users = new Map()
    constructor(){
        this.users.set('user1', { name: 'Alice' });
    }

    addUser(userid: string, name: string): void {
        this.users.set(userid, {name})
    }
    getUser(userId: string){
        return this.users.get(userId)
    }
    static getInstance(){
        if(!User.instance){
            User.instance = new User()
        }
        return User.instance
    }
}