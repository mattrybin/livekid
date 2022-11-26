import { View, Text } from "react-native"
import { useEffect, useState } from "react"

export const Header = () => {
  const [data, setData] = useState(undefined)

  useEffect(() => {
    fetch("http://localhost:3000/account/email1@web.com/type/teacher")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("JS", error))
  }, [])

  return (
    <View>
      <Text>Javascript - using REST</Text>
      <Text>accountId: {data?.accountId}</Text>
      <Text>givenName: {data?.givenName}</Text>
      <Text>familyName: {data?.familyName}</Text>
      <Text>gender: {data?.gender}</Text>
    </View>
  )
}
