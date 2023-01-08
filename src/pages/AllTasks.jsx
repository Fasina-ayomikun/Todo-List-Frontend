import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Box,
  ThemeProvider,
  Typography,
} from "@mui/material";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { Container } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTaskProvider} from "../context/tasksContext";
import { UseAuthProvider } from "../context/context";
import Loading from "../auth/Loading";
import { checkDateTime, checkExpiredToken, theme } from "../utils/helpers";
import DeleteModal from "../modals/DeleteModal";
import LogoutBtn from "../utils/LogoutBtn";

function AllTasks() {
  const [isTaskDeleted, setIsTaskDeleted] = useState(false);
  const handleDelete = () => setIsTaskDeleted(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: " 40%",
    minWidth: "200px",
    bgcolor: "#00072D",
    border: "2px solid #fff",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };
  const {
    tasks,
    getAllTasks,
    setTaskAdded,
    deleteTask,
    editedTask,
    setEditedTask,
    setIsEditing,
    taskRemoved,
    isExpired,
    logout,
    setTaskRemoved,
  } = useTaskProvider();
  const { isLoading } = UseAuthProvider();
  const navigate = useNavigate();
  useEffect(() => {
    getAllTasks("-createdAt");
    setTaskAdded(false);
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
        sx={{
          position: "relative",
        }}
      >
        <NavLink to='/dashboard' className='home'>
          <HomeRoundedIcon />
          <Typography variant='body1'>Home</Typography>
        </NavLink>
        <Typography
          variant='h3'
          mt='40px'
          align='center'
          sx={{
            paddingTop: {
              xs: "50px",
              sm: "30px",
            },
            fontSize: {
              xs: "2rem",
              sm: "2.5rem",
            },
          }}
        >
          All Tasks
        </Typography>
        <Box
          mt='40px'
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: " 1fr",
              sm: "repeat(2, 1fr)",
            },
            gap: "30px",
          }}
        >
          {tasks.length < 1 ? (
            <Typography variant='6'   sx={{
            fontSize: {
              xs: "0.9rem",
              sm: "1.1rem",
            },
          }}
        >No Task Available.</Typography>
          ) : (
            tasks.map((task) => {
              const { title, description, deadline } = task;
              return (
                <Box key={task._id}>
                  <Accordion
                    sx={{
                      background: "#00072D",
                      color: "#fff",
                      boxShadow: "0 0 8px 5px #585757",
                    }}
                  >
                    <AccordionSummary
                      aria-controls='panel1a-content'
                      id='panel1a-header'
                    >
                      <BorderColorRoundedIcon
                        sx={{
                          marginRight: "10px",
                        }}
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
                      />
                      <Typography
                        width='100%'
                        sx={{
                          wordBreak: "break-all",
                        }}
                      >
                        {title}
                      </Typography>
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
                    </AccordionSummary>
                    <Divider color='#828080' />
                    <AccordionDetails>
                      <Typography
                        sx={{
                          wordBreak: "break-all",
                        }}
                      >
                        {description || "No description available..."}
                      </Typography>
                      <Typography
                        variant='span'
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          color: "#ccc",
                          marginTop: "10px",
                        }}
                      >
                        <strong>Deadline: </strong>
                        {checkDateTime(deadline)}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Box>
              );
            })
          )}
        </Box>
        <NavLink to='/add' onClick={() => setIsEditing(false)}>
          <div className='addTask'>
            <div></div>
            <div></div>
          </div>
        </NavLink>
        <LogoutBtn />
      </Container>
      <DeleteModal
        taskDeleted={isTaskDeleted}
        handleDelete={handleDelete}
        style={style}
        editedTask={editedTask}
        deleteTask={deleteTask}
      />
    </ThemeProvider>
  );
}

export default AllTasks;
