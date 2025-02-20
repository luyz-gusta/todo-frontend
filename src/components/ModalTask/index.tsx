import { useEffect } from "react";
import { Modal } from "../../types/modal";

export default function ModalTask({ isOpen, setIsOpen, handleDelete }: Modal) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        document.body.classList.remove("overflow-y-hidden");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [setIsOpen]);

  const closeModal = () => setIsOpen(false);

  return (
    <>
      {isOpen && (
        <div className="fixed z-50 inset-0 bg-black/20 overflow-y-auto h-full w-full px-4">
          <div className="relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md dark:bg-[#252525]">
            <div className="flex justify-end p-2">
              <button
                onClick={closeModal}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <div className="p-6 pt-0 text-center">
              <h2 className="text-3xl font-bold dark:text-white">
                Deseja mesmo excluir a tarefa?
              </h2>
              <div className="flex justify-center mt-6 gap-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white bg-gray-600 hover:bg-gray-800 transition-all duration-300 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-7 py-2 text-center mr-2 cursor-pointer"
                >
                  Cancelar
                </button>

                <button
                  onClick={handleDelete}
                  className="text-white bg-red-600 hover:bg-red-800 transition-all duration-300 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-7 py-2 text-center mr-2 cursor-pointer"
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
