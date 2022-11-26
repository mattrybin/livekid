import { httpLink } from "@trpc/client"
import { Router } from "../../../backend/router"
import { useTRPC } from "use-trpc"

// export const trpc = createTRPCProxyClient<AppRouter>({
//   links: [
//     httpBatchLink({
//       url: "http://localhost:3100",
//     }),
//   ],
// })

// export default defineNuxtPlugin(() => {
//   const client = createTRPCProxyClient<AppRouter>({
//     links: [
//       httpBatchLink({
//         /**
//          * If you want to use SSR, you need to use the server's full URL
//          * @link https://trpc.io/docs/ssr
//          **/
//         url: "http://localhost:3000/api/trpc",
//       }),
//     ],
//   })
//   return {
//     provide: {
//       client,
//     },
//   }
// })
export const { useQuery } = useTRPC<Router>({
  client: {
    links: [
      httpLink({
        url: "http://localhost:3100",
      }),
    ],
  },
})
