import { LayoutDashboard, ListTodo, Tags, X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: Props) {
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
          <span className="font-semibold">Workspace</span>
          <button onClick={onClose} className="md:hidden">
            <X size={18} />
          </button>
        </div>

        {/* Menu */}
        <nav className="p-3 space-y-1 text-sm">
          <MenuItem icon={<LayoutDashboard size={16} />} label="Dashboard" />
          <MenuItem icon={<ListTodo size={16} />} label="Tasks" />
          <MenuItem icon={<Tags size={16} />} label="Categories" />
        </nav>
      </aside>
    </>
  );
}

function MenuItem({ icon, label }: any) {
  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
      {icon}
      <span>{label}</span>
    </div>
  );
}
