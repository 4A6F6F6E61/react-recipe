import { StyleSheet, View, Text } from "react-native"
import { useThemeColor } from "@/hooks/UseThemeColor"
import { theme } from "@/constants/theme"

const RecipesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={{ color: useThemeColor(theme.color.text) }}>
        Recipes Screen
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})

export default RecipesScreen
