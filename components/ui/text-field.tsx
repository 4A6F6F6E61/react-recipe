import { theme } from "@/constants/theme"
import { useThemeColor } from "@/hooks/UseThemeColor"
import { forwardRef } from "react"
import { StyleProp, StyleSheet, TextInput, ViewStyle } from "react-native"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"

export interface TextFieldProps {
  placeholder?: string
  value?: string
  onChangeText?: (text: string) => void
  secureTextEntry?: boolean
  keyboardType?: "default" | "email-address" | "numeric" | "decimal-pad"
  autoCapitalize?: "none" | "sentences" | "words" | "characters"
  autoComplete?: string
  textContentType?: string
  returnKeyType?: "done" | "next" | "search" | "send"
  style?: StyleProp<ViewStyle>
  multiline?: boolean
}

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

export const TextField = forwardRef<TextInput, TextFieldProps>(
  (
    {
      placeholder,
      value,
      onChangeText,
      secureTextEntry,
      keyboardType,
      autoCapitalize,
      autoComplete,
      textContentType,
      returnKeyType,
      style,
      multiline,
    },
    ref,
  ) => {
    const borderColor = useThemeColor(theme.color.border)
    const textColor = useThemeColor(theme.color.text)
    const placeholderColor = useThemeColor(theme.color.textSecondary)
    const backgroundColor = useThemeColor(theme.color.backgroundSecondary)

    const scale = useSharedValue(1)

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }))

    return (
      <AnimatedTextInput
        ref={ref}
        style={[
          styles.input,
          {
            borderColor,
            color: textColor,
            backgroundColor,
          },
          animatedStyle,
          style as any,
        ]}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoComplete={autoComplete as any}
        textContentType={textContentType as any}
        returnKeyType={returnKeyType}
        multiline={multiline}
        onFocus={() => {
          scale.value = withTiming(1.01, { duration: 150 })
        }}
        onBlur={() => {
          scale.value = withTiming(1, { duration: 150 })
        }}
      />
    )
  },
)

TextField.displayName = "TextField"

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: theme.borderRadius12,
    paddingHorizontal: theme.space12,
    paddingVertical: theme.space12,
    fontFamily: theme.fontFamily,
    fontSize: theme.fontSize16,
  },
})
