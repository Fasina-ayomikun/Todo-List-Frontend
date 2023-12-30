import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AdjustOutlinedIcon from "@mui/icons-material/AdjustOutlined";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import UpcomingIcon from "@mui/icons-material/Upcoming";
import { useNavigate } from "react-router";
import { useTaskProvider } from "../context/tasksContext";
import { dashboardUser, tagList } from "../utils/helpers";
import { useNotificationProvider } from "../context/notificationContext";
import { UseAuthProvider } from "../context/context";

const SidebarContent = ({ isModel }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const { setOpenNotification } = useNotificationProvider();
  const handleListItemClick = (event, index) => {
    console.log(index);
    setSelectedIndex(index);
  };
  const { getAllTasks, getAllTasksInvolved, filterTaskByTag } =
    useTaskProvider();
  const { localUser } = UseAuthProvider();
  return (
    <>
      <Button
        variant='contained'
        color='gold'
        sx={{
          width: "80%",
          marginY: "10px",
        }}
        onClick={() => {
          navigate("/add");
          setOpenNotification(false);
          if (isModel) {
          }
        }}
      >
        New Task
      </Button>
      <List
        color='secondary'
        sx={{
          color: "#fff",
          marginY: "6px",
        }}
      >
        <ListItem
          disablePadding
          onClick={() => {
            setOpenNotification(false);

            getAllTasksInvolved(dashboardUser._id || localUser._id);
          }}
        >
          <ListItemButton
            onClick={(event) => {
              handleListItemClick(event, 0);
            }}
          >
            <ListItemIcon>
              <AssignmentTurnedInIcon color='blue' />
            </ListItemIcon>
            <ListItemText primary='All Task'></ListItemText>
          </ListItemButton>
        </ListItem>
        <Divider
          sx={{
            borderColor: "#414144",
          }}
        />
        <ListItem
          disablePadding
          onClick={() => {
            getAllTasks("-createdAt");
            setOpenNotification(false);
          }}
        >
          <ListItemButton
            onClick={(event) => {
              handleListItemClick(event, 1);
            }}
          >
            <ListItemIcon>
              <UpcomingIcon color='blue' />
            </ListItemIcon>
            <ListItemText primary='My Tasks'></ListItemText>
          </ListItemButton>
        </ListItem>
        <Divider
          sx={{
            borderColor: "#414144",
          }}
        />
        <Typography
          variant='h4'
          sx={{
            fontSize: "1.1rem",
            marginY: "25px",
            color: "#ccc",
            paddingX: "20px",
            textAlign: "start",
          }}
        >
          Tags
        </Typography>
        {tagList.map((tag, index) => (
          <Box
            key={index}
            onClick={() => {
              filterTaskByTag(tag);
              setOpenNotification(false);
            }}
          >
            <ListItem disablePadding>
              <ListItemButton
                onClick={(event) => {
                  handleListItemClick(event, index + 2);
                }}
              >
                <ListItemIcon>
                  <AdjustOutlinedIcon color='pink' />
                </ListItemIcon>
                <ListItemText
                  primary={tag}
                  sx={{ textTransform: "capitalize" }}
                ></ListItemText>
              </ListItemButton>
            </ListItem>
            <Divider
              sx={{
                borderColor: "#414144",
              }}
            />
          </Box>
        ))}
      </List>
    </>
  );
};

export default SidebarContent;
