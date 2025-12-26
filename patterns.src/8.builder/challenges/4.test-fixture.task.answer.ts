import { UserTestFixture } from './4.test-fixture.task';
/**
 * CHALLENGE 4: TEST FIXTURE BUILDER (Object Mother)
 *
 * CONTEXT:
 * In tests, you often need valid objects with slight variations.
 * A "UserBuilder" helps keep tests clean by hiding the boilerplate of creating valid users.
 *
 * GOAL:
 * Create a `UserTestFixture` builder that creates `User` objects with valid defaults (randomized or static).
 *
 * REQUIREMENTS:
 * 1. `withAdminRole()`: sets role to 'ADMIN'.
 * 2. `withVerifiedEmail()`: sets `emailVerified` to true.
 * 3. `withBannedStatus()`: sets `banned` to true.
 * 4. `withBalance(amount)`: sets account balance.
 * 5. Default state: Role='USER', banned=false, emailVerified=false, balance=0.
 */


type tRole = 'ADMIN' | 'USER' | 'GUEST'
interface IUser {
    id: string
    username: string
    role: tRole
    emailVerified: boolean
    banned: boolean
    balance: number
}

class User implements IUser {
    id: string = ""
    username: string = ""
    role: "ADMIN" | "USER" | "GUEST" = "GUEST"
    emailVerified: boolean = false
    banned: boolean = false
    balance: number = -1
}

class UserBuilder {
    private user: User
    constructor() {
        this.user = new User()
    }
    setId(id: string): UserBuilder {
        this.user.id = id
        return this
    }
    setUserName(username: string): UserBuilder {
        this.user.username = username
        return this
    }
    setEmailVerification(status: boolean): UserBuilder {
        this.user.emailVerified = status
        return this
    }
    setBanned(ban: boolean): UserBuilder {
        this.user.banned = ban
        return this
    }
    setBalance(balance: number): UserBuilder {
        this.user.balance = balance
        return this
    }
    setRole(role: tRole): UserBuilder {
        this.user.role = role
        return this
    }
    build() {
        return this.user
    }
}
class UserTestFixture {

    withAdminRole(): User {

       return new UserBuilder()
            .setId('1')
            .setUserName('prashantbasnet94')
            .setBalance(100)
            .setBanned(false)
            .setEmailVerification(true)
           .setRole('ADMIN')
        .build()


    }
    withVerifiedEmail(): User {
        return new UserBuilder()
            .setEmailVerification(true)
            .setId("2")
            .setUserName("nishan")
            .build()


    }
}
let testFixture = new UserTestFixture()
console.log(testFixture.withAdminRole())
console.log(testFixture.withVerifiedEmail())