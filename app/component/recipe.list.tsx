import React, { useEffect } from 'react';
import { Box, CircularProgress, Typography, Container, Pagination } from '@mui/material';
import RecipeCard from './recipe.card';
import { useAppDispatch, useAppSelector } from '../redux/hook/hook';
import { getAllRecipesThunk } from '../redux/slice/recipe.slice';

const RecipeList: React.FC = () => {
  const dispatch = useAppDispatch();

  const { recipes=[],loading, total, limit, page } = useAppSelector((state) => state.recipe);



  useEffect(() => {
    dispatch(getAllRecipesThunk({ limit: 4, page }));
  }, [dispatch, page]);

  const totalPages = Math.ceil(total / (limit || 1)); 

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
        Recipe List
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {recipes.length === 0 ? (
            <Typography align="center" mt={4}>
              No recipes found.
            </Typography>
          ) : (
            <Box display="flex" flexWrap="wrap" justifyContent="center" gap={3} mt={2}>
              {recipes.map((recipe: any) => (
                <Box key={recipe.id}>
                  <RecipeCard {...recipe} />
                </Box>
              ))}
            </Box>
          )}

          {totalPages > 1 && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Pagination
                count={totalPages}
                page={page}
                variant="outlined"
                shape="rounded"
                onChange={(_, value) => {
                  dispatch(getAllRecipesThunk({ page: value, limit }));
                }}
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default RecipeList;
