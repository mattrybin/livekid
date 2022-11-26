import { View, Text } from "react-native"
import { trpc } from "../utils/trpc"

export const HeaderTS = () => {
  const { data } = trpc.account.useQuery(
    {
      email: "example@website.com",
      type: "teacher",
    },
    {
      onError: (error) => {
        console.error("ERROR", error)
      },
    }
  )

  return (
    <View>
      <Text>Typescript - using tRPC</Text>
      <Text>accountId: {data?.accountId}</Text>
      <Text>givenName: {data?.givenName}</Text>
      <Text>familyName: {data?.familyName}</Text>
      <Text>gender: {data?.gender}</Text>
    </View>
  )
}
