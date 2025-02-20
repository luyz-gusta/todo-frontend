import { createBrowserRouter } from "react-router-dom";
import ToDoList from "../pages/ToDoList";
import TaskHandler from "../pages/TaskHandler";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ToDoList />,
    },
    {
        path: "/task",
        element: <TaskHandler />,
    },
    {
        path: "/task/:id",
        element: <TaskHandler />,
    },
    
])

export default router;