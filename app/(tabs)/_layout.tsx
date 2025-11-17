import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { isLiquidGlassAvailable } from "expo-glass-effect"
import {
  Icon,
  Label,
  NativeTabs,
  VectorIcon,
} from "expo-router/unstable-native-tabs"
import React from "react"

import { theme } from "@/constants/theme"
import { useThemeColor } from "@/hooks/UseThemeColor"
import { Authenticated, Unauthenticated } from "convex/react"
import {
  ColorValue,
  DynamicColorIOS,
  ImageSourcePropType,
  Platform,
} from "react-native"
import AuthPage from "./auth"

type VectorIconFamily = {
  getImageSource: (
    name: string,
    size: number,
    color: ColorValue,
  ) => Promise<ImageSourcePropType>
}

const iconLabelColor = (inactiveTintColor: string) =>
  Platform.OS === "ios" && isLiquidGlassAvailable()
    ? DynamicColorIOS({
        light: theme.colorBlack,
        dark: theme.colorWhite,
      })
    : inactiveTintColor

export default function TabLayout() {
  const tintColor = useThemeColor(theme.color.reactBlue)
  const inactiveTintColor = useThemeColor({
    light: "#00000090",
    dark: "#FFFFFF90",
  })

  return (
    <>
      <Unauthenticated>
        <AuthPage />
      </Unauthenticated>
      <Authenticated>
        <NativeTabs
          badgeBackgroundColor={tintColor}
          labelStyle={{
            color: iconLabelColor(inactiveTintColor),
          }}
          iconColor={iconLabelColor(inactiveTintColor)}
          tintColor={
            Platform.OS === "ios"
              ? DynamicColorIOS(theme.color.reactBlue)
              : inactiveTintColor
          }
        >
          <NativeTabs.Trigger name="(home)">
            <Label>Home</Label>
            {Platform.select({
              ios: <Icon sf="house.fill" />,
              android: (
                <Icon
                  src={
                    <VectorIcon
                      family={MaterialCommunityIcons as VectorIconFamily}
                      name="house"
                    />
                  }
                  selectedColor={tintColor}
                />
              ),
            })}
          </NativeTabs.Trigger>
          <NativeTabs.Trigger name="(recipes)">
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
          <NativeTabs.Trigger name="(ingredients)">
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
          <NativeTabs.Trigger
            name="(settings)"
            role={isLiquidGlassAvailable() ? "search" : undefined}
          >
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
      </Authenticated>
    </>
  )
}
