import { theme } from "@/constants/theme"
import type { Doc } from "@/convex/_generated/dataModel"
import { useThemeColor } from "@/hooks/UseThemeColor"
import { memo, useMemo } from "react"
import { Image, StyleSheet, Text, View } from "react-native"

const MACRO_COLORS = {
  protein: "#4C6EF5",
  carbs: "#F08C00",
  fat: "#F03E3E",
  fiber: "#12B886",
} as const

type IngredientDoc = Doc<"ingredients"> & {
  imageUrl: string | null
}

interface IngredientCardProps {
  ingredient: IngredientDoc
}

const IngredientCard = memo(({ ingredient }: IngredientCardProps) => {
  const backgroundColor = useThemeColor(theme.color.backgroundElement)
  const borderColor = useThemeColor(theme.color.border)
  const textColor = useThemeColor(theme.color.text)
  const secondaryText = useThemeColor(theme.color.textSecondary)
  const trackColor = useThemeColor(theme.color.backgroundSecondary)

  const { macros, totalMacros, fiberValue } = useMemo(() => {
    const macroList = [
      {
        key: "fiber",
        label: "Fiber",
        grams: ingredient.fiber ?? 0,
        color: MACRO_COLORS.fat,
      },
      {
        key: "protein",
        label: "Protein",
        grams: ingredient.protein,
        color: MACRO_COLORS.protein,
      },
      {
        key: "carbs",
        label: "Carbs",
        grams: ingredient.carbs,
        color: MACRO_COLORS.carbs,
      },
      {
        key: "fat",
        label: "Fat",
        grams: ingredient.fat,
        color: MACRO_COLORS.fat,
      },
    ] as const

    const total = macroList.reduce((sum, macro) => sum + (macro.grams || 0), 0)

    return {
      macros: macroList,
      totalMacros: total,
      fiberValue: ingredient.fiber ?? 0,
    }
  }, [ingredient])

  return (
    <View style={[styles.wrapper, styles.shadow]}>
      <View style={[styles.card, { backgroundColor, borderColor }]}>
        <Image
          source={{ uri: ingredient.imageUrl ?? undefined }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={{ flex: 4 }}>
          <Text style={[styles.title, { color: textColor }]}>
            {ingredient.name}
          </Text>
          <Text style={[styles.subtitle, { color: secondaryText }]}>
            {ingredient.calories} kcal
          </Text>
          <View style={styles.barRow}>
            {macros.map(macro => {
              const percent =
                totalMacros === 0 ? 0 : (macro.grams / totalMacros) * 100
              const widthPct = macro.grams === 0 ? 0 : Math.max(percent, 8)
              return (
                <View key={macro.key} style={styles.barColumn}>
                  <View
                    style={[
                      styles.barTrack,
                      { backgroundColor: trackColor, borderColor },
                    ]}
                  >
                    <View
                      style={[
                        styles.barFill,
                        {
                          width: `${widthPct}%`,
                          backgroundColor: macro.color,
                        },
                      ]}
                    />
                  </View>
                  <Text style={[styles.barLabel, { color: textColor }]}>
                    {macro.label}
                  </Text>
                  <Text style={[styles.barValue, { color: secondaryText }]}>
                    {macro.grams} g
                  </Text>
                </View>
              )
            })}
          </View>
        </View>
      </View>
    </View>
  )
})

IngredientCard.displayName = "IngredientCard"

export const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  glassHost: {
    width: "100%",
  },
  card: {
    width: "100%",
    borderRadius: theme.borderRadius20,
    borderWidth: 1,
    padding: theme.space16,
    flexDirection: "row",
    gap: theme.space16,
  },
  image: {
    flex: 3,
    height: 125,
    borderRadius: theme.borderRadius12,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  title: {
    fontSize: theme.fontSize20,
    fontFamily: theme.fontFamilySemiBold,
    marginBottom: theme.space4,
  },
  subtitle: {
    fontSize: theme.fontSize14,
    marginBottom: theme.space12,
    fontFamily: theme.fontFamily,
  },
  barRow: {
    flexDirection: "row",
    gap: theme.space12,
  },
  barColumn: {
    flex: 1,
  },
  barTrack: {
    height: 8,
    borderRadius: 999,
    overflow: "hidden",
    marginBottom: theme.space4,
    borderWidth: StyleSheet.hairlineWidth,
  },
  barFill: {
    height: "100%",
    borderRadius: 999,
  },
  barLabel: {
    fontSize: theme.fontSize12,
    fontFamily: theme.fontFamilySemiBold,
  },
  barValue: {
    fontSize: theme.fontSize12,
    fontFamily: theme.fontFamily,
    marginBottom: theme.space8,
  },
  meta: {
    fontSize: theme.fontSize12,
    fontFamily: theme.fontFamily,
  },
})

export default IngredientCard
