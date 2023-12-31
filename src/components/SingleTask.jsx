import React, { useEffect, useRef, useState } from "react";
import AvatarList from "./AvatarList";
import { Box, Checkbox, Divider, Grid } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useTaskProvider } from "../context/tasksContext";
import { dashboardUser, handleCompleted } from "../utils/helpers";
import TagButton from "../min-components/TagButton";
import { useNotificationProvider } from "../context/notificationContext";
import { UseAuthProvider } from "../context/context";
const SingleTask = ({
  task,
  setEditedTask,
  setIsTaskDeleted,
  setFullTask,
  setOpen,
}) => {
  const {
    _id: id,
    title,
    deadline,
    description,
    completed,
    tags,
    user,
    participants,
  } = task;
  const { localUser } = UseAuthProvider();
  console.log("u", task, user);
  const [profileUser, setProfileUser] = useState(localUser);
  const [completedIds, setCompletedIds] = useState({ taskId: id, completed });
  const { editTask } = useTaskProvider();
  const { getAllNotifications } = useNotificationProvider();
  const press = useRef(true);
  const participantAvatarList = [
    ...participants.filter((p) => p._id !== profileUser._id),
    user,
  ];
  useEffect(() => {
    if (!localUser._id) {
      if (dashboardUser._id) {
        setProfileUser(dashboardUser);
      }
    }
  }, [dashboardUser]);
  useEffect(() => {
    if (press.current) {
      press.current = false;
    } else {
      editTask(id, {
        title,
        description,
        deadline,
        completed: completedIds.completed,

        user: user._id,
        participants,
        tags,
      });
    }
  }, [completedIds]);
  useEffect(() => {
    getAllNotifications();
  }, [completed]);
  return (
    <>
      <Grid
        container
        sx={{
          backgroundColor: `${
            completed.includes(dashboardUser._id) ? "transparent" : "#00072d"
          }`,

          padding: "22px 10px",
        }}
      >
        <Grid
          item
          xs={2}
          sm={1}
          size='small'
          sx={{
            width: "100%",
          }}
        >
          {/*Link to Edit*/}
          <Checkbox
            color='success'
            checked={completed.includes(dashboardUser._id)}
            onChange={(e) => {
              console.log(e.target.checked);
              handleCompleted(dashboardUser._id, setCompletedIds);
            }}
            sx={{
              color: "#ccc",
              marginRight: "20px",
            }}
          />
        </Grid>
        <Grid
          item
          xs={9}
          sm={6}
          sx={{
            color: `${
              completed.includes(dashboardUser._id) ? "green" : "#fff"
            }`,
            width: "100%",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            textDecoration: `${
              completed.includes(dashboardUser._id) ? "line-through" : "none"
            }`,
          }}
          onClick={() => {
            setOpen(true);
            setFullTask({
              id,
              title,
              desc: description || "No description available...",
              deadline,
              participants,
              tags,
              completed,
              user: user._id,
            });
          }}
        >
          {title.substring(0, 40)}
        </Grid>

        <Grid
          item
          xs={1}
          sm={5}
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              gap: "15px",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "flex",
                },
                gap: "3px",
              }}
            >
              {tags.map((tag, index) => (
                <TagButton tag={tag} key={index} />
              ))}
            </Box>
            <AvatarList
              data={
                profileUser?._id === user?._id
                  ? participants
                  : participantAvatarList
              }
              modal={false}
            />
            {profileUser?._id === user._id && (
              <DeleteRoundedIcon
                onClick={() => {
                  setIsTaskDeleted(true);
                  setEditedTask({
                    id: task._id,
                  });
                }}
                color='red'
                sx={{
                  width: "20px",
                }}
              />
            )}
          </Box>
        </Grid>
        <Divider />
      </Grid>
    </>
  );
};

export default SingleTask;
