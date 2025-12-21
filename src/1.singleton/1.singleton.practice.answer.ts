/**
 * PATTERN: SINGLETON
 * 
 * Definition: 
 * Ensures a class has only one instance and provides a global point of access to it.
 * 
 * Real World Context:
 * to ensure we don't accidentally create multiple connections to the database or 
 * multiple logging writers.
 * 
 * YOUR TASK:
 * 1. Make the `DatabaseConnection` class a Singleton.
 * 2. Ensure `new DatabaseConnection()` fails or is not possible.
 * 3. Implement `getInstance()` to return the same instance every time.
 */



class DatabaseConnection{
    private static instance: DatabaseConnection
    private constructor(){

    }

    static getInstance(){
        if(!this.instance){
            this.instance = new DatabaseConnection()
        }
        return this.instance
    }
}