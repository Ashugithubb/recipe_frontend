'use client'
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { recipeSchema, RecipeInput } from "../schema/recipe.schema";
import { ToastContainer, toast } from 'react-toastify';
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { useAppDispatch } from "../redux/hook/hook";
import { createRecipe } from "../redux/thunk/add.recipe";

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
      ingredients: [{ value: "" }],
      steps: [{ value: "" }],
    },
  });

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({ control, name: "ingredients" });

  const {
    fields: stepFields,
    append: appendStep,
    remove: removeStep,
  } = useFieldArray({ control, name: "steps" });

  const onSubmit = (data: RecipeInput) => {
    const transformedData = {
      title: data.title,
      ingredients: data.ingredients.map((item) => item.value),
      steps: data.steps.map((item) => item.value),
    };

    dispatch(createRecipe(transformedData));
    toast("recpie Added");
    location.reload();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 600, mx: "auto", p: 2 }}>
      <Typography variant="h5" mb={2}>Add Recipe</Typography>
      <ToastContainer />
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
            {...register(`ingredients.${index}.value` as const)}
            error={!!errors.ingredients?.[index]?.value}
            helperText={errors.ingredients?.[index]?.value?.message}
          />
          <IconButton onClick={() => removeIngredient(index)}><Delete /></IconButton>
        </Box>
      ))}
      <Button startIcon={<Add />} onClick={() => appendIngredient({ value: "" })}>
        Add Ingredient
      </Button>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle1" mt={2}>Steps</Typography>
      {stepFields.map((field, index) => (
        <Box key={field.id} display="flex" gap={1} alignItems="center" mb={1}>
          <TextField
            fullWidth
            multiline
            {...register(`steps.${index}.value` as const)}
            error={!!errors.steps?.[index]?.value}
            helperText={errors.steps?.[index]?.value?.message}
          />
          <IconButton onClick={() => removeStep(index)}><Delete /></IconButton>
        </Box>
      ))}
      <Button startIcon={<Add />} onClick={() => appendStep({ value: "" })}>
        Add Step
      </Button>

      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
        Submit Recipe
      </Button>
    </Box>
  );
};
