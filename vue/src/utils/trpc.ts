import { httpLink } from "@trpc/client"
import { Router } from "../../../backend/router"
import { useTRPC } from "use-trpc"

export const { useQuery } = useTRPC<Router>({
  client: {
    links: [
      httpLink({
        url: "http://localhost:3100",
      }),
    ],
  },
})
