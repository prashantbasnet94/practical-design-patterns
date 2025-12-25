/**
 * CHALLENGE 7: VALIDATOR SCHEMA BUILDER (Library Style)
 * 
 * CONTEXT:
 * Libraries like Zod or Yup use builders to define validation schemas.
 * 
 * GOAL:
 * Create a `StringValidator` that chains validation rules.
 * 
 * REQUIREMENTS:
 * 1. `min(length)`: enforce minimum length.
 * 2. `max(length)`: enforce maximum length.
 * 3. `email()`: enforce email regex pattern.
 * 4. `isValid(value)`: Returns boolean upon check.
 * 
 * NOTE: 
 * Unlike other builders that build an *object*, this builder builds a *verifier* 
 * that can be used immediately or stored.
 */

export class StringValidator {
    private checks: ((v: string) => boolean)[] = [];

    min(length: number): StringValidator {
        // TODO: Push a check function
        return this;
    }

    max(length: number): StringValidator {
        return this;
    }

    email(): StringValidator {
        // simple regex: /\S+@\S+\.\S+/
        return this;
    }

    isValid(value: string): boolean {
        // TODO: Run all checks
        return true;
    }
}

// --- TEST CASE ---
try {
    const schema = new StringValidator()
        .min(5)
        .max(20)
        .email();

    console.log("Is 'test' valid?", schema.isValid("test")); // false (too short)
    console.log("Is 'hello@world.com' valid?", schema.isValid("hello@world.com")); // true

} catch (e) {
    console.error(e);
}
