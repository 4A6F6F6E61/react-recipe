import { useColorScheme } from "react-native"
import { NativeStackHeaderItemProps } from "@react-navigation/native-stack"
import { isLiquidGlassAvailable } from "expo-glass-effect"

export const useIndexScreenOptions = (
  title: string,
  headerRight?: (props: NativeStackHeaderItemProps) => React.ReactNode,
): Record<string, any> => {
  const theme = useColorScheme()

  const blurEffect =
    theme === "dark" ? "systemMaterialDark" : "systemMaterialLight"

  return {
    headerLargeTitle: true,
    headerTransparent: true,
    headerTintColor: theme === "dark" ? "white" : "black",
    headerLargeStyle: { backgroundColor: "transparent" },
    headerBlurEffect: isLiquidGlassAvailable() ? undefined : blurEffect,
    title,
    headerRight,
  }
}
