import { HeaderButton } from "@/components/header-buttons/header-button"
import { isLiquidGlassAvailable } from "expo-glass-effect"
import { Stack } from "expo-router"
import { useColorScheme } from "react-native"

export default function RecipesLayout() {
  const theme = useColorScheme()

  const blurEffect =
    theme === "dark" ? "systemMaterialDark" : "systemMaterialLight"

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerLargeTitle: true,
          headerTransparent: true,
          headerTintColor: theme === "dark" ? "white" : "black",
          headerLargeStyle: { backgroundColor: "transparent" },
          headerBlurEffect: isLiquidGlassAvailable() ? undefined : blurEffect,
          title: "Home",
          headerRight: () => (
            <HeaderButton imageProps={{ systemName: "plus" }} />
          ),
        }}
      />
    </Stack>
  )
}
