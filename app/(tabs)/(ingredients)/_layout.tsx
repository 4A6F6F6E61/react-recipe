import { HeaderButton } from "@/components/header/header-button"
import { useIndexScreenOptions } from "@/hooks/use-index-screen-options"
import { router, Stack } from "expo-router"

const IngredientsLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={useIndexScreenOptions("Ingredients", () => (
          <HeaderButton
            imageProps={{ systemName: "plus" }}
            buttonProps={{
              onPress: () => router.push("/add-ingredient-modal"),
            }}
          />
        ))}
      />
      <Stack.Screen
        name="add-ingredient-modal"
        options={{
          presentation: "modal",
          title: "Add Ingredient",
        }}
      />
    </Stack>
  )
}

export default IngredientsLayout
