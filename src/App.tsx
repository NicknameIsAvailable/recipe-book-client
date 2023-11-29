import {Box, Container, Typography} from "@mui/joy";
import {Link, Outlet} from "react-router-dom";
import CreateModal from "./components/create-modal";

function Root() {
    return (
    <>
      <Container>
          <Box display="flex" justifyContent="space-between">
              <Link to="/">
                  <Typography level="h1">Книга рецептов</Typography>
              </Link>
              <CreateModal/>
          </Box>
          <Outlet/>
      </Container>
    </>
  )
}

export default Root
