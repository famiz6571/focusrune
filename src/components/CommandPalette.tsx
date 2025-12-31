import { Dialog, Transition, Listbox } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { useTasks, type Priority } from "../context/TaskContext";
import DateSelect from "./DateSelect";
import { Plus, RotateCcw, RotateCw } from "lucide-react";

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

const priorityOptions: Priority[] = ["low", "medium", "high"];
const recurringOptions = ["None", "Daily", "Weekly", "Monthly"];

export default function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const { tasks, addTask, undo, redo } = useTasks();
  const [query, setQuery] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [dueDate, setDueDate] = useState("");
  const [recurring, setRecurring] = useState("None");
  const [suggestions, setSuggestions] = useState<typeof tasks>([]);

  // Filter task suggestions based on query
  useEffect(() => {
    if (!query) setSuggestions([]);
    else
      setSuggestions(
        tasks.filter((t) => t.title.toLowerCase().includes(query.toLowerCase()))
      );
  }, [query, tasks]);

  const handleAdd = () => {
    if (!query.trim()) return;

    addTask({
      title: query.trim(),
      priority,
      dueDate: dueDate || undefined,
      recurring: recurring !== "None" ? recurring : undefined,
    });

    setQuery("");
    setPriority("medium");
    setDueDate("");
    setRecurring("None");
    onClose();
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-start justify-center pt-20 px-4">
          <Transition.Child
            as={Fragment}
            enter="transition ease-out duration-200 transform"
            enterFrom="opacity-0 translate-y-4"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150 transform"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-4"
          >
            <Dialog.Panel className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-xl shadow-lg p-5 border dark:border-gray-700">
              <Dialog.Title className="text-lg font-semibold mb-3">
                Command Palette
              </Dialog.Title>

              {/* Undo / Redo */}
              <div className="flex gap-2 mb-3">
                <button
                  onClick={undo}
                  className="flex-1 flex items-center justify-center gap-1 p-2 border rounded dark:border-gray-700 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <RotateCcw size={16} /> Undo
                </button>
                <button
                  onClick={redo}
                  className="flex-1 flex items-center justify-center gap-1 p-2 border rounded dark:border-gray-700 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <RotateCw size={16} /> Redo
                </button>
              </div>

              {/* Task input */}
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a task..."
                className="w-full p-2 mb-3 rounded border dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-100"
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              />

              {/* Suggestions */}
              {suggestions.length > 0 && (
                <div className="max-h-40 overflow-auto mb-3 border rounded dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  {suggestions.map((t) => (
                    <div
                      key={t.id}
                      className="px-3 py-2 cursor-pointer hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600"
                      onClick={() => {
                        setQuery(t.title);
                        setSuggestions([]);
                      }}
                    >
                      {t.title}
                    </div>
                  ))}
                </div>
              )}

              {/* Controls */}
              <div className="flex flex-col md:flex-row gap-2 mb-3">
                {/* Priority */}
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

                {/* Due date */}
                <DateSelect
                  selected={dueDate}
                  onChange={setDueDate}
                  placeholder="Due date"
                />

                {/* Recurring */}
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
              </div>

              <button
                onClick={handleAdd}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
              >
                <Plus size={16} /> Add Task
              </button>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
