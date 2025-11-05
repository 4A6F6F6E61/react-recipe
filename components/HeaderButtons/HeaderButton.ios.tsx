import { theme } from "@/theme"
import { Button, ButtonProps, Host, Image, ImageProps } from "@expo/ui/swift-ui"
import { frame } from "@expo/ui/swift-ui/modifiers"
import { StyleProp, ViewStyle } from "react-native"

const SIZE = theme.fontSize34

export interface HeaderButtonProps {
  imageProps?: ImageProps
  buttonProps?: ButtonProps
  style?: StyleProp<ViewStyle>
}

export function HeaderButton({
  imageProps,
  buttonProps,
  style,
}: HeaderButtonProps) {
  return (
    <Host
      matchContents
      style={[
        {
          height: SIZE,
          width: SIZE,
        },
        style,
      ]}
    >
      <Button {...buttonProps}>
        <Image
          {...imageProps}
          systemName={imageProps?.systemName || "xmark"}
          color={imageProps?.color || "primary"}
          size={imageProps?.size || theme.fontSize24}
          modifiers={[
            frame({ width: SIZE, height: SIZE, alignment: "center" }),
            ...(imageProps?.modifiers || []),
          ]}
        />
      </Button>
    </Host>
  )
}
