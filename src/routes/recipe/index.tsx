import {Box, CircularProgress, List, ListItem, Typography} from "@mui/joy";
import {useParams} from "react-router-dom";
import api from "../../api.ts";
import {useEffect, useState} from "react";

type Recipe = {
    id: number,
    title: string,
    created_at: string,
    description: string,
    ingredients: string[],
    instruction: string
}

const Recipe = () => {
    const params = useParams()
    const recipeId: string | undefined = params.id
    const [recipe, setRecipe] = useState<Recipe>()

    const getData = async () => {
        const response = await api.get(`/recipes?recipe_id=${recipeId}`)
        setRecipe(response.data.response.data[0])
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <Box display="flex" flexDirection="column" gap={3}>
            {recipe ?
                <>
                    <Box>
                        <Typography level="h1">{recipe?.title}</Typography>
                        <Typography>{recipe?.description}</Typography>
                    </Box>
                    <Box>
                        <Typography level="h3">Ингредиенты</Typography>
                        <List>
                            {recipe?.ingredients.map(ingredient => <ListItem>{ingredient}</ListItem>)}
                        </List>
                    </Box>

                    <Box gap={1}>
                        <Typography level="h3">Инструкция по приготовлению</Typography>
                        <Typography>
                            {recipe?.instruction}
                        </Typography>
                    </Box>
                </>
        : <CircularProgress/>
            }

        </Box>
    );
};

export default Recipe;