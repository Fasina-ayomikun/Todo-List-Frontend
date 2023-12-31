import { Container, ThemeProvider, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
import { UseAuthProvider } from "../context/context";
import { useTaskProvider } from "../context/tasksContext";
import Loading from "../auth/Loading";
import {
  checkExpiredToken,
  dashboardUser,
  initialFullTask,
  style,
  theme,
} from "../utils/helpers";

import DeleteModal from "../modals/DeleteModal";
import PopUpModal from "../modals/PopUpModal";
import Navbar from "../utils/Navbar";
import Categories from "../components/Categories";
import RightDashboard from "../components/RightDashboard";
import Drawer from "../modals/Drawer";
import { useNotificationProvider } from "../context/notificationContext";
import Notification from "../utils/Notification";

function Dashboard() {
  const [open, setOpen] = useState(false);
  const [taskDeleted, setIsTaskDeleted] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const toggleDrawer = () => {
    setOpenDrawer((prev) => !prev);
  };

  const [fullTask, setFullTask] = useState(initialFullTask);
  const handleDelete = () => setIsTaskDeleted(false);

  const handleClose = () => setOpen(false);
  const { setIsLoggedIn, localUser, isLoading, logout, isExpired } =
    UseAuthProvider();
  const { deleteTask, editedTask, taskRemoved, getAllTasksInvolved } =
    useTaskProvider();
  const { openNotification, getAllNotifications } = useNotificationProvider();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(false);
    getAllTasksInvolved(localUser._id || dashboardUser._id);
    getAllNotifications();
  }, []);
  useEffect(() => {
    handleDelete();
  }, [taskRemoved]);
  const press = useRef(true);
  useEffect(() => {
    if (press.current) {
      press.current = false;
    } else {
      checkExpiredToken(isExpired, navigate, logout);
    }
    // eslint-disable-next-line
  }, [isExpired]);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <ThemeProvider theme={theme}>
      <Navbar toggleDrawer={toggleDrawer} />
      <Container
        maxWidth='xl'
        align='center'
        sx={{
          marginTop: "40px",
        }}
      >
        <Grid
          container
          gap={4}
          sx={{
            width: "100%",
          }}
        >
          <Categories />
          <Drawer openDrawer={openDrawer} toggleDrawer={toggleDrawer} />
          {openNotification ? (
            <Notification />
          ) : (
            <RightDashboard
              setFullTask={setFullTask}
              setOpen={setOpen}
              setIsTaskDeleted={setIsTaskDeleted}
            />
          )}
        </Grid>
      </Container>
      <PopUpModal
        open={open}
        handleClose={handleClose}
        fullTask={fullTask}
        setIsTaskDeleted={setIsTaskDeleted}
      />
      <DeleteModal
        taskDeleted={taskDeleted}
        handleDelete={handleDelete}
        style={style}
        handleClose={handleClose}
        editedTask={editedTask}
        deleteTask={deleteTask}
      />
    </ThemeProvider>
  );
}

export default Dashboard;
