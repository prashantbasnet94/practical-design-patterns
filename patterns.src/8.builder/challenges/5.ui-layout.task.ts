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

interface MockHTMLElement {
    tag: string;
    text?: string;
    children: MockHTMLElement[];
    attributes: Record<string, string>;
}

export class DOMBuilder {
    // TODO: Internal state

    constructor(tagName: string) {

    }

    text(content: string): DOMBuilder {
        return this;
    }

    props(key: string, value: string): DOMBuilder {
        return this;
    }

    addChild(child: DOMBuilder): DOMBuilder {
        return this;
    }

    build(): MockHTMLElement {
        return {} as MockHTMLElement;
    }
}

// --- TEST CASE ---
try {
    // Goal: 
    // <div class="container">
    //   <h1>Hello World</h1>
    //   <p>This is a paragraph</p>
    // </div>

    const root = new DOMBuilder("div")
        .props("class", "container")
        .addChild(
            new DOMBuilder("h1").text("Hello World")
        )
        .addChild(
            new DOMBuilder("p").text("This is a paragraph")
        )
        .build();

    console.log(JSON.stringify(root, null, 2));

} catch (e) {
    console.error(e);
}
