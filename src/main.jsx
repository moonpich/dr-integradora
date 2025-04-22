import { createRoot } from "react-dom/client";
import "./index.css";
import { HeroUIProvider } from "@heroui/react";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import { RegisterPage } from "./auth/page/RegisterPage.jsx";
import ToDos from "./dashboard/pages/ToDoS.jsx";
import { AuthProvider } from "./auth/providers/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <HeroUIProvider>
        {/* <ToastProvider
          toastProps={{
            radius: "large",
            variant: "flat",
            timeout: 1000,
          }}
        > */}
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/todos" element={<ToDos />} />
        </Routes>
        {/* </ToastProvider> */}
      </HeroUIProvider>
    </AuthProvider>
  </BrowserRouter>
);
