"use client"
import axios from "axios";
import { DropResult, DragDropContext } from "@hello-pangea/dnd";
import Column from "./Column";
import { useState, useEffect }  from "react";
import { useRouter } from "next/navigation";
import { Task, BoardTypes } from "@/types/types";
import { SyncLoader } from "react-spinners";
import { FaPlus } from "react-icons/fa";
import Modal from "./ui/Modal";
import { createTask } from "@/app/actions/boardActions";

const Board:React.FC<{board: BoardTypes | null}> = ({
  board,
}) => {
    const [tasks, setTask] = useState<Task[] | null>
    (null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [isCreate, setIsCreate] = useState(false)
  useEffect(() => {
    if (board) {
      setTask(board.tasks)
      setLoading(false)
    } else {
      router.push("/onboarding")
    }
  }, [board]);

  const openModal = () => {
    setIsCreate(true);
  }

  const closeModal = () => {
    setIsCreate(false);
  }

  const onDragEnd = (result: DropResult) => {
    const {source, destination, draggableId} = result;

    if (!destination) return

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return

    const draggedTask = tasks!.find(
      (task) => task.id === draggableId);

      let updatedStatus: string

      switch (destination.droppableId) {
        case "backlog":
          updatedStatus = "BACKLOG"
          break;
          case "todo":
          updatedStatus = "TODO"
          break;
          case "inProgress":
          updatedStatus = "IN_PROGRESS"
          break;
          case "designed":
          updatedStatus = "DESIGNED"
          break;
          default:
            updatedStatus = draggedTask!.status;
      }
      
      try {
        axios.post("/api/updateTaskStatus", {
          taskId: draggableId,
          newStatus: updatedStatus,
        });
      } catch (error) {
        console.log(error);
      }

      const updatedTask = tasks!.map((task) => {
        if (task.id === draggableId) {
          return {

            ...task,
            status: updatedStatus,
          };
        }
        return task
      });

      setTask(updatedTask);
  };

  if (loading) {
    return(
      <div className="h-screen w-full flex justify-center items-center">
        <SyncLoader color="#fff" />
      </div>
    )
  }

  return (
    <div className="bg-black py -8 relative
    h-screen">
      <h1 className="font-extrabold text-left m-6
      text-4xl pl-10 ">
        {board!.name}
      
      </h1>
      <p className="font-thin pl-10 text-start underline mb-5" >by Ahmet T. Visit website</p>
      
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid md:grid-cols-4
        max-md:items-center w-[90%] max-w-[1500px]
        mx-auto md:gap-5 gap-10">

          <button
          className="bg-gray-700 rounded-full hover:bg-gray-600
          text-white font-bold p-4 absolute right-10 bottom-10"
          onClick={openModal}
          >
            <FaPlus />
          </button>
          {isCreate && 
          <Modal
          closeModal={closeModal}
          title="Create New Task"
          isCreate={isCreate}
          action={createTask}
          value={board!.id}
          />
          }
          <Column 
          title="Backlog"
          tasks={tasks!.filter((task) => task.status === "BACKLOG")}
          droppableId="backlog"
          />
          <Column 
          title="Todo"
          tasks={tasks!.filter((task) => task.status === "TODO")}
          droppableId="todo"
          />
          <Column 
          title="In Progress"
          tasks={tasks!.filter((task) => task.status === "IN_PROGRESS")}
          droppableId="inProgress"
          />
          <Column 
          title="Designed"
          tasks={tasks!.filter((task) => task.status === "DESIGNED")}
          droppableId="designed"
          />
          
        </div>

      </DragDropContext>
    
    </div>
  )
}

export default Board;