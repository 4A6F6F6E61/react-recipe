import { HeaderButton } from "@/components/header/header-button"
import { useIndexScreenOptions } from "@/hooks/use-index-screen-options"
import { Stack } from "expo-router"

const IngredientsLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={useIndexScreenOptions("Ingredients", () => (
          <HeaderButton imageProps={{ systemName: "plus" }} />
        ))}
      />
    </Stack>
  )
}

export default IngredientsLayout
