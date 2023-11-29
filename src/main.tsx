import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from "./App.tsx";
import NotFound from "./routes/not-found";
import Recipe from "./routes/recipe";
import RecipesList from "./routes/recipes-list";

const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <NotFound />,
        element: (
            <Root/>
        ),
        children: [
            {
                path: "/",
                element: <RecipesList/>,
            },
            {
                path: "recipes/:id",
                element: <Recipe/>,
            },
        ]
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
