import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import ChipDelete from "@mui/joy/ChipDelete";
import DeleteForever from "@mui/icons-material/DeleteForever";
import { pink } from "@mui/material/colors";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

export const TodoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [todo, setTodo] = useState<Todo[]>([]);

  type Todo = {
    id: number;
    inputValue: string;
    checked: boolean;
  };

  const initialState = {
    task: {
      id: Math.floor(Math.random() * 300),
      inputValue: inputValue,
      checked: false,
    },
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (inputValue === "") return;
    e.preventDefault();
    const newTodo: Todo = initialState.task;
    setTodo([newTodo, ...todo]);
    setInputValue("");
  };

  const handleAddButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (inputValue === "") return;
    const newTodo: Todo = initialState.task;
    setTodo([newTodo, ...todo]);
    setInputValue("");
  };

  const handleEdit = (id: number, inputValue: string) => {
    const editTodo = todo.map((todo) => {
      if (todo.id === id) {
        todo.inputValue = inputValue;
      }
      return todo;
    });
    setTodo(editTodo);
  };

  const handleDelete = (id: number) => {
    const deleteTodo = todo.filter((todo) => todo.id !== id);
    setTodo(deleteTodo);
  };

  const handleChecked = (id: number, checked: boolean) => {
    const checkTodo = todo.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });
    setTodo(checkTodo);
  };

  return (
    <>
      <div className="container-input">
        <form onSubmit={(e) => handleSubmit(e)}>
          <TextField
            label="Add Your Todo"
            id="filled-size-normal"
            variant="standard"
            value={inputValue}
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setInputValue(e.target.value)}
          />
          <Stack spacing={2} direction="row" className="addButton">
            <Button onClick={(e) => handleAddButton(e)} variant="contained">
              ADD TODO
            </Button>
          </Stack>
        </form>
      </div>

      <div className="container-button">
        <Stack spacing={2} direction="row" className="addButton">
          <Button onClick={() => alert("all")} variant="outlined">
            ALL
          </Button>
          <Button onClick={() => alert("complete")} variant="outlined">
            COMPLETE
          </Button>
          <Button onClick={() => alert("incomplete")} variant="outlined">
            INCOMPLETE
          </Button>
        </Stack>
      </div>

      {todo.map((todo) => {
        return (
          <div key={todo.id} className="container-list">
            <ul>
              <li>
                <input
                  type="text"
                  value={todo.inputValue}
                  onChange={(e) => handleEdit(todo.id, e.target.value)}
                  disabled={todo.checked}
                />
              </li>
              <Checkbox
                {...label}
                sx={{
                  color: pink[800],
                  "&.Mui-checked": {
                    color: pink[600],
                  },
                }}
                onChange={() => handleChecked(todo.id, todo.checked)}
              />

              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <ChipDelete
                  color="danger"
                  variant="plain"
                  onClick={() => handleDelete(todo.id)}
                >
                  <DeleteForever />
                </ChipDelete>
              </Box>
            </ul>
          </div>
        );
      })}
    </>
  );
};

