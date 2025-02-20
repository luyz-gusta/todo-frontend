import { AxiosError } from "axios";
import { FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContexts } from "../../hooks/useContexts";
import { Response } from "../../types/response";
import { Task } from "../../types/task";
import { createTask, getTaskById, updateTask } from "../../utils/requestTask";

export default function TaskHandler() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const [task, setTask] = useState<Task>({
    description: "",
    title: "",
    status: "pendente",
  });
  const { setShowLoading } = useContexts();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async (idTask: string) => {
      const response = await getTaskById(idTask);
      setTask(response.data);
    };

    if (id) {
      fetchTask(id);
    }
  }, [id]);

  const handleCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setShowLoading(true);
      const returnData = await createTask(task);
      if (returnData.status === 201) {
        toast.success("Tarefa criada com sucesso!");
        navigate("/");
      } else {
        toast.error("Serviço fora do ar, tente novamente em outro momento.");
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
    } finally {
      setShowLoading(false);
    }
  };

  const handleEdit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (task) {
      try {
        setShowLoading(true);
        const returnData = await updateTask(task);
        if (returnData.status === 200) {
          toast.success("Tarefa atualizada com sucesso!");
          navigate("/");
        } else {
          toast.error("Serviço fora do ar, tente novamente em outro momento.");
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          const errorResponse = error.response?.data as Response<undefined>;
          if (errorResponse?.message) {
            toast.error(errorResponse.message);
          } else {
            toast.error(
              "Serviço fora do ar, tente novamente em outro momento."
            );
          }
        } else {
          toast.error("Serviço fora do ar, tente novamente em outro momento.");
        }
      } finally {
        setShowLoading(false);
      }
    } else {
      toast.info("Tente atualizar novamente");
    }
  };

  return (
    <main className="flex flex-col justify-between items-center h-full py-10 dark:bg-[#252525]   ">
      <section className="flex flex-col items-center h-full w-full ">
        <h1 className="text-5xl font-bold mb-10 dark:text-white">
          {id ? "Atualizar Tarefa" : "Nova Tarefa"}
        </h1>
        <form
          className="w-full md:w-2/4 md:px-0 px-10 flex flex-col"
          onSubmit={(e) => (id ? handleEdit(e) : handleCreate(e))}
        >
          <div
            className="flex flex-col gap-2 my-4 w-full
          "
          >
            <label
              htmlFor="title"
              className="text-2xl font-medium leading-none w-full
                  text-start peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white text-violet-600"
            >
              Título
            </label>
            <input
              type={"text"}
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              name="title"
              placeholder="Digite o titulo da sua tarefa..."
              className={
                "flex h-12 w-full min-w-80 rounded-md border border-violet-600 bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-xl dark:border-white dark:text-white dark:placeholder:text-gray-400"
              }
            />
          </div>
          <div className="flex flex-col gap-2 my-4  w-full">
            <label
              htmlFor="description"
              className="text-2xl font-medium leading-none w-full
                  text-start peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white text-violet-600"
            >
              Descrição
            </label>
            <textarea
              value={task.description}
              onChange={(e) =>
                setTask({ ...task, description: e.target.value })
              }
              name="description"
              placeholder="Digite a descrição da sua tarefa..."
              className={
                "flex min-h-30 resize-none w-full min-w-80 rounded-md border border-violet-600 bg-transparent px-3 py-1 text-2xl shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-xl dark:border-white dark:text-white dark:placeholder:text-gray-400"
              }
            />
          </div>
          <button
            type="submit"
            className="text-white bg-violet-600 hover:bg-violet-800 transition-all duration-300 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xl  px-10 py-4 mr-2 mt-10 cursor-pointer text-center flex justify-center items-center"
          >
            Salvar
          </button>
        </form>
      </section>
    </main>
  );
}
