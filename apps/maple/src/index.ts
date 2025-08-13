import { Elysia, t } from "elysia";
import { cors } from '@elysiajs/cors'

const app = new Elysia()
    .use(cors())
    .get("/", () => ({ status: true}))
    .all("/theme/:id/*", async ({ request, params }) => {
        const path = params['*']

        const url = `http://up-theme-${params.id}:8080/${path}`;

        const response = await fetch(url, {
            method: request.method,
            headers: request.headers,
            body: request.method !== 'GET' && request.method !== 'HEAD'
                ? await request.arrayBuffer()
                : undefined,
        });

        // Create response with same status and headers
        const responseBody = await response.arrayBuffer();
        const responseHeaders = Object.fromEntries([...response.headers.entries()].filter(([key]) => !key.toLowerCase().startsWith('access-control')));

        return new Response(responseBody, {
            status: response.status,
            statusText: response.statusText,
            headers: responseHeaders
        });
    })
    .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
