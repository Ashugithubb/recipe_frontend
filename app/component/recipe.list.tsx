// components/RecipeList.tsx
import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography, Container } from '@mui/material';
import RecipeCard from './recipe.card';

interface Recipe {
  id: number;
  title: string;
  imageUrl: string;
  ingredients: string[];
  steps: string[];
}

const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:3001/recipe/all') // Replace with your backend API
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch recipes');
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setRecipes(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={6}>
        <Typography color="error" align="center" variant="h6">
          Error: {error}
        </Typography>
      </Box>
    );
  }

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
    </Container>
  );
};

export default RecipeList;
