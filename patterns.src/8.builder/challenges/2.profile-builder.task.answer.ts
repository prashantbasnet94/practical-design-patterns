/**
 * CHALLENGE 2: COMPLEX USER PROFILE BUILDER
 *
 * INSTRUCTIONS:
 * Create a `UserProfile` class that has many properties (mandatory and optional).
 * Using a constructor for 10+ fields is messy. Use the Builder pattern to simplify creation.
 *
 * PROPERTIES:
 * - Mandatory: username, email
 * - Optional: firstName, lastName, age, phoneNumber, address, bio, themePreference, notificationSettings
 *
 * REQUIREMENTS:
 * 1. Validations:
 *    - Age cannot be negative.
 *    - Phone number must be 10 digits (simple check).
 * 2. `build()` should throw an error if mandatory fields are missing.
 */
class UserProfile {
    public firstName: string = ""
    public lastName: string = ""
    public age: number = -1
    public location = ""
    public sex?: string

    getDescription(): string {
        let des = `first Name is : ${this.firstName}, lastName is ${this.lastName}, age is ${this.age}, and finally location is: ${this.location}, ${this.sex}`
        return des
    }
}


class Builder {
    private userProfile: UserProfile
    constructor() {
        this.userProfile = new UserProfile()
    }
    setFirstName(fName: string): Builder {
        this.userProfile.firstName = fName
        return this
    }
    setLastName(lName: string): Builder {
        this.userProfile.lastName = lName
        return this
    }
    setAge(age: number): Builder {
        this.userProfile.age = age
        return this
    }
    setLocation(location: string): Builder {
        this.userProfile.location = location
        return this
    }
    setSex(sex: string) {
        this.userProfile.sex = sex
        return this
    }
    build() {
        return this.userProfile
    }
}

let builder = new Builder()
let user = builder
    .setFirstName("prashant")
    .setLastName("basnet")
    .setAge(26)
    .setLocation("Lafayette")
    .setSex("Male")
    .build()

let ajay = builder
    .setFirstName("AJ")
    .setLastName("Banstola")
    .setAge(28)
    .setLocation("lafayette")
    .setSex("Male")
    .build()

console.log(user.getDescription())
console.log(ajay.getDescription())
console.log()

// which can be further solidified:

class People {
    constructor(private builder: Builder) { }
    constructPrashant(): UserProfile {
        return this.builder
            .setFirstName("prashant")
            .setLastName("basnet")
            .setAge(26)
            .setLocation("Lafayette")
            .setSex("Male")
            .build()
    }
    constructAj(): UserProfile {
        return this.builder
            .setFirstName("AJ")
            .setLastName("Banstola")
            .setAge(28)
            .setLocation("lafayette")
            .setSex("Male")
            .build()
    }

}

console.log(new People(new Builder()).constructAj().getDescription())
console.log(new People(new Builder()).constructPrashant().getDescription())