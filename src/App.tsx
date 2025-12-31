import { ThemeProvider } from "./context/ThemeContext";
import { TaskProvider } from "./context/TaskContext";
import { SelectionProvider } from "./context/SelectionContext";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <SelectionProvider>
          <Toaster position="top-right" />
          <Dashboard />
        </SelectionProvider>
      </TaskProvider>
    </ThemeProvider>
  );
}
