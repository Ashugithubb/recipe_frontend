'use client'
import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import RecipeCard from "./recipe.card";

export default function SeeAllSurvey() {
    const [openSearch, setopenSerch] = useState(true);
    const [recipe, setRecipes] = useState([]);
    const [searchTittle, setsearchTittle] = useState('');

    const [difficulty, setDifficulty] = useState('');
    const [category, setCategory] = useState('');



    useEffect(() => {
        const debounce = setTimeout(async () => {
            if (searchTittle.trim() === '') {
                setRecipes([]);
                return;
            }
            try {
                const res = await axios.get(`http://localhost:3001/recipe/search?title=${searchTittle}`, {
                    withCredentials: true,
                });
                setRecipes(res.data);
            } catch (error) {
                console.log("Fetch error:", error);
            }
        }, 2000);

        return () => clearTimeout(debounce);
    }, [searchTittle]);

useEffect(() => {
  const fetchFilteredRecipes = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (difficulty) queryParams.append('difficultyLevel', difficulty);
      if (category) queryParams.append('category', category);

      const res = await axios.get(``, {
        withCredentials: true,
      });
      setRecipes(res.data);
    } catch (error) {
      console.error("Filter fetch error:", error);
    }
  };

  fetchFilteredRecipes();
}, [difficulty, category]);

    return (
        <>
            <ToastContainer />
            <Box display="flex" gap={2} mt={2}>
                <TextField
                    select
                    // label="Difficulty"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    SelectProps={{ native: true }}
                >
                    <option value="">All</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </TextField>

                <TextField
                    select
                    // label="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    SelectProps={{ native: true }}
                >
                    <option value="">All</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Snack">Snack</option>
                </TextField>
            </Box>

            <TextField
                label="Search Recipe By Tittle"
                margin="normal"
                value={searchTittle}
                onChange={(e) => setsearchTittle(e.target.value)}
            />


            {
                openSearch && (
                    recipe.map((r: any) => (
                        <Box key={r.title} p={2} border={1} borderRadius={2} m={1} width={200}>
                            <RecipeCard {...r} />
                            <Typography variant="h6">
                                {r.title}
                            </Typography>
                            <Typography variant="h6">
                                {r.ingredient}
                            </Typography>
                            <Typography variant="h6">
                                {r.steps}
                            </Typography>
                        </Box>
                    ))
                )
            }



        </>
    )
}
