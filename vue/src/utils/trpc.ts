import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"
import { AppRouter } from "../../../backend"

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3100",
    }),
  ],
})
