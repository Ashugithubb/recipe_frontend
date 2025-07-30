import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface RecipeInput {
  title: string;
  ingredients: string[];
  steps: string[];

}

export const createRecipe = createAsyncThunk(
  'recipe/create',
  async (data: RecipeInput, thunkAPI) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/recipe/create',
        data,
        { withCredentials: true }
      );
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);
