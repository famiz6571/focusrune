import { createContext, useContext, useState, type ReactNode } from "react";

export type Priority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority?: Priority;
  dueDate?: string;
  recurring?: string;
}

interface TaskPayload {
  title: string;
  priority?: Priority;
  dueDate?: string;
  recurring?: string;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (payload: TaskPayload) => void;
  editTask: (id: string, payload: Partial<TaskPayload>) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  reorderTasks: (from: number, to: number) => void;
  undo: () => void;
  redo: () => void;
}

const TaskContext = createContext<TaskContextType>({} as TaskContextType);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [past, setPast] = useState<Task[][]>([]);
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Welcome to FocusRune", completed: false },
  ]);
  const [future, setFuture] = useState<Task[][]>([]);

  const commit = (newTasks: Task[]) => {
    setPast([...past, tasks]);
    setTasks(newTasks);
    setFuture([]);
  };

  const addTask = ({ title, priority, dueDate, recurring }: TaskPayload) =>
    commit([
      ...tasks,
      {
        id: crypto.randomUUID(),
        title,
        completed: false,
        priority,
        dueDate,
        recurring,
      },
    ]);

  const editTask = (id: string, payload: Partial<TaskPayload>) =>
    commit(tasks.map((t) => (t.id === id ? { ...t, ...payload } : t)));

  const deleteTask = (id: string) => commit(tasks.filter((t) => t.id !== id));

  const toggleTask = (id: string) =>
    commit(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );

  const reorderTasks = (from: number, to: number) => {
    const copy = [...tasks];
    const [moved] = copy.splice(from, 1);
    copy.splice(to, 0, moved);
    commit(copy);
  };

  const undo = () => {
    if (!past.length) return;
    const prev = past[past.length - 1];
    setPast(past.slice(0, -1));
    setFuture([tasks, ...future]);
    setTasks(prev);
  };

  const redo = () => {
    if (!future.length) return;
    const next = future[0];
    setFuture(future.slice(1));
    setPast([...past, tasks]);
    setTasks(next);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        editTask,
        deleteTask,
        toggleTask,
        reorderTasks,
        undo,
        redo,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);
