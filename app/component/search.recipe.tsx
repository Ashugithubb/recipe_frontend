'use client'
import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

export default function SeeAllSurvey() {
    const [openSearch, setopenSerch] = useState(true);
    const [recipe, setRecipes] = useState([]);
    const [searchTittle,setsearchTittle] = useState('');
    

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




    return (
        <>
            <ToastContainer/>
          
                           <TextField
                           label="Search Survey By Tittle"
                            margin="normal"
                            value={searchTittle}
                            onChange={(e) => setsearchTittle(e.target.value)}
                        />
        
                    
                    {
                openSearch && (
                    recipe.map((r: any) => (
                        <Box key={r.title} p={2} border={1} borderRadius={2} m={1} width={200}>
                            <Typography variant="h6">
                                {r.title} 
                            </Typography>
                        
                        </Box>
                    ))
                )
            }
               

            
        </>
    )
}
