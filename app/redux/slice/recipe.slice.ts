import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Recipe {
   id:number, 
  title: string;
  ingredients: string[];
  steps: string[];
}

interface RecipeState {
    recipes: Recipe[];
    loading: boolean;
    error: string | null;
}

const initialState: RecipeState = {
    recipes: [],
    loading: false,
    error: null,
};

export const getAllRecipesThunk = createAsyncThunk(
  'getAllRecipesThunk',
  async (query: { limit: number; page: number }, thunkAPI) => {
     console.log("bef0re try bl0ck");
    try {
      const res = await axios.get(
        `http://localhost:3001/recipe/all?page=${query.page}&limit=${query.limit}`,
        { withCredentials: true }
      );
       console.log("res data:",res.data);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || 'Failed to fetch recipes');
    }
  }
);


// Slice
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
