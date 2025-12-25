# Read This First: The Builder Pattern

## The "Lens" 🧐
**When should you reach for the Builder Pattern?**

Stop and look at your code. Do you see:
1.  **Telescoping Constructors**: A constructor with 10 arguments, where 5 are `null` or `undefined`?
    ```typescript
    new User("john", null, null, true, null, "admin"); // What do these nulls mean?!
    ```
2.  **Complex Configuration**: Creating an object requires many steps (e.g., configuring an HTTP request with headers, body, timeout, auth).
3.  **Validation Hell**: You need to ensure that *if* A is set, B must also be set, but you can't easily enforce that in a simple constructor.
4.  **Immutability**: You want the final object to be immutable (read-only), but you need to set it up step-by-step.

If you see these, put on your **Builder Lens**.

---

## 1. The Core Concept 💡
The Builder pattern separates the **construction** of a complex object from its **representation**.

Think of ordering a sub sandwich 🥪:
- You don't just say "make sandwich".
- You say: "Start with wheat bread" -> "Add turkey" -> "Add lettuce" -> "Add mayo" -> "Toast it".
- **Result**: A complex object (the sandwich) built step-by-step.

### The "Director" vs. "Simple Builder"
*   **Simple Builder (Modern)**: You chain methods directly. `new Builder().partA().partB().build()`. This is 99% of what you'll see in TS/JS (e.g., Drizzle, SuperTest).
*   **Director (Classic)**: A separate class controls the builder. `director.makeLuxuryCar(builder)`. Useful if you have very specific, reusable recipes.

## 2. Real-World Analogy 🌍
**SQL Query Builder**:
- You don't write one massive function to generate every possible SQL string.
- You build it: `.select('id').from('users').where('active=1')`.
- The `build()` method at the end compiles it all into a string.

**Document Generator**:
- `.setTitle('Report').addParagraph('...').addTable(...).savePDF()`.

## 3. The Implementation (Mental Model) 🧠

1.  **The Product**: The complex object you want to build (e.g., `Computer`, `Request`).
2.  **The Builder**: A class with:
    *   Private properties mirroring the Product.
    *   Methods to set those properties (returning `this` for chaining).
    *   A `build()` method that creates the Product instance.
3.  **The Build Step**: The final act where you validate the state and return the immutable Product.

---

### Key Takeaway
**Builder makes client code readable.**
Instead of memorizing argument order (`new A(1, 2, 3)`), you read intentions (`.setTimeout(1000).setRetries(3)`).
