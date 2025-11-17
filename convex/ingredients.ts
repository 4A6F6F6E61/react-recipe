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
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx)
    if (!userId) throw new Error("Not authenticated")

    const ingredientId = await ctx.db.insert("ingredients", {
      ...args,
      image: args.storageId,
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
    const ingredients = await ctx.db
      .query("ingredients")
      .withIndex("by_user", q => q.eq("createdBy", userId))
      .collect()

    return Promise.all(
      ingredients.map(async ingredient => ({
        ...ingredient,
        imageUrl: await ctx.storage.getUrl(ingredient.image),
      })),
    )
  },
})

export const generateUploadUrl = mutation({
  handler: async ctx => {
    return await ctx.storage.generateUploadUrl()
  },
})
