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

export const Form = () => {
  type Todo = {
    id: number;
    inputValue: string;
    checked: boolean;
  };

  const [inputValue, setInputValue] = useState("");
  const [todo, setTodo] = useState<Todo[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (inputValue === "") return;
    e.preventDefault();
    const newTodo: Todo = {
      id: Math.floor(Math.random() * 300),
      inputValue: inputValue,
      checked: false,
    };
    setTodo([newTodo, ...todo]);
    setInputValue("");
  };

  const handleAddButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (inputValue === "") return;
    const newTodo: Todo = {
      id: Math.floor(Math.random() * 300),
      inputValue: inputValue,
      checked: false,
    };
    setTodo([newTodo, ...todo]);
    setInputValue("");
  };

  const handleEdit = (id: number, inputValue: string) => {
    const editTodo = todo.map((todo) => {
      if( todo.id === id){
        todo.inputValue = inputValue
      }
      return todo
    })
    setTodo(editTodo)
  }

  const handleDelete = (id: number) => {
    const deleteTodo = todo.filter((todo) => todo.id !== id)
    setTodo(deleteTodo)
  }

  const handleChecked = (id: number, checked: boolean) => {
    const checkTodo = todo.map((todo) => {
      if ( todo.id === id) {
        todo.checked = !checked 
      }
      return todo
    })
    setTodo(checkTodo)
  }

  return (
    <>
      <div className="container-input">
        <form onSubmit={(e) => handleSubmit(e)}>
          <TextField
            label="add your TODO"
            id="filled-size-normal"
            variant="standard"
            value={inputValue}
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setInputValue(e.target.value)}
          />

          <Stack spacing={2} direction="row" className="addButton">
            <Button onClick={(e) => handleAddButton(e)} variant="contained">
              add TODO
            </Button>
          </Stack>
        </form>
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
