import React from "react";
import "./App.css";
import { TodoList } from "./components/TodoList";

export const App = (): JSX.Element => {
  return (
    <div>
      <header>
        <h1>~ React Todo App of Typescript ~</h1>
      </header>
      <TodoList />
    </div>
  );
};
