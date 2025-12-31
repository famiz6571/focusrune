import { Menu } from "@headlessui/react";

export default function UserMenu() {
  return (
    <Menu as="div" className="relative">
      <Menu.Button
        aria-label="User menu"
        className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
      />

      <Menu.Items className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-900 rounded shadow focus:outline-none">
        <Menu.Item>
          {({ active }) => (
            <button
              className={`menu-item ${
                active && "bg-gray-100 dark:bg-gray-800"
              }`}
            >
              Profile
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              className={`menu-item ${
                active && "bg-gray-100 dark:bg-gray-800"
              }`}
            >
              Settings
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              className={`menu-item ${
                active && "bg-gray-100 dark:bg-gray-800"
              }`}
            >
              Logout
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}
