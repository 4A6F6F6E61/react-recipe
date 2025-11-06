import { StyleSheet, View, Text } from "react-native"
import { Link } from "expo-router"
import { theme } from "@/constants/theme"
import { useThemeColor } from "@/hooks/UseThemeColor"

const IngredientsScreen = () => {
  return (
    <View style={styles.container}>
      <Link href="/modal" dismissTo>
        <Text style={{ color: useThemeColor(theme.color.text) }}>
          Go to home screen
        </Text>
      </Link>
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

export default IngredientsScreen
