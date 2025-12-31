import { useTasks } from "../context/TaskContext";
import { useSelection } from "../context/SelectionContext";

export default function BulkActions() {
  const { deleteTask, toggleTask } = useTasks();
  const { selected, clear } = useSelection();

  if (!selected.length) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-900 shadow-lg border rounded-lg px-4 py-2 flex gap-2">
      <button
        onClick={() => {
          selected.forEach(toggleTask);
          clear();
        }}
        className="btn"
      >
        Complete
      </button>

      <button
        onClick={() => {
          selected.forEach(deleteTask);
          clear();
        }}
        className="btn text-red-500"
      >
        Delete
      </button>
    </div>
  );
}
