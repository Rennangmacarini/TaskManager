import "./index.css"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Toaster } from "sonner"

import HomePage from "./Pages/home.jsx"
import TaskDetailsPage from "./Pages/taskDetails.jsx"
import TasksPage from "./Pages/Tasks.jsx"

const queryClient = new QueryClient()

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/tasks",
        element: <TasksPage />,
    },
    {
        path: "/task/:taskId",
        element: <TaskDetailsPage />,
    },
])

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Toaster
                toastOptions={{
                    style: {
                        color: "#35383e",
                    },
                }}
            />

            <RouterProvider router={router} />
        </QueryClientProvider>
    </React.StrictMode>
)
