import { Dialog } from "@headlessui/react";
import { useTasks, type Priority } from "../context/TaskContext";
import { useState, useMemo } from "react";
import DateSelect from "./DateSelect";

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export default function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const { tasks, addTask, undo, redo } = useTasks();
  const [value, setValue] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [dueDate, setDueDate] = useState("");
  const [recurring, setRecurring] = useState("");

  // Filter existing tasks by input value
  const filteredTasks = useMemo(() => {
    if (!value.trim()) return [];
    return tasks.filter((t) =>
      t.title.toLowerCase().includes(value.toLowerCase())
    );
  }, [value, tasks]);

  const handleAddTask = () => {
    if (!value.trim()) return;
    addTask({
      title: value.trim(),
      priority,
      dueDate: dueDate || undefined,
      recurring: recurring || undefined,
    });
    setValue("");
    setPriority("medium");
    setDueDate("");
    setRecurring("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" />

      <Dialog.Panel className="fixed top-1/4 left-1/2 -translate-x-1/2 w-full max-w-lg bg-white dark:bg-gray-900 rounded shadow-lg p-4">
        <Dialog.Title className="text-sm font-semibold mb-2">
          Command Palette
        </Dialog.Title>

        <input
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
          placeholder="Type a command or task..."
          className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800 outline-none mb-2"
        />

        {/* Optional task fields */}
        <div className="flex gap-2 mb-2">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="p-1 border rounded dark:bg-gray-700"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <DateSelect
            selected={dueDate}
            onChange={setDueDate}
            placeholder="Select due date"
          />

          <select
            value={recurring}
            onChange={(e) => setRecurring(e.target.value)}
            className="p-1 border rounded dark:bg-gray-700"
          >
            <option value="">None</option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </div>

        {/* Task suggestions */}
        {filteredTasks.length > 0 && (
          <div className="max-h-40 overflow-y-auto mb-2 border-t border-b dark:border-gray-700">
            {filteredTasks.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setValue(t.title);
                }}
                className="w-full text-left px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {t.title}
              </button>
            ))}
          </div>
        )}

        {/* Commands */}
        <div className="mt-2 space-y-1 text-sm">
          <Command onClick={handleAddTask}>➕ Add Task</Command>
          <Command onClick={undo}>↩ Undo</Command>
          <Command onClick={redo}>↪ Redo</Command>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}

function Command({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      {children}
    </button>
  );
}
