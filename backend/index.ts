import http from "http";
import { initTRPC } from "@trpc/server";

import { createHTTPServer } from "@trpc/server/adapters/standalone";
import {
  generateOpenApiDocument,
  OpenApiMeta,
  createOpenApiHttpHandler,
} from "trpc-openapi";
import {
  accountInput,
  accountCreateInput,
  accountOutputDummy,
  Account,
} from "./specs";
import { z } from "zod";

export type AppRouter = typeof appRouter;

const t = initTRPC.meta<OpenApiMeta>().create();
export const api = t.procedure;

export const appRouter = t.router({
  account: api
    .meta({ openapi: { method: "GET", path: "/account/{email}/type/{type}" } })
    .input(accountInput.extend({ type: z.string() }))
    .output(Account)
    .query(accountOutputDummy),
  //   accountCreate: api.input(accountCreateInput).mutation(accountOutputDummy),
});

export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: "tRPC OpenAPI",
  version: "1.0.0",
  baseUrl: "http://localhost:3000",
});

createHTTPServer({
  router: appRouter,
  createContext() {
    return {};
  },
}).listen(3100);

const server = http.createServer(
  createOpenApiHttpHandler({ router: appRouter })
);

server.listen(3000);
