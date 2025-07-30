'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Box,
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
    IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
interface Recipe {
    id: number;
    title: string;
    ingredients: string[];
    steps: string[];
    imageUrl: string | null;
}

interface Favorite {
    id: number;
    recipe: Recipe;
}

const FavoriteList: React.FC = () => {
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    // const [favorites, setFavorites] = useState<any[]>([]);
    useEffect(() => {
        axios.get<Favorite[]>('http://localhost:3001/favorite/list', {
            withCredentials: true
        })
            .then((res) => setFavorites(res.data))
            .catch((err) => console.error('Error fetching favorites', err));
    }, []);

    const handleDelete = async (id: number | string) => {
        
        try {
           
            const res = await axios.delete(`http://localhost:3001/favorite/delete/${id}`, {
                withCredentials: true
            })
            toast("recpie deleted");
             console.log(res.data);
        }
        catch (err) {
            console.log(err);
        }
    };


    return (
        <Box sx={{ p: 3 }}>
            <ToastContainer/>
            <Typography variant="h4" gutterBottom>
                Your Favorite Recipes
            </Typography>

            {favorites.map((fav) => (
                <Card key={fav.id} sx={{ mb: 3, boxShadow: 3 }}>
                    <CardContent>
                        <IconButton onClick={() => handleDelete(fav.id)} sx={{ color: "red" }}>
                            <DeleteIcon />
                        </IconButton>
                        <Typography variant="h6" gutterBottom>
                            {fav.recipe.title}
                        </Typography>

                        <Typography variant="subtitle1" gutterBottom>
                            Ingredients:
                        </Typography>
                        <List dense>
                            {fav.recipe.ingredients.map((ingredient, idx) => (
                                <ListItem key={idx}>
                                    <ListItemText primary={ingredient} />
                                </ListItem>
                            ))}
                        </List>

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="subtitle1" gutterBottom>
                            Steps:
                        </Typography>
                        <List dense>
                            {fav.recipe.steps.map((step, idx) => (
                                <ListItem key={idx}>
                                    <ListItemText primary={`${idx + 1}. ${step}`} />
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default FavoriteList;
