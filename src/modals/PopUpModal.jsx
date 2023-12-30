import { Box, Button, Divider, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { checkDateTime, dashboardUser, style } from "../utils/helpers";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { NavLink, useNavigate } from "react-router-dom";
import { useTaskProvider } from "../context/tasksContext";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AvatarList from "../components/AvatarList";
import TagButton from "../min-components/TagButton";
import CommentSection from "../components/CommentSection";
import { useCommentProvider } from "../context/commentContext";
function PopUpModal({ open, setIsTaskDeleted, handleClose, fullTask }) {
  const [waitingParticipants, setWaitingParticipants] = useState([]);
  const [subscribedPart, setSubscribePart] = useState([]);
  const { setIsEditing, setEditedTask, editTask, getAllTaskInvolved } =
    useTaskProvider();
  const { getAllComments } = useCommentProvider();
  const navigate = useNavigate();
  const {
    id,
    title,
    deadline,
    desc: description,
    participants,
    tags,
    completed,
    user,
  } = fullTask;
  const handleUnsubscribe = (userId) => {
    const newPart = participants.filter((p) => p._id !== userId);
    console.log(newPart, participants);
    editTask(id, {
      ...fullTask,
      participants: newPart,
    });
    handleClose();
    getAllTaskInvolved();
  };
  const handleWaiting = () => {
    let allParticipants = [
      ...participants,
      {
        _id: user,
      },
    ];
    //CHECKING FOR PARTICIPANTS THAT HASN'T COMPLETED THE TASK

    const newElements = allParticipants.filter(
      (p) => !completed.includes(p._id)
    );
    setWaitingParticipants(newElements);
  };
  useEffect(() => {
    handleWaiting();
    if (id) {
      getAllComments(id);
    }
  }, [open]);
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            flexWrap: {
              xs: "wrap",
              md: "nowrap",
            },
            gap: "15px",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "30px 5px",
            mx: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              width: "65%",
              justifyContent: "start",
            }}
          >
            <KeyboardBackspaceIcon onClick={handleClose} />
            <Typography
              id='modal-modal-title'
              variant='h6'
              component='h2'
              sx={{
                wordBreak: "break-all",
                width: "100%",
              }}
            >
              {fullTask.title}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              justifyContent: "space-between",
            }}
          >
            {completed.length >= 1 && (
              <Button
                variant='contained'
                color={waitingParticipants.length < 1 ? "success" : "gold"}
                sx={{ width: "100%", fontSize: "0.8rem" }}
              >
                {waitingParticipants.length < 1
                  ? "Completed"
                  : `${participants.length + 1 - waitingParticipants.length}/${
                      participants.length + 1
                    } Completed`}
              </Button>
            )}
            {dashboardUser?._id === user && (
              <>
                <NavLink
                  to='/add'
                  onClick={() => {
                    setIsEditing(true);
                    setEditedTask({
                      id,
                      title,
                      description,
                      deadline: deadline.slice(0, -1),
                      participants,
                      tags,
                      completed,
                    });

                    navigate("/add");
                  }}
                >
                  <BorderColorRoundedIcon
                    color='blue'
                    borderColor='blue'
                    sx={{
                      width: "20px",
                      height: "20px",
                      border: "1px solid",
                      padding: "5px ",
                      borderRadius: "5px",
                    }}
                  />
                </NavLink>
                <DeleteRoundedIcon
                  color='red'
                  onClick={() => {
                    setIsTaskDeleted(true);
                    setEditedTask({
                      id,
                    });
                  }}
                  borderColor='red'
                  sx={{
                    border: "1px solid  ",
                    padding: "5px",
                    borderRadius: "5px",
                    width: "20px",
                    height: "20px",
                    cursor: "pointer",
                  }}
                />
              </>
            )}
          </Box>
        </Box>
        <Divider
          sx={{
            borderColor: "#7e7c7c",
          }}
        />
        <Box
          className='scroll-container'
          sx={{
            overflowY: "scroll",
            maxHeight: "400px",
            px: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "15px 5px",
            }}
          >
            <AvatarList data={participants} modal={true} />
            <Box sx={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
              {tags.map((tag, index) => (
                <TagButton tag={tag} index={index} />
              ))}
            </Box>
          </Box>
          <Typography
            id='modal-modal-description'
            mt={2}
            sx={{
              wordBreak: "break-all",
            }}
          >
            {fullTask.desc}
          </Typography>
          <Typography
            id='modal-modal-deadline'
            sx={{
              color: "#ccc",
              fontSize: "0.9rem",
              textAlign: "end",
              mb: 3,
              mt: 1,
            }}
          >
            Deadline: {checkDateTime(fullTask.deadline)}
          </Typography>
          <Divider
            sx={{
              borderColor: "#7e7c7c",
              marginTop: "30px",
            }}
          />{" "}
          {dashboardUser._id !== user && (
            <Typography
              variant='p'
              onClick={() => handleUnsubscribe(dashboardUser._id)}
              sx={{
                color: "#feb400",
                textDecoration: "underline",
                marginY: "10px",
                display: "flex",
                justifyContent: "end",
                width: "100%",
                cursor: "pointer",
              }}
            >
              Unsubscribe
            </Typography>
          )}
          <CommentSection id={id} />
        </Box>
      </Box>
    </Modal>
  );
}

export default PopUpModal;
