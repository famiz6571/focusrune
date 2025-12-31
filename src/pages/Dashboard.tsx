import { useTasks } from "../context/TaskContext";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function Dashboard() {
  const { tasks } = useTasks();

  const completed = tasks.filter((t) => t.completed).length;
  const pending = tasks.length - completed;

  // Task stats by priority
  const priorityData = ["high", "medium", "low"].map((level) => ({
    name: level.charAt(0).toUpperCase() + level.slice(1),
    value: tasks.filter((t) => t.priority === level).length,
  }));

  // Recent activity (mocked)
  const last7Days = Array.from({ length: 7 })
    .map((_, i) => {
      const day = new Date();
      day.setDate(day.getDate() - i);
      const dayStr = day.toLocaleDateString("en-US", { weekday: "short" });
      const completedCount = Math.floor(Math.random() * 5); // Mock
      return { day: dayStr, completed: completedCount };
    })
    .reverse();

  const COLORS = ["#ef4444", "#facc15", "#22c55e"];

  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      {/* Top summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card title="Total Tasks" value={tasks.length} color="bg-blue-500" />
        <Card title="Completed" value={completed} color="bg-green-500" />
        <Card title="Pending" value={pending} color="bg-red-500" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Line chart: Tasks completed last 7 days */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Tasks Completed (Last 7 days)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={last7Days}>
              <XAxis dataKey="day" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#3b82f6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart: Tasks by priority */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Tasks by Priority</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={priorityData}
                dataKey="value"
                nameKey="name"
                outerRadius={70}
                label
              >
                {priorityData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent tasks */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Recent Tasks</h3>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {tasks.slice(-5).map((task) => (
            <li
              key={task.id}
              className="py-2 flex justify-between items-center"
            >
              <span
                className={task.completed ? "line-through text-gray-400" : ""}
              >
                {task.title}
              </span>
              <span
                className={`px-2 py-0.5 text-xs rounded ${
                  task.priority === "high"
                    ? "bg-red-500 text-white"
                    : task.priority === "medium"
                    ? "bg-yellow-400 text-black"
                    : "bg-green-500 text-white"
                }`}
              >
                {task.priority || "Medium"}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Could add calendar, upcoming deadlines, recurring tasks panel, etc. */}
    </>
  );
}

function Card({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) {
  return (
    <div className="flex items-center justify-between p-4 rounded shadow bg-white dark:bg-gray-800">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </p>
        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {value}
        </p>
      </div>
      <div
        className={`${color} w-12 h-12 rounded-full flex items-center justify-center`}
      >
        <span className="text-white font-bold">{value}</span>
      </div>
    </div>
  );
}
