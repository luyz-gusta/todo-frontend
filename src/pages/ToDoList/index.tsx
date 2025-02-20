import { useEffect, useState } from "react";
import { HiPlusSmall } from "react-icons/hi2";
import { IoSunnyOutline } from "react-icons/io5";
import { TbMoon } from "react-icons/tb";
import { toast } from "react-toastify";
import TaskItem from "../../components/Task";
import { useContexts } from "../../hooks/useContexts";
import { Task } from "../../types/task";
import { getAllTask, updateTask } from "../../utils/requestTask";
import { useNavigate } from "react-router-dom";

export default function ToDoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { setTheme, theme } = useContexts();
  const [animate, setAnimate] = useState(false);
  const [valueAnimate, setValueAnimate] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setAnimate(true);

    const timer = setTimeout(() => {
      setAnimate(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [valueAnimate]);

  const handleChange = () => {
    setValueAnimate(valueAnimate + 1);
  };

  const fetch = async () => {
    const tasks = await getAllTask();
    if (tasks.status === 200) {
      setTasks(tasks.data);
    }
  };

  const handleStatus = async (task: Task, index: number) => {
    const newStatus: "pendente" | "concluido" =
      task.status === "pendente" ? "concluido" : "pendente";

    try {
      const newList = [...tasks];
      const updatedTask = { ...task, status: newStatus };

      newList[index] = updatedTask;
      setTasks(newList);

      const returnData = await updateTask(updatedTask);
      if (returnData.status != 200) {
        toast.warning("Serviço fora do ar, tente novamente em outro momento.");
      }
    } catch {
      toast.info("Serviço fora do ar, tente novamente em outro momento.");
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <main className="flex flex-col justify-between items-center h-full py-5 dark:bg-[#252525]   ">
      <section className="flex flex-col items-center h-full w-full md:w-2/4 md:px-0 px-10 min-w-80 ">
        <h1 className="text-5xl font-bold mb-10 dark:text-white">ToDo List</h1>
        <div className="flex flex-col w-full items-center gap-5">
          {tasks.map((task, index) => (
            <TaskItem
              key={task.id}
              handleStatus={handleStatus}
              index={index}
              task={task}
              reloadTask={fetch}
            />
          ))}
        </div>
      </section>
      <section className="flex justify-end w-2/4 min-w-80 h-max ">
        <div className="flex flex-col gap-5">
          <span
            className={`flex items-center justify-center cursor-pointer bg-violet-500 text-white rounded-full drop-shadow-[0_0_5px_rgba(108,99,255,0.6)] transition-all duration-300 ease-in-out  hover:drop-shadow-[0_0px_10px_rgba(108,99,255,0.9)] py-2 px-1 ${
              animate ? "iconTheme" : ""
            }`}
            onClick={() => {
              setTheme(theme === "dark" ? "light" : "dark");
              handleChange();
            }}
          >
            {theme === "light" ? (
              <TbMoon size={48} />
            ) : (
              <IoSunnyOutline size={48} />
            )}
          </span>
          <span
            className="flex items-center justify-center cursor-pointer bg-violet-500 text-white rounded-full drop-shadow-[0_0_5px_rgba(108,99,255,0.6)] transition-all duration-300 ease-in-out  hover:drop-shadow-[0_0px_10px_rgba(108,99,255,0.9)]"
            onClick={() => navigate(`/task`)}
          >
            <HiPlusSmall size={60} />
          </span>
        </div>
      </section>
      {/* <ModalTask
        isEdit={false}
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        task={null}
        requestTask={handleCreate}
      /> */}
    </main>
  );
}
