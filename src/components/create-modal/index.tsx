import {
    Box,
    Button,
    Input,
    List, ListItem,
    ListItemButton, ListItemDecorator,
    Modal,
    ModalClose,
    ModalDialog,
    Textarea,
    Typography
} from "@mui/joy";
import AddIcon from '@mui/icons-material/Add';
import {useState} from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import api from "../../api.ts";
import {useNavigate} from "react-router-dom";

type Inputs = {
    title: string,
    description: string,
    instruction: string
}

const CreateModal = () => {
    const [open, setOpen] = useState<boolean>(false)
    const [ingredients, setIngredients] = useState<string[]>([])

    const {
        register,
        handleSubmit,
    } = useForm<Inputs>()

    const navigate = useNavigate()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data)
        const params = {...data, ingredients}
        const response = await api.post("/recipes", params)

        if (response.data.success) {
            const id = response.data.data[1][0].id
            return navigate(`/recipes/${id}`)
        } else {
            alert("Не удалось добавить рецепт")
        }
    }

    const addIngredient = () => {
        const newIngredients: string[] = [...ingredients]
        newIngredients.push("")
        setIngredients(newIngredients)
    }

    const handleChangeIngredient = (value: string, index: number) => {
        const newIngredients: string[] = [...ingredients]
        newIngredients[index] = value
        setIngredients(newIngredients)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <Button onClick={handleOpen}>Добавить свой рецепт</Button>

            <Modal open={open}>
                <ModalDialog>
                    <Box padding={1} display="flex" flexDirection="column" gap={2}>
                        <ModalClose onClick={handleClose}/>
                        <Typography level="h2">Добавление рецепта</Typography>
                        <form onSubmit={handleSubmit(onSubmit)} style={{display: "flex", flexDirection: "column", gap: 12}}>
                            <label>
                                <Typography>Название</Typography>
                                <Input {...register("title", {required: true})} placeholder="Название"/>
                            </label>
                            <label>
                                <Typography>Описание</Typography>
                                <Input {...register("description", {required: true})} placeholder="Описание"/>
                            </label>
                            <label>
                                <Typography>Ингредиенты</Typography>
                                <List sx={{maxHeight: 200, overflowX: "scroll"}}>
                                    {ingredients.map((ingredient: string, index: number) =>
                                            <ListItem>
                                                <Input placeholder="Ингредиент" onChange={(event) => handleChangeIngredient(event.target.value, index)} value={ingredient}/>
                                            </ListItem>
                                    )}
                                    <ListItemButton onClick={addIngredient}>
                                        <ListItemDecorator>
                                            <AddIcon/>
                                        </ListItemDecorator>
                                        Добавить ингредиент
                                    </ListItemButton>
                                </List>
                            </label>
                            <label>
                                <Typography>Инструкция по приготовлению</Typography>
                                <Textarea {...register("instruction", {required: true})} minRows={5} placeholder="Крутая инструкция"/>
                            </label>
                            <Button type="submit">Добавить</Button>
                        </form>
                    </Box>
                </ModalDialog>
            </Modal>
        </>
    );
};

export default CreateModal;