import { View, Text } from "react-native"
import { trpc } from "../utils/trpc"

export const HeaderTS = () => {
  const { data } = trpc.account.useQuery(
    {
      email: "example@website.com",
      type: "teacher",
    },
    { onError: (err) => console.error(err) }
  )
  return (
    <View>
      <Text>React Native - Typescript - using tRPC</Text>
      <Text>accountId: {data?.accountId}</Text>
      <Text>givenName: {data?.givenName}</Text>
      <Text>familyName: {data?.familyName}</Text>
      <Text>gender: {data?.gender}</Text>
    </View>
  )
}
