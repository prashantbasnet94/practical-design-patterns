import { IUser } from './../../problems/level-3/project-1/src/module/user';
interface IRateLimiter{
    allowRequest(user: string):boolean
}

interface IUserHistory{
    count: number
    startTime: number
}

export class RateLimiter implements IRateLimiter{
    map :Map<string, IUserHistory>= new Map()
    constructor(protected limit: number, protected time: number) { }

    allowRequest(user: string): boolean {


        /*
         1. create a map for multiple users
               {
                userId: {count, startTime}
                }
        2. create a userHistory for new users {count: 0, startTime: now}
        3. get the userHistory {count, startTime}
        4. if the window time has already passed the reset the count and startTime to now
        5. now check the limit (history.count < this.limit)
            a. increment history.count
            b. return true
        6. return false by default
        */
        let now = Date.now()
        // intialize user if new
        if (!this.map.get(user)) {
            this.map.set(user, {count: 0, startTime: now })
        }

        // acoount for prev req
        const history = this.map.get(user) as IUserHistory

        // reset the history if the time window has passed

        if (this.time < now - history.startTime) {
            history.count = 0
            history.startTime = now
        }

        // now check the limit

        if ( history.count < this.limit) {
            history.count++
            return true
        }

        return false

    }
}



const limiter = new RateLimiter(2, 1000); // 2 requests per 1 second
console.log("Request 1:", limiter.allowRequest("A")); // true
console.log("Request 2:", limiter.allowRequest("A")); // true
console.log("Request 3:", limiter.allowRequest("A")); // false

setTimeout(() => {
    console.log("Request 4 (after 1s):", limiter.allowRequest("A")); // true
}, 1100);
