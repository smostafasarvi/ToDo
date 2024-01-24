import "./styles/App.scss";

// Loading Components
import MainHeader from "./components/header/main";
import ToDoInput from "./components/Todo/body";

function App() {
  return (
    <>
      <MainHeader />
      <ToDoInput />
    </>
  );
}

export default App;
