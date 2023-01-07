import { Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import { useTaskProvider } from "../context/tasksContext";
import LogoutIcon from "@mui/icons-material/Logout";

function LogoutBtn() {
  const { logout } = useTaskProvider();
  const navigate = useNavigate();
  return (
    <Typography
      variant='h6'
      onClick={() => {
        logout();
        navigate("/");
      }}
      sx={{
        position: "absolute",
        top: "10px",
        right: "20px",
        display: "flex",
        alignItems: "center",
        columnGap: "10px",
        cursor: "pointer",
        fontSize: {
          xs: "0.9rem",
          sm: "1rem",
        },
      }}
    >
      <LogoutIcon />
      Logout
    </Typography>
  );
}

export default LogoutBtn;
