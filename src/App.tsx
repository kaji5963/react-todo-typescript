import "./App.css";
import { Header } from "./components/Header";
import { TodoList } from "./components/TodoList";

export const App = () => {
  return (
      <div>
        <Header />
        <TodoList />
      </div>
  );
};
