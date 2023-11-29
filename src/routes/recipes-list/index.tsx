import {Box, CircularProgress, List, ListItemButton, Typography} from "@mui/joy";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import api from "../../api.ts";

type Recipe = {
    id: number,
    title: string,
    description: string
}

const RecipesList = () => {

    const [recipes, setRecipes] = useState<Recipe[]>()

    const getData = async () => {
        const response = await api.get(`/recipes?recipe_id=0`)
        setRecipes(response.data.response.data)
    }

    console.log(recipes)

    useEffect(() => {
        getData()
    }, [])

    if (recipes)
    return (
        <Box padding={3}>
            <List>
                {recipes?.map(recipe =>
                    <Link to={`/recipes/${recipe.id}`}>
                        <ListItemButton>
                            <Typography level="h2">{recipe.title}</Typography>
                            <Typography>{recipe.description.slice(0, 150)}{recipe.description.length > 150 ? "..." : ""}</Typography>
                        </ListItemButton>
                    </Link>
                )}
            </List>
        </Box>
    );
    else
        return (
            <CircularProgress/>
        )
};

export default RecipesList;