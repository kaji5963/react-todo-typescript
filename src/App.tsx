import React from "react";
import "./App.css";
import { Form } from "./Form";
import { TodoList } from "./TodoList";

export const App = (): JSX.Element => {
  return (
    <>
      <body>
        <header>
          <h1>~ React TODO of Typescript ~</h1>
        </header>
        <Form />
        <TodoList />
      </body>
    </>
  );
};
