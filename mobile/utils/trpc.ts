import { createTRPCReact } from "@trpc/react-query"
import type { Router } from "../../backend/router"

export const trpc = createTRPCReact<Router>()
