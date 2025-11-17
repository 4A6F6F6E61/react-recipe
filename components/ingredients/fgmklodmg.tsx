import { theme } from "@/constants/theme"
import type { Doc } from "@/convex/_generated/dataModel"
import {
  Gauge,
  GlassEffectContainer,
  HStack,
  Host,
  Text,
  VStack,
} from "@expo/ui/swift-ui"
import {
  cornerRadius,
  frame,
  glassEffect,
  padding,
} from "@expo/ui/swift-ui/modifiers"
import { memo, useMemo } from "react"
import { StyleSheet } from "react-native"

const MACRO_COLORS = {
  protein: "#4C6EF5",
  carbs: "#F08C00",
  fat: "#F03E3E",
} as const

type IngredientDoc = Doc<"ingredients">

interface IngredientCardProps {
  ingredient: IngredientDoc
}

const IngredientCard = memo(({ ingredient }: IngredientCardProps) => {
  const { macros, totalMacros, caloriesFromMacros, fiberValue } =
    useMemo(() => {
      const macroList = [
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

      const total = macroList.reduce(
        (sum, macro) => sum + (macro.grams || 0),
        0,
      )
      const calories = Math.round(
        ingredient.protein * 4 + ingredient.carbs * 4 + ingredient.fat * 9,
      )

      return {
        macros: macroList,
        totalMacros: total,
        caloriesFromMacros: calories,
        fiberValue: ingredient.fiber ?? 0,
      }
    }, [ingredient])

  return (
    <Host style={styles.glassHost}>
      <GlassEffectContainer>
        <HStack
          modifiers={[
            glassEffect({
              glass: { variant: "regular", interactive: true },
            }),
            padding({ horizontal: 24, vertical: 20 }),
            cornerRadius(28),
          ]}
        >
          <Text size={20} weight="semibold">
            {ingredient.name}
          </Text>
          <Text size={14} color="secondary">
            {`${ingredient.calories} kcal • ${fiberValue}g fiber`}
          </Text>
          <HStack spacing={12} alignment="center">
            {macros.map(macro => (
              <VStack key={macro.key} spacing={6} alignment="center">
                <Gauge
                  type="circularCapacity"
                  label={`${macro.label} share`}
                  current={{ value: macro.grams, label: `${macro.grams}g` }}
                  max={{ value: Math.max(totalMacros, 1), label: "Total" }}
                  color={macro.color}
                  modifiers={[frame({ width: 80, height: 80 })]}
                />
                <Text size={13} weight="semibold">
                  {macro.label}
                </Text>
                <Text size={12} color="secondary">
                  {`${macro.grams} g`}
                </Text>
              </VStack>
            ))}
          </HStack>
          <Text size={13} color="secondary">
            {`Macro calories: ${caloriesFromMacros} kcal`}
          </Text>
        </HStack>
      </GlassEffectContainer>
    </Host>
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
    padding: theme.space16,
    borderWidth: 1,
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
