import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import CommandPalette from "../components/CommandPalette";
import { useTasks } from "../context/TaskContext";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [palette, setPalette] = useState(false);
  const { undo, redo } = useTasks();

  useKeyboardShortcuts({
    togglePalette: () => setPalette((p) => !p),
    undo,
    redo,
  });

  return (
    <>
      {/* ⌘K Command Palette */}
      <CommandPalette open={palette} onClose={() => setPalette(false)} />

      <div className="min-h-screen flex bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex flex-col flex-1">
          <Navbar onToggleSidebar={() => setSidebarOpen(true)} />

          <main className="flex-1 p-4 md:p-6">{children}</main>

          <Footer />
        </div>
      </div>
    </>
  );
}
