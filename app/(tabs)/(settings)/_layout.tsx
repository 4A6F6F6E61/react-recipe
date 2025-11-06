import { useIndexScreenOptions } from "@/hooks/use-index-screen-options"
import { Stack } from "expo-router"

const SettingsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={useIndexScreenOptions("Settings")} />
    </Stack>
  )
}

export default SettingsLayout
