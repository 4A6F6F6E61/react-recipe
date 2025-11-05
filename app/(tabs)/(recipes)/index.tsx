import { StyleSheet, View } from "react-native"

import { ThemedText } from "@/components/themed-text"

const RecipesScreen = () => {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.text}>Home screen</ThemedText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
  },
})

export default RecipesScreen
