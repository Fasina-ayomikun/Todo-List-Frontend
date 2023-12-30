import React from "react";
import { Button } from "@mui/material";

const TagButton = ({ tag, index }) => {
  return (
    <Button
      variant='outlined'
      color={index === 0 ? "blue" : "pink"}
      key={index}
      sx={{
        fontSize: "0.65rem",
        padding: "2px 3px",
        marginRight: "10px",
      }}
    >
      {tag}
    </Button>
  );
};

export default TagButton;
