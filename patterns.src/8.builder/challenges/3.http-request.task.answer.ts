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

interface IRequest {
    url: string
    method: string
    headers: Record<string, string>
    body?: string
}

class MyRequest implements IRequest {
    url: string = ""
    method: string = ""
    headers: Record<string, string> = {"Content-Type": "application/json"}
    body?: string = ""

}

class RequestBulder {
    private request: IRequest
    constructor() {
        this.request = new MyRequest()
    }
    setUrl(url: string): RequestBulder {
        this.request.url = url
        return this
    }
    setMethod(method: string): RequestBulder {
        this.request.method = method
        return this
    }
    addHeaders(key: string, value: string): RequestBulder {
        this.request.headers[ key ] = value
        return this
    }
    setBody(body: string): RequestBulder {
        this.request.body = body
        return this
    }
    setQueryParam(key: string, value: string): RequestBulder {
        if (!this.request.url.includes('?')) {
            this.request.url += '?'
        }
        this.request.url += `${key}=${value}`
        return this
    }
    build() {
        return this.request
    }
}


let builder = new RequestBulder()

let request = builder
    .setUrl("https//unisala.com")
    .setBody("")
    .setMethod("GET")
    .setQueryParam("username", 'prashantbasnet94')
    .addHeaders("Authorization", "Bearer token123")

    console.log(request.build())