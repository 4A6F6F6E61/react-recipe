import { theme } from "@/constants/theme"
import { useThemeColor } from "@/hooks/UseThemeColor"
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"

export interface ButtonProps {
  title: string
  onPress?: () => void
  disabled?: boolean
  variant?: "primary" | "secondary"
  style?: StyleProp<ViewStyle>
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const PlatformButton = ({
  title,
  onPress,
  disabled,
  variant = "primary",
  style,
}: ButtonProps) => {
  const primaryColor = useThemeColor(theme.color.reactBlue)
  const secondaryColor = useThemeColor(theme.color.backgroundSecondary)
  const defaultTextColor = useThemeColor(theme.color.text)
  const textColor = variant === "primary" ? theme.colorWhite : defaultTextColor
  const backgroundColor = variant === "primary" ? primaryColor : secondaryColor

  const scale = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  return (
    <AnimatedPressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        { backgroundColor },
        disabled && styles.disabled,
        animatedStyle,
        style,
      ]}
      onPressIn={() => {
        scale.value = withTiming(0.95, { duration: 150 })
      }}
      onPressOut={() => {
        scale.value = withTiming(1, { duration: 150 })
      }}
    >
      {disabled ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text style={[styles.text, { color: textColor }]}>{title}</Text>
      )}
    </AnimatedPressable>
  )
}

export default PlatformButton

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.borderRadius12,
    paddingHorizontal: theme.space12,
    paddingVertical: theme.space12,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: theme.fontFamilySemiBold,
    fontSize: theme.fontSize16,
  },
  disabled: {
    opacity: 0.6,
  },
})
