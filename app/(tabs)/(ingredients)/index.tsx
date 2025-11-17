import IngredientCard from "@/components/ingredients/ingredient-card"
import { theme } from "@/constants/theme"
import { api } from "@/convex/_generated/api"
import { useThemeColor } from "@/hooks/UseThemeColor"
import { useQuery } from "convex/react"
import { useEffect, useMemo } from "react"
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const IngredientsScreen = () => {
  const ingredients = useQuery(api.ingredients.listIngredients)
  const backgroundColor = useThemeColor(theme.color.background)
  const textColor = useThemeColor(theme.color.text)
  const secondaryText = useThemeColor(theme.color.textSecondary)

  const data = useMemo(() => ingredients ?? [], [ingredients])

  useEffect(() => {
    console.log("Ingredients data:", data)
  }, [data])

  if (ingredients === undefined) {
    return (
      <View style={[styles.loaderContainer, { backgroundColor }]}>
        <ActivityIndicator size="large" color={textColor} />
        <Text style={[styles.loaderLabel, { color: secondaryText }]}>
          Loading ingredients…
        </Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <FlatList
        data={data}
        keyExtractor={item => item._id}
        renderItem={({ item }) => <IngredientCard ingredient={item} />}
        contentContainerStyle={styles.content}
        ItemSeparatorComponent={() => (
          <View style={{ height: theme.space16 }} />
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={[styles.emptyTitle, { color: textColor }]}>
              No ingredients yet
            </Text>
            <Text style={[styles.emptySubtitle, { color: secondaryText }]}>
              Use the + button to add your first ingredient.
            </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: theme.space20,
  },
  loaderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: theme.space8,
  },
  loaderLabel: {
    fontSize: theme.fontSize14,
    fontFamily: theme.fontFamily,
  },
  content: {
    paddingHorizontal: theme.space16,
    paddingTop: theme.space24,
    paddingBottom: theme.space24,
    gap: theme.space16,
  },
  hero: {
    marginBottom: theme.space16,
    gap: theme.space4,
  },
  heroTitle: {
    fontSize: theme.fontSize28,
    fontFamily: theme.fontFamilySemiBold,
  },
  heroSubtitle: {
    fontSize: theme.fontSize14,
    fontFamily: theme.fontFamily,
  },
  emptyState: {
    marginTop: theme.space24,
    paddingHorizontal: theme.space12,
    alignItems: "center",
    gap: theme.space8,
  },
  emptyTitle: {
    fontSize: theme.fontSize18,
    fontFamily: theme.fontFamilySemiBold,
  },
  emptySubtitle: {
    fontSize: theme.fontSize14,
    textAlign: "center",
    fontFamily: theme.fontFamily,
  },
})

export default IngredientsScreen
