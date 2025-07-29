'use client'
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Navbar from "./component/navbar";
import { useAppDispatch, useAppSelector } from "./redux/hook/hook";
import { AddRecipe } from "./component/add.recipe";
import RecipeList from "./component/recipe.list";
import SeeAllSurvey from "./component/search.recipe";
import { toast ,ToastContainer} from "react-toastify";


export default function Home() {
  const dispatch = useAppDispatch()
  const [openAdd, setOpenAdd] = useState(false);
  const fav = useAppSelector((state)=>state.user.profile?.favourite)
  const email = useAppSelector((state)=>state.user.profile?.email)
  console.log(fav);
  const handeAddClick = () => {
    if(!email){
      toast("Log in to add recipe");
    }
    else{
       setOpenAdd(!openAdd);
    }
   
  }

  return (

    <>
      <Navbar />
     <Box sx={{display:"flex",justifyContent:"end"}}> <Button variant="contained">Favorites Recipe</Button></Box>
      <SeeAllSurvey />
      <RecipeList />
      <Button onClick={handeAddClick} variant="contained">Add Recipe</Button>
      <ToastContainer/>
      {openAdd && (
        <Box
          sx={{
            position: "fixed",
            top: 150,
            left: 0,
            width: 400,
            height: "80vh",
            bgcolor: "background.paper",
            boxShadow: 3,
            zIndex: 1300,
            overflowY: "auto",
            p: 2,
          }}
        >
          <AddRecipe />
        </Box>

      )}

    </>
  );
}