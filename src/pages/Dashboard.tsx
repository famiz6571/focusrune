import Layout from "../layout/Layout";
import TaskList from "../components/TaskList";
import { useTasks, type Priority } from "../context/TaskContext";
import { useSelection } from "../context/SelectionContext";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import DateSelect from "../components/DateSelect";

export default function Dashboard() {
  const { tasks, addTask } = useTasks();
  const { selected, toggle } = useSelection();

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [dueDate, setDueDate] = useState("");
  const [recurring, setRecurring] = useState("");

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
      recurring: recurring || undefined,
    });

    setTitle("");
    setDueDate("");
    setRecurring("");
    setPriority("medium");
    toast.success("Task added");
  };

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      <div className="flex flex-col md:flex-row gap-2 mb-6 items-center">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="Task title"
          className="flex-1 p-2 border rounded dark:bg-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <DateSelect
          selected={dueDate}
          onChange={(val) => setDueDate(val)}
          placeholder="Due date"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className="p-2 border rounded dark:bg-gray-700"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select
          value={recurring}
          onChange={(e) => setRecurring(e.target.value)}
          className="p-2 border rounded dark:bg-gray-700"
        >
          <option value="">None</option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>

        <button
          onClick={handleAdd}
          className="flex items-center gap-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          <Plus size={16} /> Add
        </button>
      </div>

      <TaskList />
    </Layout>
  );
}
