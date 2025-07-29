// components/AddRecipe.tsx
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { recipeSchema, RecipeInput } from "../schema/recipe.schema";
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import axios from "axios";
import { useAppDispatch } from "../redux/hook/hook";
import { createRecipe } from "../redux/async/add.recipe";

export const AddRecipe = () => {
const dispatch = useAppDispatch();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecipeInput>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      title: "",
      ingredients: [""],
      steps: [""],
      imageUrl: "",
    },
  });

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray<RecipeInput, "ingredients">({ control, name: "ingredients" });

  const {
    fields: stepFields,
    append: appendStep,
    remove: removeStep,
  } = useFieldArray({ control, name: "steps" });

  const onSubmit = async (data: RecipeInput) => {
    dispatch(createRecipe(data));
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 600, mx: "auto", p: 2 }}>
      <Typography variant="h5" mb={2}>Add Recipe</Typography>

      <TextField
        label="Title"
        fullWidth
        margin="normal"
        {...register("title")}
        error={!!errors.title}
        helperText={errors.title?.message}
      />

      <Typography variant="subtitle1" mt={2}>Ingredients</Typography>
      {ingredientFields.map((field, index) => (
        <Box key={field.id} display="flex" gap={1} alignItems="center" mb={1}>
          <TextField
            fullWidth
            {...register(`ingredients.${index}` as const)}
            error={!!errors.ingredients?.[index]}
            helperText={errors.ingredients?.[index]?.message}
          />
          <IconButton onClick={() => removeIngredient(index)}><Delete /></IconButton>
        </Box>
      ))}
      <Button startIcon={<Add />} onClick={() => appendIngredient("")}>
        Add Ingredient
      </Button>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle1" mt={2}>Steps</Typography>
      {stepFields.map((field, index) => (
        <Box key={field.id} display="flex" gap={1} alignItems="center" mb={1}>
          <TextField
            fullWidth
            multiline
            {...register(`steps.${index}` as const)}
            error={!!errors.steps?.[index]}
            helperText={errors.steps?.[index]?.message}
          />
          <IconButton onClick={() => removeStep(index)}><Delete /></IconButton>
        </Box>
      ))}
      <Button startIcon={<Add />} onClick={() => appendStep("")}>
        Add Step
      </Button>

      <TextField
        label="Image URL"
        fullWidth
        margin="normal"
        {...register("imageUrl")}
        error={!!errors.imageUrl}
        helperText={errors.imageUrl?.message}
      />

      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
        Submit Recipe
      </Button>
    </Box>
  );
};
