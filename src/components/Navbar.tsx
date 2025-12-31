import { Menu } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface Props {
  onToggleSidebar: () => void;
}

export default function Navbar({ onToggleSidebar }: Props) {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Menu size={20} />
          </button>
          <span className="text-lg font-bold tracking-tight">FocusRune</span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="px-3 py-1.5 rounded bg-gray-100 dark:bg-gray-800 text-sm hover:opacity-80"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>

          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
        </div>
      </div>
    </header>
  );
}
