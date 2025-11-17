import { getAuthUserId } from "@convex-dev/auth/server"
import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

// Create an ingredient
export const createIngredient = mutation({
  args: {
    name: v.string(),
    calories: v.number(),
    protein: v.number(),
    carbs: v.number(),
    fat: v.number(),
    fiber: v.number(),
    image: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error("Not authenticated")

    const ingredientId = await ctx.db.insert("ingredients", {
      ...args,
      createdBy: userId,
      createdAt: Date.now(),
    })
    return ingredientId
  },
})

export const listIngredients = query({
  args: {},
  handler: async ctx => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error("Not authenticated")
    return await ctx.db
      .query("ingredients")
      .withIndex("by_user", q => q.eq("createdBy", userId))
      .collect()
  },
})
