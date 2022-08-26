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
    id: number | string;
    inputValue: string;
    completed: boolean;
    status: string;
  };

  const initialState = {
    task: {
      id: Math.floor(Math.random() * 1000).toString(16),
      inputValue: inputValue,
      completed: false,
      status: "incomplete",
    },
  };

  // const todoStatus = {
  //   all: "all",
  //   complete: "complete",
  //   incomplete: "incomplete",
  // }

  //formの送信機能
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue === "") return;
    const newTodo: Todo = initialState.task;
    setTodo([newTodo, ...todo]);
    setInputValue("");
  };
  //-Todoの追加処理
  const handleAddButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (inputValue === "") return;
    const newTodo: Todo = initialState.task;
    setTodo([newTodo, ...todo]);
    setInputValue("");
  };
  //タスクの編集機能
  const handleEdit = (id: number | string, inputValue: string) => {
    const editTodo = todo.map((todo) => {
      if (todo.id === id) {
        todo.inputValue = inputValue;
      }
      return todo;
    });
    setTodo(editTodo);
  };
  //タスクの削除機能
  const handleDelete = (id: number | string) => {
    const deleteTodo = todo.filter((todo) => todo.id !== id);
    setTodo(deleteTodo);
  };
  //完了の切り替え機能
  const handleCompleted = (id: number | string, completed: boolean) => {
    const checkTodo = todo.map((todo) => {
      if (todo.id === id) {
        todo.completed = !completed;
      }
      return todo;
    });
    setTodo(checkTodo);
  };

  return (
    <>
      {/* form及び追加ボタン */}
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
      {/* 完了及び未完了タスク数 */}
      <div className="container-task">
        <div className="task-one">
          未完了タスク: {todo.filter((todo) => !todo.completed).length}
        </div>
        <div className="task-two">
          完了タスク: {todo.filter((todo) => todo.completed).length}
        </div>
      </div>
      {/* ステータス切り替えボタン */}
      <div className="container-button">
        <Stack spacing={2} direction="row" className="addButton">
          <Button onClick={() => console.log(todo)} variant="outlined">
            ALL
          </Button>
          <Button onClick={() => console.log(todo)} variant="outlined">
            COMPLETE
          </Button>
          <Button onClick={() => console.log(todo)} variant="outlined">
            INCOMPLETE
          </Button>
        </Stack>
      </div>
      {/* リスト・チェックボックス・削除 */}
      {todo.map((todo) => {
        return (
          <div key={todo.id} className="container-list">
            <ul>
              <li>
                <input
                  type="text"
                  value={todo.inputValue}
                  onChange={(e) => handleEdit(todo.id, e.target.value)}
                  disabled={todo.completed}
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
                onChange={() => handleCompleted(todo.id, todo.completed)}
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
};;

