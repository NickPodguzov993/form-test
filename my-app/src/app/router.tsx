import { createBrowserRouter, Navigate } from "react-router-dom";
import { Step1Page } from "../pages/Step1Page";
import { Step2Page } from "../pages/Step2Page";
import { Step3Page } from "../pages/Step3Page";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/step-1" replace />,
    },
    {
        path: "/step-1",
        element: <Step1Page />,
    },
    {
        path: "/step-2",
        element: <Step2Page />,
    },
    {
        path: "/step-3",
        element: <Step3Page />,
    },
    {
        path: "*",
        element: <Navigate to="/step-1" replace />,
    },
]);