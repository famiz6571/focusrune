import { LayoutDashboard, ListTodo, Tags, X } from "lucide-react";
import { NavLink } from "react-router-dom";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: Props) {
  const menuItems = [
    {
      icon: <LayoutDashboard size={16} />,
      label: "Dashboard",
      to: "/dashboard",
    },
    { icon: <ListTodo size={16} />, label: "Tasks", to: "/tasks" },
    { icon: <Tags size={16} />, label: "Categories", to: "/categories" },
  ];

  return (
    <>
      {/* Overlay (mobile) */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <aside
        className={`fixed md:static z-50 w-64 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b dark:border-gray-800">
          <span className="font-semibold text-gray-800 dark:text-gray-100">
            Workspace
          </span>
          <button onClick={onClose} className="md:hidden">
            <X size={18} />
          </button>
        </div>

        {/* Menu */}
        <nav className="p-3 space-y-1 text-sm">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded transition font-medium ${
                  isActive
                    ? "bg-blue-500 text-white dark:bg-blue-600"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`
              }
              onClick={onClose} // close sidebar on mobile
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
