import { useEffect } from "react";

export function useKeyboardShortcuts(actions: {
  togglePalette: () => void;
  undo: () => void;
  redo: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const cmd = e.metaKey || e.ctrlKey;

      if (cmd && e.key === "k") {
        e.preventDefault();
        actions.togglePalette();
      }

      if (cmd && e.key === "z") {
        e.preventDefault();
        e.shiftKey ? actions.redo() : actions.undo();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
}
