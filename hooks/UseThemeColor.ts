/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */
import { useColorScheme } from "@/hooks/use-color-scheme"

export function useThemeColor(props: {
  light?: string
  dark?: string
}): string {
  const theme = useColorScheme() ?? "light"

  return props[theme] ?? "#FF00FF"
}
