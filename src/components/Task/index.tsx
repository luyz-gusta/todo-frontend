import { GoPencil } from "react-icons/go";
import { LuTrash2 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { Task } from "../../types/task";
import { useContexts } from "../../hooks/useContexts";
import ModalTask from "../ModalTask";
import { toast } from "react-toastify";
import { deleteTask } from "../../utils/requestTask";
import { AxiosError } from "axios";
import { Response } from "../../types/response";

interface TaskProps {
  task: Task;
  index: number;
  handleStatus: (task: Task, index: number) => void;
  reloadTask: VoidFunction;
}

export default function TaskItem({
  task,
  index,
  handleStatus,
  reloadTask,
}: TaskProps) {
  const navigate = useNavigate();
  const { setIsOpenModal, isOpenModal } = useContexts();
  const handleDelete = async () => {
    try {
      if (task.id) {
        const returnData = await deleteTask(task.id);
        if (returnData.status === 200) {
          toast.success("Tarefa deletada com sucesso!");
          setIsOpenModal(false);
          reloadTask();
        } else {
          toast.error("Serviço fora do ar, tente novamente em outro momento.");
        }
      } else {
        toast.info("Tente deletar novamente");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorResponse = error.response?.data as Response<undefined>;
        if (errorResponse?.message) {
          toast.error(errorResponse.message);
        } else {
          toast.error("Serviço fora do ar, tente novamente em outro momento.");
        }
      } else {
        toast.error("Serviço fora do ar, tente novamente em outro momento.");
      }
    }
  };

  return (
    <>
      <div className="md:w-4/5 w-full flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <label className="inline-flex items-center" htmlFor="indigoCheckBox">
            <input
              onChange={() => handleStatus(task, index)}
              id="indigoCheckBox"
              type="checkbox"
              className={`w-8 h-8 accent-violet-600 ${
                task.status === "pendente" &&
                "appearance-none border border-violet-600 rounded-xs"
              }`}
              checked={task.status === "concluido"}
            />
          </label>
          <div>
            <p
              className={`text-2xl font-normal ${
                task.status === "concluido" && "line-through text-gray-600"
              } dark:text-white`}
            >
              {task.title}
            </p>
            <span className={`text-base font-normal ${
                task.status === "concluido" && "line-through text-gray-600/80"
              } dark:text-white/80`}>{`${task.description}`}{`${task.description}`}</span>
          </div>
        </div>
        <div className="flex gap-4">
          <GoPencil
            onClick={() => navigate(`/task?id=${task.id}`)}
            size={24}
            className="cursor-pointer hover:text-yellow-400 transition-all duration-300 dark:text-white"
          />
          <LuTrash2
            onClick={() => setIsOpenModal(true)}
            size={24}
            className="cursor-pointer hover:text-red-500 transition-all duration-300 dark:text-white"
          />
        </div>
      </div>
      <hr className="w-full border-violet-600" />
      <ModalTask
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        handleDelete={handleDelete}
      />
    </>
  );
}
