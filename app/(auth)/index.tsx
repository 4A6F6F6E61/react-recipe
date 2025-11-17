import { useAuthActions } from "@convex-dev/auth/react"
import { useState } from "react"
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native"

import { theme } from "@/constants/theme"
import { useThemeColor } from "@/hooks/UseThemeColor"

const STEP_OPTIONS: { key: "signIn" | "signUp"; label: string }[] = [
  { key: "signIn", label: "Sign in" },
  { key: "signUp", label: "Create account" },
]

export default function SignIn() {
  const { signIn } = useAuthActions()
  const [step, setStep] = useState<"signUp" | "signIn">("signIn")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const backgroundColor = useThemeColor(theme.color.background)
  const cardColor = useThemeColor(theme.color.backgroundElement)
  const borderColor = useThemeColor(theme.color.border)
  const textColor = useThemeColor(theme.color.text)
  const secondaryText = useThemeColor(theme.color.textSecondary)
  const accentColor = useThemeColor(theme.color.reactBlue)
  const mutedSurface = useThemeColor(theme.color.backgroundSecondary)

  const handleSubmit = async () => {
    const trimmedEmail = email.trim()
    setError(null)

    if (!trimmedEmail || !password.trim()) {
      setError("Email and password are required.")
      return
    }

    setIsSubmitting(true)
    try {
      await signIn("password", {
        email: trimmedEmail,
        password,
        flow: step,
      })
      // Auth state will update and <Authenticated> guard will handle navigation
    } catch (authError) {
      console.error(authError)
      setError(
        "We couldn't sign you in. Double-check your details and try again.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.heroSection}>
            <Text style={[styles.heroTitle, { color: textColor }]}>
              Welcome back
            </Text>
            <Text style={[styles.heroSubtitle, { color: secondaryText }]}>
              Save your favorite recipes, track ingredients, and keep nutrition
              insights close at hand.
            </Text>
          </View>

          <View
            style={[styles.card, { backgroundColor: cardColor, borderColor }]}
          >
            <View
              style={[styles.stepToggle, { backgroundColor: mutedSurface }]}
            >
              {STEP_OPTIONS.map(option => {
                const isActive = option.key === step
                return (
                  <Pressable
                    key={option.key}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isActive }}
                    onPress={() => setStep(option.key)}
                    style={[
                      styles.stepPill,
                      {
                        backgroundColor: isActive ? accentColor : "transparent",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.stepLabel,
                        { color: isActive ? theme.colorWhite : textColor },
                      ]}
                    >
                      {option.label}
                    </Text>
                  </Pressable>
                )
              })}
            </View>
            <View style={styles.formFields}>
              <TextInput
                style={[styles.input, { borderColor, color: textColor }]}
                placeholder="Email address"
                placeholderTextColor={secondaryText}
                onChangeText={setEmail}
                value={email}
                inputMode="email"
                autoCapitalize="none"
                autoComplete="email"
                keyboardType="email-address"
                textContentType="username"
                returnKeyType="next"
              />
              <TextInput
                style={[styles.input, { borderColor, color: textColor }]}
                placeholder="Password"
                placeholderTextColor={secondaryText}
                onChangeText={setPassword}
                value={password}
                secureTextEntry
                textContentType="password"
                autoCapitalize="none"
                autoComplete="password"
                returnKeyType="done"
              />
            </View>
            <Text style={[styles.helper, { color: secondaryText }]}>
              Password must be at least 8 characters.
            </Text>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <Pressable
              onPress={handleSubmit}
              disabled={isSubmitting}
              style={[
                styles.submitButton,
                { backgroundColor: accentColor },
                isSubmitting && styles.submitButtonDisabled,
              ]}
            >
              {isSubmitting ? (
                <ActivityIndicator color={theme.colorWhite} />
              ) : (
                <Text style={styles.submitLabel}>
                  {step === "signIn" ? "Sign in" : "Create account"}
                </Text>
              )}
            </Pressable>
          </View>

          <Text style={[styles.footer, { color: secondaryText }]}>
            Your credentials are encrypted and never stored on device.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: theme.space24,
    paddingVertical: theme.space24,
    justifyContent: "center",
    gap: theme.space24,
  },
  heroSection: {
    gap: theme.space8,
  },
  heroTitle: {
    fontFamily: theme.fontFamilySemiBold,
    fontSize: theme.fontSize32,
  },
  heroSubtitle: {
    fontFamily: theme.fontFamily,
    fontSize: theme.fontSize14,
    lineHeight: 20,
  },
  card: {
    borderRadius: theme.borderRadius20,
    padding: theme.space20,
    borderWidth: 1,
    gap: theme.space16,
  },
  stepToggle: {
    flexDirection: "row",
    borderRadius: theme.borderRadius12,
    padding: theme.space4,
    gap: theme.space4,
  },
  stepPill: {
    flex: 1,
    paddingVertical: theme.space12,
    borderRadius: theme.borderRadius10,
    alignItems: "center",
    justifyContent: "center",
  },
  stepLabel: {
    fontFamily: theme.fontFamilySemiBold,
    fontSize: theme.fontSize14,
  },
  formFields: {
    gap: theme.space12,
  },
  input: {
    borderWidth: 1,
    borderRadius: theme.borderRadius12,
    paddingHorizontal: theme.space12,
    paddingVertical: theme.space12,
    fontFamily: theme.fontFamily,
    fontSize: theme.fontSize16,
  },
  helper: {
    fontSize: theme.fontSize12,
    fontFamily: theme.fontFamily,
  },
  errorText: {
    color: theme.colorRed,
    fontFamily: theme.fontFamily,
    fontSize: theme.fontSize12,
  },
  submitButton: {
    borderRadius: theme.borderRadius12,
    paddingVertical: theme.space12,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitLabel: {
    color: theme.colorWhite,
    fontFamily: theme.fontFamilySemiBold,
    fontSize: theme.fontSize16,
  },
  footer: {
    fontFamily: theme.fontFamily,
    fontSize: theme.fontSize12,
    textAlign: "center",
  },
})
