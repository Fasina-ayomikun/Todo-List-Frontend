import { Button, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { useTaskProvider } from "../context/tasksContext";

const FilterButton = ({ text, data }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const { sortTask, filterTaskByTag } = useTaskProvider();
  const handleClickMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Button
        variant='outlined'
        color='secondary'
        sx={{
          width: {
            xs: "30%",
            sm: "20%",
          },
          height: "100%",
        }}
        aria-controls={openMenu ? "basic-menu" : undefined}
        aria-haspopup='true'
        aria-expanded={openMenu ? "true" : undefined}
        onClick={handleClickMenu}
      >
        {text}
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
      >
        {data.map((item, index) => (
          <MenuItem
            sx={{ textTransform: "capitalize" }}
            onClick={() => {
              handleClose();
              if (data.includes("ascending")) {
                sortTask(item.toLowerCase());
              } else {
                filterTaskByTag(item);
              }
            }}
            key={index}
          >
            {item}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default FilterButton;
