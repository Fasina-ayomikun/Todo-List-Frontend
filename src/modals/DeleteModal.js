import {
  Box,
  Modal,
  Button,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";

import React from "react";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { checkExpiredToken, theme } from "../utils/helpers";
import { useTaskProvider } from "../context/tasksContext";
import { useNavigate } from "react-router";

function DeleteModal({
  taskDeleted,
  handleDelete,
  style,
  editedTask,
  deleteTask,
}) {
  const { isExpired, logout } = useTaskProvider();
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={theme}>
      <Modal open={taskDeleted} onClose={handleDelete}>
        <Box sx={style}>
          <CloseRoundedIcon
            sx={{
              position: "absolute",
              right: "10px",
              top: "10px",
            }}
            onClick={() => handleDelete()}
          />
          <Typography
            id='modal-modal-title'
            variant='h6'
            component='h2'
            align='center'
          >
            Are you sure you want to delete this task?
          </Typography>
          <Stack
            direction='row'
            spacing={{
              xs: 1,
              sm: 2,
            }}
            mt={4}
            alignItems='center'
          >
            <Button
              variant='contained'
              color='secondary'
              sx={{
                width: "90%",
                margin: "auto",
                color: "#00072D",
                fontSize: {
                  xs: "0.8rem",
                  sm: "1rem",
                },
              }}
              onClick={() => {
                checkExpiredToken(isExpired, navigate, logout);

                deleteTask(editedTask.id);
              }}
            >
              Confirm
            </Button>
            <Button
              variant='contained'
              color='secondary'
              sx={{
                width: "100%",
                margin: "0 auto",
                color: "#00072D",
                fontSize: {
                  xs: "0.8rem",
                  sm: "1rem",
                },
              }}
              onClick={() => handleDelete()}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}

export default DeleteModal;
