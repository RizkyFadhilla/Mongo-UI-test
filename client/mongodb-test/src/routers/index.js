import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
]);

export default router
