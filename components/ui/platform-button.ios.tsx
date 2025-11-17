import { theme } from "@/constants/theme"
import { Host, Text as SText, Button as SwiftButton } from "@expo/ui/swift-ui"
import { cornerRadius, glassEffect, padding } from "@expo/ui/swift-ui/modifiers"
import { StyleProp, ViewStyle } from "react-native"

export interface ButtonProps {
  title: string
  onPress?: () => void
  disabled?: boolean
  variant?: "primary" | "secondary"
  style?: StyleProp<ViewStyle>
}

const PlatformButton = ({
  title,
  onPress,
  disabled,
  variant = "primary",
  style,
}: ButtonProps) => {
  const buttonVariant = variant === "primary" ? "glassProminent" : "glass"

  return (
    <Host style={style}>
      <SwiftButton
        variant={buttonVariant}
        onPress={onPress}
        disabled={disabled}
        modifiers={[
          glassEffect({ glass: { variant: "clear" } }),
          cornerRadius(theme.borderRadius12),
          padding({ horizontal: theme.space12, vertical: theme.space12 }),
        ]}
      >
        <SText size={16} weight="semibold">
          {title}
        </SText>
      </SwiftButton>
    </Host>
  )
}

export default PlatformButton
