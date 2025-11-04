import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { isLiquidGlassAvailable } from "expo-glass-effect"
import {
  Icon,
  Label,
  NativeTabs,
  VectorIcon,
} from "expo-router/unstable-native-tabs"
import React from "react"

import { useThemeColor } from "@/hooks/use-theme-color"
import { theme } from "@/theme"
import {
  ColorValue,
  DynamicColorIOS,
  ImageSourcePropType,
  Platform,
} from "react-native"

type VectorIconFamily = {
  getImageSource: (
    name: string,
    size: number,
    color: ColorValue,
  ) => Promise<ImageSourcePropType>
}

export default function TabLayout() {
  const tintColor = useThemeColor(theme.color.reactBlue, "tint")
  const inactiveTintColor = useThemeColor(
    {
      light: "#00000090",
      dark: "#FFFFFF90",
    },
    "tint",
  )

  return (
    <NativeTabs
      badgeBackgroundColor={tintColor}
      labelStyle={{
        color:
          Platform.OS === "ios" && isLiquidGlassAvailable()
            ? DynamicColorIOS({
                light: theme.colorBlack,
                dark: theme.colorWhite,
              })
            : inactiveTintColor,
      }}
      iconColor={
        Platform.OS === "ios" && isLiquidGlassAvailable()
          ? DynamicColorIOS({
              light: theme.colorBlack,
              dark: theme.colorWhite,
            })
          : inactiveTintColor
      }
      tintColor={
        Platform.OS === "ios"
          ? DynamicColorIOS(theme.color.reactBlue)
          : inactiveTintColor
      }
    >
      <NativeTabs.Trigger name="recipes">
        <Label>Recipes</Label>
        {Platform.select({
          ios: <Icon sf="book.fill" />,
          android: (
            <Icon
              src={
                <VectorIcon
                  family={MaterialCommunityIcons as VectorIconFamily}
                  name="book"
                />
              }
              selectedColor={tintColor}
            />
          ),
        })}
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="ingredients">
        <Label>Ingredients</Label>
        {Platform.select({
          ios: <Icon sf="basket.fill" />,
          android: (
            <Icon
              src={
                <VectorIcon
                  family={MaterialCommunityIcons as VectorIconFamily}
                  name="basket"
                />
              }
              selectedColor={tintColor}
            />
          ),
        })}
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="settings">
        <Label>Settings</Label>
        {Platform.select({
          ios: <Icon sf="gear" />,
          android: (
            <Icon
              src={
                <VectorIcon
                  family={MaterialCommunityIcons as VectorIconFamily}
                  name="cog"
                />
              }
              selectedColor={tintColor}
            />
          ),
        })}
      </NativeTabs.Trigger>
    </NativeTabs>
  )
}
