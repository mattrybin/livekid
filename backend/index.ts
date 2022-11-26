import { z } from "zod"
import http from "http"
import { initTRPC } from "@trpc/server"

import { createHTTPServer } from "@trpc/server/adapters/standalone"
import { generateOpenApiDocument, OpenApiMeta, createOpenApiHttpHandler } from "trpc-openapi"
import {
  accountInput,
  accountOutputDummy,
  accountOutput,
  accountCreateInput,
  accountCreateOutput,
  accountCreateOutputDummy,
} from "./specs"

export type AppRouter = typeof appRouter

const t = initTRPC.meta<OpenApiMeta>().create()
export const api = t.procedure

export const appRouter = t.router({
  account: api
    .meta({ openapi: { method: "GET", path: "/account/{email}/type/{type}" } })
    .input(accountInput.extend({ type: z.string() }))
    .output(accountOutput)
    .query(accountOutputDummy),
  accountCreate: api
    .meta({ openapi: { method: "POST", path: "/account/{email}" } })
    .input(accountCreateInput)
    .output(accountCreateOutput)
    .mutation(accountCreateOutputDummy),
})

export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: "tRPC OpenAPI",
  version: "1.0.0",
  baseUrl: "http://localhost:3000",
})

createHTTPServer({
  router: appRouter,
  createContext() {
    return {}
  },
}).listen(3100)

const server = http.createServer(createOpenApiHttpHandler({ router: appRouter }))

server.listen(3000)
