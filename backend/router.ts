import { initTRPC } from "@trpc/server"
import { z } from "zod"
import {
  accountInput,
  accountOutputDummy,
  accountOutput,
  accountCreateInput,
  accountCreateOutput,
  accountCreateOutputDummy,
} from "./schema/account"
import { OpenApiMeta } from "trpc-openapi"

export const t = initTRPC.meta<OpenApiMeta>().create()
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

export type Router = typeof appRouter
