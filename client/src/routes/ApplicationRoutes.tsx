import { FC } from "react"
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

const ApplicationRoutes: FC = () => {
    return (<RouterProvider router={router} />);
}

export default ApplicationRoutes;