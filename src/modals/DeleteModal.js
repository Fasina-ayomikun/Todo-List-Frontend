import {
  Box,
  Modal,
  Button,
  Stack,
  ThemeProvider,
  Typography,
  Container,
} from "@mui/material";

import React from "react";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { checkExpiredToken, theme } from "../utils/helpers";
import { useNavigate } from "react-router";
import { UseAuthProvider } from "../context/context";
import { useNotificationProvider } from "../context/notificationContext";

function DeleteModal({
  taskDeleted,
  handleDelete,
  style,
  handleClose,
  editedTask,
  deleteTask,
}) {
  const { isExpired, logout } = UseAuthProvider();
  const { getAllNotifications } = useNotificationProvider();
  const navigate = useNavigate();
  return (
    <Container
      sx={{
        zIndex: "10",
      }}
    >
      <ThemeProvider theme={theme}>
        <Modal open={taskDeleted} onClose={handleDelete}>
          <Box sx={{ ...style, px: 4 }}>
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
              mt={2}
            >
              Are you sure you want to delete this task?
            </Typography>
            <Stack
              direction='row'
              spacing={{
                xs: 1,
                sm: 2,
              }}
              my={4}
              alignItems='center'
            >
              <Button
                variant='contained'
                color='danger'
                sx={{
                  width: "90%",
                  margin: "auto",
                  fontSize: {
                    xs: "0.8rem",
                    sm: "1rem",
                  },
                }}
                onClick={() => {
                  checkExpiredToken(isExpired, navigate, logout);

                  deleteTask(editedTask.id);
                  setTimeout(() => {
                    getAllNotifications();
                  }, 3000);
                  handleClose();
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
    </Container>
  );
}

export default DeleteModal;
