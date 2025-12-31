import { useState, useMemo } from "react";
import { Trash2, GripVertical } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

interface Category {
  id: string;
  name: string;
  color: string;
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");

  const handleAddCategory = () => {
    if (!title.trim()) return toast.error("Category name required");
    const newCategory: Category = {
      id: crypto.randomUUID(),
      name: title.trim(),
      color: randomColor(),
    };
    setCategories([...categories, newCategory]);
    setTitle("");
    toast.success("Category added");
  };

  const handleDeleteCategory = (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((c) => c.id !== id));
      toast.success("Category deleted");
    }
  };

  const handleEditCategory = (id: string, name: string) => {
    setCategories(categories.map((c) => (c.id === id ? { ...c, name } : c)));
    toast.success("Category updated");
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(categories);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);
    setCategories(items);
  };

  const filteredCategories = useMemo(
    () =>
      categories.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      ),
    [categories, search]
  );

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Categories
      </h2>

      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search categories..."
        className="w-full md:w-1/2 mb-4 p-2 border rounded dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Add Category */}
      <div className="flex flex-col md:flex-row gap-2 mb-6 items-center">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
          placeholder="New category"
          className="flex-1 p-2 border rounded dark:bg-gray-700 dark:text-gray-100 outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleAddCategory}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded w-full md:w-auto"
        >
          Add
        </button>
      </div>

      {/* Categories List */}
      {filteredCategories.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No categories found.</p>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="categories">
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-3"
              >
                {filteredCategories.map((cat, index) => (
                  <Draggable key={cat.id} draggableId={cat.id} index={index}>
                    {(provided) => (
                      <motion.li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-white dark:bg-gray-800 rounded shadow p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-2"
                      >
                        {/* Left section */}
                        <div className="flex items-center gap-2 w-full md:w-auto">
                          <span
                            {...provided.dragHandleProps}
                            className="cursor-grab text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          >
                            <GripVertical size={16} />
                          </span>

                          <EditableLabel
                            text={cat.name}
                            onSave={(name) => handleEditCategory(cat.id, name)}
                            color={cat.color}
                          />
                        </div>

                        {/* Right section */}
                        <button
                          onClick={() => handleDeleteCategory(cat.id)}
                          className="flex items-center gap-1 text-red-500 hover:text-red-700 mt-2 md:mt-0"
                        >
                          <Trash2 size={16} /> Delete
                        </button>
                      </motion.li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
}

// Editable label component
function EditableLabel({
  text,
  onSave,
  color,
}: {
  text: string;
  onSave: (text: string) => void;
  color?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(text);

  return editing ? (
    <input
      autoFocus
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => {
        onSave(value.trim() || text);
        setEditing(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onSave(value.trim() || text);
          setEditing(false);
        }
        if (e.key === "Escape") setEditing(false);
      }}
      className="bg-gray-100 dark:bg-gray-700 rounded p-1 outline-none w-full"
    />
  ) : (
    <span
      onDoubleClick={() => setEditing(true)}
      className="cursor-pointer select-none flex items-center gap-2 font-medium"
    >
      {color && (
        <span
          className="w-3 h-3 rounded-full flex-shrink-0"
          style={{ backgroundColor: color }}
        />
      )}
      {text}
    </span>
  );
}

// Utility to generate random pastel colors
function randomColor() {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 70%)`;
}
