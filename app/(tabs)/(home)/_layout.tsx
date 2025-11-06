import { Stack } from "expo-router"
import { useIndexScreenOptions } from "@/hooks/use-index-screen-options"

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={useIndexScreenOptions("Home")} />
    </Stack>
  )
}

export default HomeLayout
