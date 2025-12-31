import { Menu } from "@headlessui/react";
import { useTasks } from "../context/TaskContext";

export default function TaskMenu({ taskId }: { taskId: string }) {
  const { toggleTask } = useTasks();

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded">
        ⋮
      </Menu.Button>

      <Menu.Items className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded shadow">
        <Menu.Item>
          {({ active }) => (
            <button
              className={`w-full px-3 py-2 text-left ${
                active ? "bg-gray-100 dark:bg-gray-700" : ""
              }`}
              onClick={() => toggleTask(taskId)}
            >
              Toggle
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}
