import { z } from "zod";

export const recipeSchema = z.object({
  title: z.string().min(1, "Title is required"),
  ingredients: z.array(z.object({ value: z.string().min(1, "Ingredient can't be empty") })),
  steps: z.array(z.object({ value: z.string().min(1, "Step can't be empty") })),
});

export type RecipeInput = z.infer<typeof recipeSchema>;
