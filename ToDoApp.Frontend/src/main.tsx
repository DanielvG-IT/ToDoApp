import "@/index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import TodoPage from "./pages/TodoPage";
import { AuthPage } from "@/pages/AuthPage";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/todos"
            element={
              <ProtectedRoute>
                <TodoPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/todos" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
