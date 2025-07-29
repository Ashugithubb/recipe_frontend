
import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Button,
} from '@mui/material';

interface RecipeCardProps {
  id:number,
  title: string;
  imageUrl: string;
  ingredients: string[];
  steps: string[];
}
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';
const RecipeCard: React.FC<RecipeCardProps> = ({ id,title, imageUrl, ingredients, steps }) => {
    const handelFavouriteClick = async (id:number)=>{
            try{
                const res = await axios.post(`http://localhost:3001/recipe/favourite/${id}`,{},{withCredentials: true}
                
                );
                console.log(res.data);
            }
            catch(error){
                console.log(error);
            }
    }
  return (
    <Card sx={{ maxWidth: 345, borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" fontWeight="bold">
          {title}
        </Typography>

        <Typography variant="subtitle2" fontWeight="bold" color="text.secondary" gutterBottom>
          Ingredients
        </Typography>
        <List dense disablePadding>
          {ingredients.map((ingredient, index) => (
            <ListItem key={index} disableGutters>
              <ListItemText primary={`• ${ingredient}`} />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 1.5 }} />

        <Typography variant="subtitle2" fontWeight="bold" color="text.secondary" gutterBottom>
          Steps
        </Typography>
        <List dense disablePadding>
          {steps.map((step, index) => (
            <ListItem key={index} disableGutters>
              <ListItemText primary={`${index + 1}. ${step}`} />
            </ListItem>
          ))}
        </List>
      </CardContent>
      <Button onClick= {()=>handelFavouriteClick(id)} variant="contained" sx={{background:"light", color:"black"}}><FavoriteIcon sx={{color:"red"}}/>Add to Favorite</Button>
    </Card>
  );
};

export default RecipeCard;
