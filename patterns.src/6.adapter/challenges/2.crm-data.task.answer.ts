/**
 * CHALLENGE 2: DATA TRANSFORMATION ADAPTER
 *
 * Scenario:
 * Your app displays a list of users. It uses the `IUserSource` interface.
 *
 * Problem:
 * You need to fetch users from a `LegacyCRMSystem`.
 * - Your app expects: `fullName` (string).
 * - Legacy CRM provides: `firstName` and `lastName` (separate strings).
 *
 * Task:
 * Implement `CRMAdapter` to concatenate the names correctly.
 */

// --- 1. Target Interface ---
interface IUserSource {
    getUsers(): { fullName: string }[];
}

class CRMApp implements IUserSource{
    constructor(private source: IUserSource){}
    getUsers(): { fullName: string; }[]  {
        return this.source.getUsers()
    }
}

interface ILegacyCRMSystem{
    getAllContacts(): {firstName: string, lastName:string}[]
}
class LegacyCRMSystem implements ILegacyCRMSystem {
    getAllContacts(): { firstName: string; lastName: string; }[] {
       return [
            { firstName: "John", lastName: "Doe" },
            { firstName: "Alice", lastName: "Smith" }
        ];
    }


}

class LegacyAdapter implements IUserSource{
    constructor(private crm: ILegacyCRMSystem){}
    getUsers(): { fullName: string; }[] {
        let data = this.crm.getAllContacts()
        let result = data.map(o =>( { fullName: o.firstName + ' ' + o.lastName }))
        return result
    }

}

let legacy = new LegacyCRMSystem()
let ourAdapter = new LegacyAdapter(legacy)
let mainApp = new CRMApp(ourAdapter)

/*
    1. our new adapter always implement exiting system
    2. integating system is always the parm to construcutr
    3.
*/