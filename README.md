# zod-endpoint

Extremely lightweight [zod](https://github.com/colinhacks/zod) and [express](https://github.com/expressjs/express) integration enabling type-safe HTTP endpoints.

Both express and zod are unopinionated micro libraries - and we inherit and embrace the flexibility of both.

# Usage

zod-endpoint can be used client-side or server-side (or both). 

It is easy to incrementally adopt in your project if you are already using express (server-side) or axios (client-side).

## Specification

First step is to define a specification of an endpoint

```ts
import { endpoint, path } from "zod-endpoint/spec";

// Define the endpoint specification
const getPostsEndpoint = endpoint({

    // Specify the HTTP method
    method: "get",

    // Define the path /posts/:id through a type-safe fluent builder
    path: path()
        .literal("posts")
        .placeholder("id", z.string())
        .build(),

    // Define the shape of parsed Query parameters
    query: z.object({
        include: z.string().optional(),
        tag: z.string(),
    }),

    // Define the shape of data returned by service
    result: z.object({
        id: z.string(),
        tags: z.array(z.string()),
        name: z.string(),
    }),
});
```

## Server

While implementing the server, we can bridge this specification to an endpoint which implements our service.

```ts
import express from "express";
import { bridge } from "zod-endpoint/server";

const app = express();

// Bridge the endpoint spec to a service which is independent
// of http
bridge(getPostsEndpoint, {

    // Return the zod type which will be used
    // to parse the request object
    //
    // The received type argument is derived from specification endpoint
    // and here we will transform the data to return something that the
    // service expects
    inputType: (it) =>
        it.transform((it) => ({
            id: it.params.id,
            tag: it.query.tag,
        })),

    // Zod-type to transform the service output
    // to http output
    outputType: (it) => it,
})

    // Implementation of our service
    //
    // Note that this service implementation does not receive
    // request/response object and is http independent.
    .implement(async ({ id, tag }) => {

        // Dummy implementation.
        // In a real application we will most likely fetch this data
        // from some data store
        const tags: string[] = [];
        if (tag) tags.push(tag);
        return {
            id,
            tags,
            name: "Test Post",
        };
    })

    // Attach our middleware to express router
    .attach(app);

const server = app.listen(3000);
```

## Client

We can also create a client from this spec

```ts
import { request } from "zod-endpoint/client";

const getPost = request(getPostsEndpoint);

const resp = await getPost({
    params: {
        id: "1",
    },
    query: {
        tag: "foo",
    }
});
```

Note that we don't have to implement both the Server & Client implementations. 

So we can still use zod-endpoint if either our server or client is not in our control. 
However using it in both client and server provides us end-to-end type-safety without needing to redeclare any types or needing any code-generation.

We are also able to implement any HTTP API - zod-endpoint is unassuming and does not restrict us to implement some custom protocol with adhoc limitations. 

We also don't necessarily need to accept or return JSON - it is perfectly fine to use this for applications that return HTML or binary content.
