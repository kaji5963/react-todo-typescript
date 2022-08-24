import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export const Form = () => {

  const [inputValue, setInputValue] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setInputValue("")
  }


  return (
    <div className="container-input">
      <form onSubmit={(e) => handleSubmit(e)}>
        <TextField
          label="add your TODO"
          id="filled-size-normal"
          variant="standard"
          value={inputValue}
          onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setInputValue(e.target.value)}

        />

      <Stack spacing={2} direction="row" className="addButton">
        <Button variant="contained">add TODO</Button>
      </Stack>
      </form>
      <li>{inputValue}</li>
    </div>
  );
};
