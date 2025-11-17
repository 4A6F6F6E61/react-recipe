import PlatformButton from "@/components/ui/platform-button"
import { TextField } from "@/components/ui/text-field"
import { theme } from "@/constants/theme"
import { api } from "@/convex/_generated/api"
import { useThemeColor } from "@/hooks/UseThemeColor"
import { useMutation } from "convex/react"
import * as ImagePicker from "expo-image-picker"
import { router } from "expo-router"
import { useCallback, useState } from "react"
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native"

type MacroFieldKey = "protein" | "carbs" | "fat" | "fiber"

type FormState = {
  name: string
  calories: string
  protein: string
  carbs: string
  fat: string
  fiber: string
}

const macroFields: { key: MacroFieldKey; label: string }[] = [
  { key: "protein", label: "Protein (g)" },
  { key: "carbs", label: "Carbs (g)" },
  { key: "fat", label: "Fat (g)" },
  { key: "fiber", label: "Fiber (g) – optional" },
]

const initialFormState: FormState = {
  name: "",
  calories: "",
  protein: "",
  carbs: "",
  fat: "",
  fiber: "",
}

export default function AddIngredientModal() {
  const [form, setForm] = useState<FormState>(initialFormState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [imageUri, setImageUri] = useState<string | null>(null)
  const backgroundColor = useThemeColor(theme.color.background)
  const borderColor = useThemeColor(theme.color.border)
  const textColor = useThemeColor(theme.color.text)
  const secondaryText = useThemeColor(theme.color.textSecondary)
  const cardColor = useThemeColor(theme.color.backgroundElement)
  const createIngredient = useMutation(api.ingredients.createIngredient)

  const updateField = useCallback((key: keyof FormState, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }, [])

  const parseNumber = useCallback((value: string) => {
    const trimmed = value.replace(",", ".").trim()
    if (!trimmed) return 0
    const parsed = Number(trimmed)
    return Number.isFinite(parsed) ? Math.max(parsed, 0) : NaN
  }, [])

  const pickImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    })

    if (!result.canceled && result.assets[0]) {
      setImageUri(result.assets[0].uri)
    }
  }, [])

  const resetForm = useCallback(async () => {
    setForm(initialFormState)
    setImageUri(null)
  }, [])

  const handleSubmit = useCallback(async () => {
    setError(null)
    const trimmedName = form.name.trim()
    if (!trimmedName) {
      setError("Please add a name for this ingredient.")
      return
    }

    const calories = parseNumber(form.calories)
    if (!Number.isFinite(calories) || calories <= 0) {
      setError("Calories must be a positive number.")
      return
    }

    const payload = {
      name: trimmedName,
      calories: Math.round(calories),
      protein: parseNumber(form.protein),
      carbs: parseNumber(form.carbs),
      fat: parseNumber(form.fat),
      fiber: parseNumber(form.fiber),
      image: imageUri || undefined,
    }

    if (
      [payload.protein, payload.carbs, payload.fat, payload.fiber].some(
        Number.isNaN,
      )
    ) {
      setError("Macros must be numeric values.")
      return
    }

    setIsSubmitting(true)
    try {
      await createIngredient(payload)
      await resetForm()
      router.back()
      Alert.alert(
        "Ingredient saved",
        `${payload.name} was added to your pantry.`,
      )
    } catch (mutationError) {
      console.error(mutationError)
      Alert.alert(
        "Something went wrong",
        "We couldn't save that ingredient. Please try again in a moment.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }, [createIngredient, form, parseNumber, resetForm, imageUri])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={[styles.flex, { backgroundColor }]}
    >
      <ScrollView
        contentContainerStyle={styles.formContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: textColor }]}>
            Add Ingredient
          </Text>
          <Text style={[styles.subtitle, { color: secondaryText }]}>
            Track your ingredients with detailed nutritional info
          </Text>
        </View>

        {/* Image upload section */}
        <View
          style={[
            styles.imageSection,
            { backgroundColor: cardColor, borderColor },
          ]}
        >
          {imageUri ? (
            <Pressable onPress={pickImage} style={styles.imagePreview}>
              <Image source={{ uri: imageUri }} style={styles.imageThumbnail} />
              <Text style={[styles.imageLabel, { color: secondaryText }]}>
                Tap to change
              </Text>
            </Pressable>
          ) : (
            <Pressable
              onPress={pickImage}
              style={[styles.imagePlaceholder, { borderColor }]}
            >
              <Text
                style={[styles.imagePlaceholderText, { color: secondaryText }]}
              >
                📷 Add photo
              </Text>
            </Pressable>
          )}
        </View>

        <Text style={[styles.sectionLabel, { color: textColor }]}>
          Basic info
        </Text>
        <TextField
          placeholder="Ingredient name"
          value={form.name}
          onChangeText={text => updateField("name", text)}
        />
        <TextField
          placeholder="Calories (per 100g)"
          keyboardType="decimal-pad"
          value={form.calories}
          onChangeText={text => updateField("calories", text)}
        />

        <Text style={[styles.sectionLabel, { color: textColor }]}>
          Macros (per 100g)
        </Text>
        {macroFields.map(field => (
          <TextField
            key={field.key}
            placeholder={field.label}
            keyboardType="decimal-pad"
            value={form[field.key]}
            onChangeText={text => updateField(field.key, text)}
          />
        ))}

        <Text style={[styles.helperText, { color: secondaryText }]}>
          All values in grams except calories. Fiber is optional.
        </Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <PlatformButton
          title={isSubmitting ? "Saving…" : "Save ingredient"}
          onPress={handleSubmit}
          disabled={isSubmitting}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  formContent: {
    paddingHorizontal: theme.space20,
    paddingVertical: theme.space24,
    gap: theme.space16,
  },
  header: {
    gap: theme.space4,
    marginBottom: theme.space8,
  },
  title: {
    fontSize: theme.fontSize28,
    fontFamily: theme.fontFamilySemiBold,
  },
  subtitle: {
    fontSize: theme.fontSize14,
    fontFamily: theme.fontFamily,
    lineHeight: 20,
  },
  imageSection: {
    borderRadius: theme.borderRadius12,
    padding: theme.space16,
    borderWidth: 1,
    alignItems: "center",
  },
  imagePreview: {
    alignItems: "center",
    gap: theme.space8,
  },
  imageThumbnail: {
    width: 120,
    height: 120,
    borderRadius: theme.borderRadius12,
  },
  imageLabel: {
    fontSize: theme.fontSize12,
    fontFamily: theme.fontFamily,
  },
  imagePlaceholder: {
    width: "100%",
    height: 120,
    borderRadius: theme.borderRadius12,
    borderWidth: 2,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
  imagePlaceholderText: {
    fontSize: theme.fontSize16,
    fontFamily: theme.fontFamily,
  },
  sectionLabel: {
    fontSize: theme.fontSize16,
    fontFamily: theme.fontFamilySemiBold,
    marginTop: theme.space8,
  },
  helperText: {
    fontSize: theme.fontSize12,
    fontFamily: theme.fontFamily,
  },
  errorText: {
    fontSize: theme.fontSize12,
    color: theme.colorRed,
    fontFamily: theme.fontFamily,
  },
})
