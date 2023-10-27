import { RouteObject, createBrowserRouter } from "react-router-dom";
import PageRender from "./PageRender";
import Home from "../pages/Home";
import AuthLayout from "../layout/AuthLayout";
import NotFound from "../components/NotFound";
import UnAuthLayout from "../layout/UnAuthLayout";
import LogIn from "../pages/LogIn";

const routes: RouteObject[] = [
    /**
     *
     * here are the initial routes that we'll need in our system.
     * 1.
     * 2.
     */

    {
        path: "/",
        element: (
            <AuthLayout />
        ),
        children: [
            { index: true, element: <Home /> },
            { path: ':page', Component: PageRender },
            { path: ':page/:id', Component: PageRender },
        ]
    },
    {
        path: "/authentication",
        element: <UnAuthLayout />,
        children: [
            { path: "login", element: <LogIn /> },
        ]
    },
    {
        path: "*",
        element: (<NotFound />)
    }

]

export const router = createBrowserRouter(routes, {
    basename: "/",
});