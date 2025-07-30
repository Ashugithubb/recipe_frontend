import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Recipe {
  id: number,
  title: string;
  ingredients: string[];
  steps: string[];
}

interface RecipeState {
  recipes: Recipe[];
  total:number,
  page:number,
  limit:number
  loading: boolean;
  error: string | null;
}

const initialState: RecipeState = {
  recipes: [],
  total:0,
  page:1,
  limit:0,
  loading: false,
  error: null,
};
export interface GetRecipesQuery {
  page?: number;
  limit?: number;
  title?: string;
  difficultyLevel?: string;
  category?: string;
}
export const getAllRecipesThunk = createAsyncThunk(
  'recipes/getFilteredRecipes',
  async (query: GetRecipesQuery, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:3001/recipes', {
        params: query,
      });
      return response.data; // { recepie, total, page, limit }
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch recipes');
    }
  }
);



const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    clearRecipes: (state) => {
      state.recipes = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllRecipesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllRecipesThunk.fulfilled, (state, action: PayloadAction<Recipe[]>) => {
        state.loading = false;
        state.recipes = action.payload;
      })
      .addCase(getAllRecipesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearRecipes } = recipeSlice.actions;

export default recipeSlice.reducer;
