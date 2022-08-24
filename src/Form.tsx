import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export const Form = () => {
  return (
    <div className="container-input">
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="add your TODO"
          id="filled-size-normal"
          defaultValue=""
          variant="standard"
        />
      </Box>

      <Stack spacing={2} direction="row" className="addButton">
        <Button variant="contained">add TODO</Button>
      </Stack>
    </div>
  );
};
