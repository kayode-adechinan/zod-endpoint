import * as z from "zod";
import { bridge } from "../server";
import { request } from "../client";
import { endpoint, path } from "../spec";
import express from "express";
import axios from "axios";

axios.interceptors.request.use((c) => {
    c.baseURL = "http://localhost:3000";
    return c;
});

test("client-server integration", async () => {

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

    try {
        const getPost = request(getPostsEndpoint);
        const resp = await getPost({
            params: {
                id: "1",
            },
            query: {
                tag: "foo",
            },
        });
        expect(resp.data.id).toBe("1");
        expect(resp.data.tags).toEqual(["foo"]);
    } finally {
        server.close();
    }
});
