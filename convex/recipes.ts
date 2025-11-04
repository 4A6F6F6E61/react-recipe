import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createRecipe = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    image: v.optional(v.string()),
    ingredients: v.array(
      v.object({
        ingredientId: v.id("ingredients"),
        amount: v.number(),
        unit: v.string(),
      }),
    ),
    steps: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    // Create recipe
    const recipeId = await ctx.db.insert("recipes", {
      title: args.title,
      description: args.description,
      image: args.image,
      createdBy: userId,
      createdAt: Date.now(),
    });

    // Add ingredients
    for (const item of args.ingredients) {
      await ctx.db.insert("recipeIngredients", {
        recipeId,
        ingredientId: item.ingredientId,
        amount: item.amount,
        unit: item.unit,
      });
    }

    // Add steps
    args.steps.forEach(async (instruction, index) => {
      await ctx.db.insert("recipeSteps", {
        recipeId,
        stepNumber: index + 1,
        instruction,
      });
    });

    return recipeId;
  },
});

// Get a recipe with ingredients and steps
export const getRecipe = query({
  args: { recipeId: v.id("recipes") },
  handler: async (ctx, args) => {
    const recipe = await ctx.db.get(args.recipeId);
    if (!recipe) throw new Error("Recipe not found");

    const ingredients = await ctx.db
      .query("recipeIngredients")
      .withIndex("by_recipe", q => q.eq("recipeId", args.recipeId))
      .collect();

    const steps = await ctx.db
      .query("recipeSteps")
      .withIndex("by_recipe", q => q.eq("recipeId", args.recipeId))
      .order("asc")
      .collect();

    return { ...recipe, ingredients, steps };
  },
});

// List all recipes by current user
export const listUserRecipes = query({
  args: {},
  handler: async ctx => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    return await ctx.db
      .query("recipes")
      .withIndex("by_user", q => q.eq("createdBy", userId))
      .collect();
  },
});
