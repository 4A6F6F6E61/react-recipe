import { View, Text, StyleSheet } from "react-native"

interface SettingsViewProps {}

const SettingsView = () => {
  return (
    <View style={styles.container}>
      <Text>SettingsView</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default SettingsView
