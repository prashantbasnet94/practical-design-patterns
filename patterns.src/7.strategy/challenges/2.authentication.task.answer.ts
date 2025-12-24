/**
 * CHALLENGE 2: AUTHENTICATION SYSTEM (The "Passport.js" Pattern)
 *
 * Scenario:
 * You are building a secure login system.
 * Users want to login with:
 * 1. Username/Password (Standard)
 * 2. Google OAuth (Social)
 * 3. Magic Link (Passwordless)
 *
 * Problem:
 * Each method requires different parameters (user/pass vs token vs email).
 * How do we create a unified `login()` interface?
 *
 * Hint:
 * You might need a `Credentials` type that is flexible, or standard method signatures.
 *
 * Task:
 * 1. Create `IAuthStrategy`.
 * 2. Implement `LocalStrategy` (checks mock DB).
 * 3. Implement `GoogleStrategy` (simulates API call).
 * 4. Implement `MagicLinkStrategy` (simulates email send).
 */

class Standard{
    login(email: string, password: string): boolean{
        return true
    }
}
class OAuthGoogle{
    login(token: string): boolean {
        return true
    }
}
class MagicLink{
    login(email : string): string {
        return "abcd"
    }
}
interface IAuthStrategy{
    login(): boolean
}

class LocalStrategy implements IAuthStrategy{
    constructor(private email: string, private password: string) { }
    login(): boolean {
        console.log('LOCAL_STRATEGY , LOCAL_AUTH, verifying email & password', this.email, this.password)
        return true
    }
}

class GoogleStrategy implements IAuthStrategy{
    constructor(private token: string){}
    login(): boolean {
        console.log('GOOGLE_STRATEGY, OAUTH, checking token', this.token)
        return false
    }
}
class MagicLinkStrategy implements IAuthStrategy{
    constructor(private token: string){}
    login() {
        console.log('MAGIC_LINK_STRATEGY, checking token ', this.token)
        return true
    }
}


class Authentication{
    constructor(private authStrategy: IAuthStrategy) { }
    setStrategy(strategy: IAuthStrategy) {
        this.authStrategy = strategy
    }
    authenticate() {
        console.log("performing authentication ")
        this.authStrategy.login()
    }
}

let auth = new Authentication(new LocalStrategy('prashantbasnet@gmail.com', 'password12'))
auth.authenticate()

auth.setStrategy(new GoogleStrategy('google.com?token=1234'))
auth.authenticate()

auth.setStrategy(new MagicLinkStrategy('https://abcd.com?token=4321'))
auth.authenticate()