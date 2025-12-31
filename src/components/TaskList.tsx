import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useTasks } from "../context/TaskContext";
import TaskCard from "./TaskCard";
import { motion } from "framer-motion";

export default function TaskList() {
  const { tasks, reorderTasks } = useTasks();

  return (
    <DragDropContext
      onDragEnd={(res) => {
        if (!res.destination) return;
        reorderTasks(res.source.index, res.destination.index);
      }}
    >
      <Droppable droppableId="tasks">
        {(p) => (
          <motion.div
            ref={p.innerRef}
            {...p.droppableProps}
            layout
            className="space-y-2"
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(p, snapshot) => (
                  <div
                    ref={p.innerRef}
                    {...p.draggableProps}
                    className={`transition ${
                      snapshot.isDragging ? "opacity-90" : ""
                    }`}
                  >
                    <TaskCard task={task} dragHandleProps={p.dragHandleProps} />
                  </div>
                )}
              </Draggable>
            ))}
            {p.placeholder}
          </motion.div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
