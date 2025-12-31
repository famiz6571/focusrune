import { ThemeProvider } from "./context/ThemeContext";
import { TaskProvider } from "./context/TaskContext";
import { SelectionProvider } from "./context/SelectionContext";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Tasks from "./pages/Tasks";

export default function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <SelectionProvider>
          <Toaster position="top-right" />

          <BrowserRouter>
            <Routes>
              {/* Layout wraps all routes */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="/dashboard" />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="tasks" element={<Tasks />} />
                <Route path="categories" element={<Categories />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </SelectionProvider>
      </TaskProvider>
    </ThemeProvider>
  );
}
