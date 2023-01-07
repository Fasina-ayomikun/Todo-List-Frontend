import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ThemeProvider,
  Typography,
  Button,
} from "@mui/material";
import React, { useEffect } from "react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
import { UseAuthProvider } from "../context/context";
import { useTaskProvider } from "../context/tasksContext";
import Loading from "../components/Loading";
import {
  checkDateTime,
  checkExpiredToken,
  style,
  theme,
} from "../utils/helpers";
import DeleteModal from "../modals/DeleteModal";
import PopUpModal from "../modals/PopUpModal";
import AddBtn from "../utils/AddBtn";
import LogoutBtn from "../utils/LogoutBtn";

function Dashboard() {
  const [open, setOpen] = useState(false);
  const [taskDeleted, setIsTaskDeleted] = useState(false);
  const [dashboardUser, setDashboardUser] = useState({});
  const [fullTask, setFullTask] = useState({
    title: "",
    desc: "",
    deadline: "",
  });
  const handleDelete = () => setIsTaskDeleted(false);

  const handleClose = () => setOpen(false);
  const { setIsLoggedIn, isLoading } = UseAuthProvider();
  const {
    setIsEditing,
    getAllTasks,
    tasks,
    deleteTask,
    editedTask,
    taskRemoved,
    setEditedTask,
    setTaskRemoved,
    logout,
    isExpired,
  } = useTaskProvider();
  const navigate = useNavigate();
  const viewBtnRef = useRef(null);

  useEffect(() => {
    setIsLoggedIn(false);
    setDashboardUser(JSON.parse(localStorage.getItem("Todo-List-details")));
    getAllTasks("deadline");
    setTaskRemoved(false);
    // eslint-disable-next-line
  }, [taskRemoved, editedTask]);
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
      <Container
        maxWidth='md'
        align='center'
        sx={{
          marginTop: "40px",
        }}
      >
        <Typography
          variant='h6'
          component='p'
          color='#a29f9f'
          sx={{
            fontSize: {
              xs: "1rem",
              sm: "1.2rem",
            },
          }}
        >
          Welcome to my Todo App
        </Typography>
        <Typography
          variant='h3'
          mt='10px'
          sx={{
            fontSize: {
              xs: "2rem",
              sm: "2.5rem",
            },
            textTransform: "capitalize",
          }}
        >
          Hello {dashboardUser !== {} && dashboardUser.username}
        </Typography>
        <Typography
          variant='body1'
          component='p'
          color='#a29f9f'
          mt='20px'
          sx={{
            fontSize: {
              xs: "0.9rem",
              sm: "1rem",
            },
          }}
        >
          {dashboardUser !== {} ? dashboardUser?.email : ""}
        </Typography>
        <Table
          sx={{
            marginTop: "50px",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  color: "#fff",
                }}
              >
                Upcoming Tasks
              </TableCell>
              <TableCell
                sx={{
                  color: "#fff",
                  display: {
                    xs: "none",
                    sm: "table-cell",
                  },
                }}
              >
                Due Date
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => {
              const { title, deadline, description } = task;
              return (
                <TableRow key={task._id}>
                  <TableCell
                    sx={{
                      color: "#fff",
                    }}
                    onClick={() => {
                      setOpen(true);
                      setFullTask({
                        title,
                        desc: description || "No description available...",
                        deadline,
                      });
                    }}
                  >
                    {title}
                  </TableCell>
                  <TableCell
                    sx={{
                      display: {
                        xs: "none",
                        sm: "table-cell",
                      },
                      color: "#fff",
                    }}
                  >
                    {checkDateTime(deadline)}
                  </TableCell>
                  <TableCell>
                    <NavLink
                      to='/add'
                      onClick={() => {
                        setIsEditing(true);
                        setEditedTask({
                          id: task._id,
                          title: task.title,
                          description,
                          deadline: deadline.slice(0, -1),
                        });

                        navigate("/add");
                      }}
                    >
                      <BorderColorRoundedIcon
                        sx={{
                          color: "#A6E1FA",
                        }}
                      />
                    </NavLink>
                    <DeleteRoundedIcon
                      onClick={() => {
                        setIsTaskDeleted(true);
                        setEditedTask({
                          id: task._id,
                        });
                      }}
                      sx={{
                        color: "#FF8E8E",
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Button
          variant='contained'
          color='secondary'
          sx={{
            width: {
              xs: "100%",
              sm: "30%",
            },
            margin: "40px auto",
            color: "#00072D",
            fontSize: {
              xs: "0.8rem",
              sm: "1rem",
            },
          }}
          onClick={() => {
            viewBtnRef.current.click();
          }}
        >
          <NavLink to='/tasks' className='link' ref={viewBtnRef}>
            View All Tasks
          </NavLink>
        </Button>
        <AddBtn setIsEditing={setIsEditing} />
      </Container>
      <PopUpModal open={open} handleClose={handleClose} fullTask={fullTask} />
      <DeleteModal
        taskDeleted={taskDeleted}
        handleDelete={handleDelete}
        style={style}
        editedTask={editedTask}
        deleteTask={deleteTask}
      />
      <LogoutBtn />
    </ThemeProvider>
  );
}

export default Dashboard;
