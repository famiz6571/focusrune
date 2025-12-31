import TaskList from "../components/TaskList";
import { useTasks, type Priority } from "../context/TaskContext";
import { useSelection } from "../context/SelectionContext";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import DateSelect from "../components/DateSelect";
import { Listbox } from "@headlessui/react";

const priorityOptions: Priority[] = ["low", "medium", "high"];
const recurringOptions = ["None", "Daily", "Weekly", "Monthly"];

export default function Tasks() {
  const { tasks, addTask } = useTasks();
  const { selected, toggle } = useSelection();

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [dueDate, setDueDate] = useState("");
  const [recurring, setRecurring] = useState("None");

  // ⌘A / Ctrl+A select all
  useEffect(() => {
    const handleSelectAll = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "a") {
        e.preventDefault();
        tasks.forEach((t) => {
          if (!selected.includes(t.id)) toggle(t.id);
        });
      }
    };

    window.addEventListener("keydown", handleSelectAll);
    return () => window.removeEventListener("keydown", handleSelectAll);
  }, [tasks, selected, toggle]);

  const handleAdd = () => {
    if (!title.trim()) return toast.error("Task title required");

    addTask({
      title: title.trim(),
      priority,
      dueDate: dueDate || undefined,
      recurring: recurring !== "None" ? recurring : undefined,
    });

    setTitle("");
    setPriority("medium");
    setDueDate("");
    setRecurring("None");
    toast.success("Task added");
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Tasks</h2>

      {/* Task input and controls */}
      <div className="flex flex-col md:flex-row gap-2 mb-6 items-center">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="Task title"
          className="flex-1 p-2 border rounded dark:border-gray-700 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <DateSelect
          selected={dueDate}
          onChange={setDueDate}
          placeholder="Due date"
        />

        <Listbox value={priority} onChange={setPriority}>
          <div className="relative w-full md:w-32">
            <Listbox.Button className="w-full p-2 border rounded dark:border-gray-700 dark:bg-gray-700 flex items-center justify-between">
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </Listbox.Button>
            <Listbox.Options className="absolute mt-1 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg max-h-40 overflow-auto z-50">
              {priorityOptions.map((p) => (
                <Listbox.Option
                  key={p}
                  value={p}
                  className={({ active }) =>
                    `cursor-pointer select-none px-3 py-2 ${
                      active
                        ? "bg-blue-500 text-white"
                        : "text-gray-900 dark:text-gray-100"
                    }`
                  }
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>

        <Listbox value={recurring} onChange={setRecurring}>
          <div className="relative w-full md:w-32">
            <Listbox.Button className="w-full p-2 border rounded dark:border-gray-700 dark:bg-gray-700 flex items-center justify-between">
              {recurring}
            </Listbox.Button>
            <Listbox.Options className="absolute mt-1 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg max-h-40 overflow-auto z-50">
              {recurringOptions.map((r) => (
                <Listbox.Option
                  key={r}
                  value={r}
                  className={({ active }) =>
                    `cursor-pointer select-none px-3 py-2 ${
                      active
                        ? "bg-blue-500 text-white"
                        : "text-gray-900 dark:text-gray-100"
                    }`
                  }
                >
                  {r}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          <Plus size={16} /> Add
        </button>
      </div>

      {/* Task List */}
      <TaskList />
    </>
  );
}
