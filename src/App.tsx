import Loading from "./components/Loading";
import { useContexts } from "./hooks/useContexts";
import ToDoList from "./pages/ToDoList";

function App() {
  const { showLoading } = useContexts();

  return (
    <>
      <ToDoList />
      <Loading text="Carregando..." showLoading={showLoading}/>
    </>
  );
}

export default App;
