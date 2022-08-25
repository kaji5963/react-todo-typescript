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
    e.preventDefault();
    const newTodo: Todo = {
      id: todo.length,
      inputValue: inputValue,
      checked: false,
    };
    setTodo([newTodo, ...todo]);
    setInputValue("");
  };

  const handleAddButton = (e: any) => {
    const newTodo: Todo = {
      id: todo.length,
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
              <input type="text" value={todo.inputValue} onChange={(e) => handleEdit(todo.id, e.target.value)} />
              </li>
              <Checkbox
                {...label}
                sx={{
                  color: pink[800],
                  "&.Mui-checked": {
                    color: pink[600],
                  },
                }}
              />

              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <ChipDelete
                  color="danger"
                  variant="plain"
                  onClick={() => alert("delete button!")}
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
