import {Box, Button, Container, Typography} from "@mui/joy";
import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <Container>
            <Box sx={{height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 2}}>
                <Typography level="h1">404</Typography>
                <Typography level="h3">Страница не найдена</Typography>
                <Link to="/">
                    <Button>Вернуться на главную</Button>
                </Link>
            </Box>
        </Container>
    );
};

export default NotFound;