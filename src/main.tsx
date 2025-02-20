import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "./global.css";
import { GlobalProvider } from "./context/GlobalContext.tsx";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalProvider>
      <ToastContainer autoClose={3000} />
      <RouterProvider router={router}/>
    </GlobalProvider>
  </StrictMode>
);
