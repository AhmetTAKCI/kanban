import { Droppable, Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import Modal from "./ui/Modal";
import { deleteTask, editTask } from "@/app/actions/boardActions";
import { Task } from "@/types/types";
import { FaTrashAlt, FaEdit, FaPalette } from "react-icons/fa";

interface ColumnProps {
  title: string;
  tasks: Task[];
  droppableId: string;
}

const Column: React.FC<ColumnProps> = ({ title, tasks, droppableId }) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [taskId, setTaskId] = useState<string | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [taskColors, setTaskColors] = useState<{ [key: string]: string }>({});

  const openDeleteModal = (taskId: string) => {
    setIsDelete(true);
    setTaskId(taskId);
  };

  const closeDeleteModal = () => {
    setIsDelete(false);
    setTaskId(null);
  };

  const openEditModal = (taskId: string) => {
    setIsEdit(true);
    setTaskId(taskId);
  };

  const closeEditModal = () => {
    setIsEdit(false);
    setTaskId(null);
  };

  const toggleTaskColor = (taskId: string) => {
    const currentColor = taskColors[taskId];
    const nextColor =
      currentColor === "bg-purple-900" ? "bg-blue-500" :
      currentColor === "bg-blue-500" ? "bg-pink-500" :
      currentColor === "bg-pink-500" ? "bg-red-500" :
      currentColor === "bg-red-500" ? "bg-green-500" :
      "bg-purple-900"; // Default to purple if no color is set

    setTaskColors((prevColors) => ({
      ...prevColors,
      [taskId]: nextColor,
    }));
  };

  return (
    <div className="flex-1 dark:bg-gray-800 bg-gray-200 rounded-lg p-4">
      <div className="flex gap-1 dark:text-white">
      
      
        <h2 className="font-extrabold mb-4 uppercase">{title}</h2>
        
      </div>

      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div
                    className={`rounded p-2 mb-2 text-white flex justify-between ${
                      taskColors[task.id] || "bg-purple-900"
                    }`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() => setHoverIndex(null)}
                  >
                    {task.name}
                    {hoverIndex === index && (
                      <div className="flex gap-3">
                        <FaEdit
                          className="text-xs text-gray-400 mt-1 cursor-pointer"
                          onClick={() => openEditModal(task.id)}
                        />
                        <FaTrashAlt
                          className="text-xs text-gray-400 mt-1 cursor-pointer"
                          onClick={() => openDeleteModal(task.id)}
                        />
                        <FaPalette
                          className="text-xs text-gray-400 mt-1 cursor-pointer"
                          onClick={() => toggleTaskColor(task.id)}
                        />
                      </div>
                    )}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {isEdit && (
        <Modal
          closeModal={closeEditModal}
          isEdit={isEdit}
          value={taskId!}
          action={editTask}
          title="Edit Task"
        />
      )}

      {isDelete && (
        <Modal
          closeModal={closeDeleteModal}
          title="Are you sure you want to delete this task?"
          value={taskId!}
          action={deleteTask}
          isDelete={isDelete}
        />
      )}
    </div>
  );
};

export default Column;
