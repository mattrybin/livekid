import http from "http"
import { inferAsyncReturnType, initTRPC } from "@trpc/server"

import { createHTTPHandler } from "@trpc/server/adapters/standalone"
import { generateOpenApiDocument, OpenApiMeta, createOpenApiHttpHandler } from "trpc-openapi"
import { appRouter } from "./router"

const trpcHandler = createHTTPHandler({
  router: appRouter,
  createContext: () => ({}),
})

// tRPC Server
http
  .createServer((req, res) => {
    // enable CORS
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Request-Method", "*")
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET")
    res.setHeader("Access-Control-Allow-Headers", "*")

    // accepts OPTIONS
    if (req.method === "OPTIONS") {
      res.writeHead(200)
      return res.end()
    }
    trpcHandler(req, res)
  })
  .listen(3100)

// API Server
// export const openApiDocument = generateOpenApiDocument(appRouter, {
//   title: "tRPC OpenAPI",
//   version: "1.0.0",
//   baseUrl: "http://localhost:3000",
// })
http.createServer(createOpenApiHttpHandler({ router: appRouter })).listen(3000)
