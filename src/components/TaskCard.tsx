import { motion } from "framer-motion";
import { useTasks } from "../context/TaskContext";
import { useSelection } from "../context/SelectionContext";
import { useState, useEffect, useRef } from "react";
import { GripVertical, Trash2, Pencil, Repeat, Calendar } from "lucide-react";
import { useSwipeable } from "react-swipeable";

interface TaskCardProps {
  task: any;
  dragHandleProps?: any;
}

export default function TaskCard({ task, dragHandleProps }: TaskCardProps) {
  const { toggleTask, deleteTask, editTask } = useTasks();
  const { selected, toggle } = useSelection();

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const save = () => {
    if (title.trim()) editTask(task.id, { title: title.trim() });
    setEditing(false);
  };

  const swipe = useSwipeable({
    onSwipedLeft: () => deleteTask(task.id),
    onSwipedRight: () => toggleTask(task.id),
    trackMouse: true,
  });

  const isSelected = selected.includes(task.id);

  return (
    <motion.div
      {...swipe}
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className={`group flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg border ${
        isSelected ? "border-blue-500" : "border-gray-200 dark:border-gray-700"
      } hover:shadow-md transition relative`}
    >
      {/* Drag handle */}
      <button
        {...dragHandleProps}
        aria-label="Drag task"
        className="cursor-grab text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
      >
        <GripVertical size={16} />
      </button>

      {/* Checkbox / multi-select */}
      <input
        type="checkbox"
        checked={isSelected || task.completed}
        onChange={() => toggle(task.id)}
        className="h-4 w-4 accent-blue-600"
      />

      {/* Title + badges */}
      <div className="flex-1 flex flex-col">
        {editing ? (
          <input
            ref={inputRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") save();
              if (e.key === "Escape") setEditing(false);
            }}
            onBlur={save}
            className="w-full bg-transparent outline-none border-b border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        ) : (
          <span
            className={`block cursor-text ${
              task.completed
                ? "line-through text-gray-400"
                : "text-gray-800 dark:text-gray-100"
            }`}
            onDoubleClick={() => setEditing(true)}
          >
            {task.title}
          </span>
        )}

        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
          {task.dueDate && (
            <span className="flex items-center gap-1">
              <Calendar size={12} /> {task.dueDate}
            </span>
          )}
          {task.recurring && (
            <span className="flex items-center gap-1 text-blue-500">
              <Repeat size={12} /> {task.recurring}
            </span>
          )}
          {task.priority && (
            <span
              className={`text-white text-[10px] px-2 py-0.5 rounded ${
                task.priority === "high"
                  ? "bg-red-500"
                  : task.priority === "medium"
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
            >
              {task.priority}
            </span>
          )}
        </div>
      </div>

      {/* Action buttons always visible on hover */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
        <button
          onClick={() => setEditing(true)}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          title="Edit Task"
        >
          <Pencil size={16} className="text-gray-600 dark:text-gray-200" />
        </button>
        <button
          onClick={() => deleteTask(task.id)}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          title="Delete Task"
        >
          <Trash2 size={16} className="text-red-500" />
        </button>
      </div>
    </motion.div>
  );
}
