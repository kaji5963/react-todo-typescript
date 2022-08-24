import React from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/joy/Chip";
import ChipDelete from "@mui/joy/ChipDelete";
import DeleteForever from "@mui/icons-material/DeleteForever";

import { pink } from "@mui/material/colors";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

export const TodoList = () => {
  return (
    <div className="container-list">
      <ul>
        <li>hello</li>
      </ul>
      <Checkbox
        {...label}
        defaultChecked
        sx={{
          color: pink[800],
          "&.Mui-checked": {
            color: pink[600],
          },
        }}
      />

      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Chip
          variant="outlined"
          color="danger"
          onClick={() => alert("You clicked the chip!!!")}
          endDecorator={
            <ChipDelete
              color="danger"
              variant="plain"
              onClick={() => alert("You clicked the delete button!")}
            >
              <DeleteForever />
            </ChipDelete>
          }
        >
          Delete
        </Chip>
      </Box>
    </div>
  );
};
