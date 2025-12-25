/**
 * CHALLENGE 3: HTTP REQUEST BUILDER
 * 
 * CONTEXT:
 * Constructing complex HTTP requests (headers, body, query params, auth) is a common task.
 * Many libraries (like SuperTset or modern fetch wrappers) use the Builder pattern.
 * 
 * GOAL:
 * Create a `RequestBuilder` that constructs a configuration object for `fetch`.
 * 
 * REQUIREMENTS:
 * 1. `setMethod(method)`: GET, POST, PUT, DELETE (default GET).
 * 2. `setUrl(url)`: sets the target URL.
 * 3. `addHeader(key, value)`: adds a header. Support chaining multiple headers.
 * 4. `setBody(data)`: valid only for POST/PUT. Should automatically set 'Content-Type' to 'application/json' if not present.
 * 5. `setQueryParam(key, value)`: adds a URL query parameter (e.g., ?page=1).
 * 6. `build()`: returns a RequestConfiguration object.
 */

interface RequestConfig {
    url: string;
    method: string;
    headers: Record<string, string>;
    body?: string;
}

export class RequestBuilder {
    // TODO: Maintain state

    setUrl(url: string): RequestBuilder {
        return this;
    }

    setMethod(method: 'GET' | 'POST' | 'PUT' | 'DELETE'): RequestBuilder {
        return this;
    }

    addHeader(key: string, value: string): RequestBuilder {
        return this;
    }

    setBody(data: any): RequestBuilder {
        // TODO: Handle JSON serialization
        return this;
    }

    setQueryParam(key: string, value: string): RequestBuilder {
        // TODO: Append to internal query state
        return this;
    }

    build(): RequestConfig {
        // TODO: Assemble the final complete URL with query params
        return {} as RequestConfig;
    }
}

// --- TEST CASE ---
try {
    const request = new RequestBuilder()
        .setUrl("https://api.example.com/users")
        .setMethod("POST")
        .addHeader("Authorization", "Bearer token123")
        .setQueryParam("version", "v2")
        .setBody({ name: "Alice" })
        .build();

    console.log(request);
    // Expected: 
    // { 
    //   url: "https://api.example.com/users?version=v2",
    //   method: "POST",
    //   headers: { Authorization: "Bearer token123", "Content-Type": "application/json" },
    //   body: '{"name":"Alice"}'
    // }

} catch (e) {
    console.error(e);
}
