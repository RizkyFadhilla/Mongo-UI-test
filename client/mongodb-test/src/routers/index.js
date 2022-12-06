import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Home from "../pages/Home";
import UpdateUser from "../pages/updateForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/update",
    element: <UpdateUser />,
  },
]);

export default router;
