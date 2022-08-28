import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import ChipDelete from "@mui/joy/ChipDelete";
import DeleteForever from "@mui/icons-material/DeleteForever";
import { pink } from "@mui/material/colors";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

//-Todoの型を宣言
type Todo = {
  id: number | string;
  inputValue: string;
  completed: boolean;
};

export const TodoList = () => {
  //state宣言
  const [inputValue, setInputValue] = useState("");
  const [todo, setTodo] = useState<Todo[]>(() => {
    //localStorageに保存
    const savedTodo = localStorage.getItem("todo");
    if (savedTodo) {
      return JSON.parse(savedTodo);
    } else {
      return [];
    }
  });
  const [filterStatus, setFilterStatus] = useState(0);
  //localStorageから復元（Todoを監視）
  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);
  //-Todoの初期状態
  const initialState = {
    task: {
      id: Math.floor(Math.random() * 1000).toString(16),
      inputValue: inputValue,
      completed: false,
    },
  };
  //formの送信処理
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue === "") return;
    const newTodo: Todo = initialState.task;
    setTodo([newTodo, ...todo]);
    setInputValue("");
  };
  //-Todoの追加処理
  const handleAddTodoButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (inputValue === "") return;
    const newTodo: Todo = initialState.task;
    setTodo([newTodo, ...todo]);
    setInputValue("");
  };
  //タスクの編集処理
  const handleEdit = (id: number | string, inputValue: string) => {
    const editTodo = todo.map((todo) => {
      if (todo.id === id) {
        todo.inputValue = inputValue;
      }
      return todo;
    });
    setTodo(editTodo);
  };
  //タスクの削除処理
  const handleDelete = (id: number | string) => {
    const deleteTodo = todo.filter((todo) => todo.id !== id);
    setTodo(deleteTodo);
  };
  //完了・未完了の切り替え処理
  const handleSwitch = (id: number | string) => {
    const checkTodo = todo.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodo(checkTodo);
  };
  //絞り込み処理
  const all = () => {
    setFilterStatus(0);
  };
  const done = () => {
    setFilterStatus(1);
  };
  const unDone = () => {
    setFilterStatus(2);
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
            <Button onClick={(e) => handleAddTodoButton(e)} variant="contained">
              ADD TODO
            </Button>
          </Stack>
        </form>
      </div>
      {/* 完了及び未完了タスク数 */}
      <div className="container-task">
        <div className="task-one">
          DONE: {todo.filter((todo) => todo.completed).length}
        </div>
        <div className="task-two">
          UNDONE: {todo.filter((todo) => !todo.completed).length}
        </div>
      </div>
      {/* 全て・完了・未完了切り替えボタン */}
      <div className="container-button">
        <Stack spacing={2} direction="row" className="addButton">
          <Button
            className="container-button-item"
            onClick={all}
            variant="outlined"
          >
            ALL
          </Button>
          <Button
            className="container-button-item"
            onClick={done}
            variant="outlined"
          >
            DONE
          </Button>
          <Button
            className="container-button-item"
            onClick={unDone}
            variant="outlined"
          >
            UNDONE
          </Button>
        </Stack>
      </div>
      {/* リスト・チェックボックス・削除ボタン */}
      {todo.map((todo) => {
        if (filterStatus === 1 && !todo.completed) return;

        if (filterStatus === 2 && todo.completed) return;

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
                checked={todo.completed}
                onChange={() => handleSwitch(todo.id)}
                className="container-checkbox"
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
