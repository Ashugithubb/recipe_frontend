// schema/recipe.schema.ts
import { z } from "zod";

export const recipeSchema = z.object({
  title: z.string().min(1),
  ingredients: z.array(z.string().min(1)),
  steps: z.array(z.string().min(1)),
  imageUrl: z.string().url(),
});

export type RecipeInput = z.infer<typeof recipeSchema>;
