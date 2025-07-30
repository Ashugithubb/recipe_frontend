
import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography, Container, Pagination } from '@mui/material';
import RecipeCard from './recipe.card';
import { useAppDispatch, useAppSelector } from '../redux/hook/hook';
import { getAllRecipesThunk } from '../redux/slice/recipe.slice';


interface Recipe {
  id: number;
  title: string;
  imageUrl: string;
  ingredients: string[];
  steps: string[];
}

const RecipeList: React.FC = () => {
  const recipes = useAppSelector((state)=>state.recipe.recipes);
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchRecipes = async () => {
       dispatch(getAllRecipesThunk({ limit: 4, page: page  }));
    };
    fetchRecipes();
  }, [dispatch,page]);


  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
        Recipe List
      </Typography>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap={3}
        mt={2}
      >
        {recipes.map((recipe) => (
          <Box key={recipe.id}>
            <RecipeCard {...recipe} />
          </Box>
        ))}
      </Box>
      <Pagination
        count={10}
        variant="outlined"
        shape="rounded"
        page={page}
        onChange={(event, value) => setPage(value)}
      />
    </Container>

  );
};

export default RecipeList;
