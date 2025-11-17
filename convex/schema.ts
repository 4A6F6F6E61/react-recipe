import { authTables } from "@convex-dev/auth/server"
import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  ...authTables,

  ingredients: defineTable({
    name: v.string(),
    /* 
     ---------- per 100g ----------
    */
    calories: v.number(),
    protein: v.number(),
    carbs: v.number(),
    fat: v.number(),
    fiber: v.number(),
    /* ------------------------------- */
    image: v.optional(v.string()),
    createdBy: v.id("users"),
    createdAt: v.number(),
  })
    .index("by_user", ["createdBy"])
    .index("by_name", ["name"]),

  // Recipes table
  recipes: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    image: v.optional(v.string()),
    createdBy: v.id("users"),
    createdAt: v.number(), // timestamp
  })
    .index("by_user", ["createdBy"])
    .index("by_title", ["title"]),

  // Recipe ingredients (junction table)
  recipeIngredients: defineTable({
    recipeId: v.id("recipes"),
    ingredientId: v.id("ingredients"),
    amount: v.number(), // numeric amount (e.g. 200)
    unit: v.string(), // e.g. "g", "ml", "cup"
  })
    .index("by_recipe", ["recipeId"])
    .index("by_ingredient", ["ingredientId"]),

  // Recipe steps
  recipeSteps: defineTable({
    recipeId: v.id("recipes"),
    stepNumber: v.number(),
    instruction: v.string(),
  })
    .index("by_recipe", ["recipeId"])
    .index("by_step", ["recipeId", "stepNumber"]),
})
