/**
 * CHALLENGE 5: UI DOM BUILDER (Composite + Builder)
 *
 * CONTEXT:
 * creating nested tree structures (like HTML DOM or UI components) is a classic use case.
 *
 * GOAL:
 * Create a builder that constructs a tree of `HTMLElement` (mock) objects.
 *
 * REQUIREMENTS:
 * 1. `tag(tagName)`: starts a new element with a tag.
 * 2. `text(content)`: adds text content to the current element.
 * 3. `addChild(elementBuilder)`: adds a child element.
 * 4. `props(attributes)`: adds attributes (id, class, style).
 *
 * TIP: This interacts closely with the Composite pattern!
 * But here we focus on the *construction* API.
 */
