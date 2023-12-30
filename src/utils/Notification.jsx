import { Avatar, Box, Divider, Grid, Typography } from "@mui/material";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import React, { useEffect } from "react";
import { formatTime } from "./helpers";
import { useNotificationProvider } from "../context/notificationContext";

const Notification = () => {
  const { getAllNotifications, notifications, editNotification } =
    useNotificationProvider();

  useEffect(() => {
    getAllNotifications();
  }, []);
  return (
    <Grid
      item
      xs={12}
      md={7}
      lg={8}
      className='scroll-container'
      sx={{
        padding: "22px 10px",
        overflowY: "scroll",
        maxHeight: "74vh",
      }}
    >
      <Box
        sx={{
          padding: "0px",
        }}
      >
        <Box
          sx={{
            padding: "20px 10px",
            paddingTop: "0",
          }}
        >
          <Typography
            variant='h5'
            color='gold'
            sx={{
              textAlign: "start",
              fontWeight: "700",
            }}
          >
            Notifications
          </Typography>
        </Box>
        <Divider />
        {notifications.map((n) => {
          const { _id, content, createdAt, profile, isRead } = n;
          return (
            <>
              <Box
                key={_id}
                onClick={() => editNotification(_id)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  padding: "15px 10px",
                  backgroundColor: `${isRead ? "transparent" : "#00072d"}`,
                }}
              >
                <Avatar
                  src={profile ? profile : "../images/no-profile.jpg"}
                  sx={{ width: 35, height: 35 }}
                />
                <Box sx={{ width: "100%", cursor: "pointer" }}>
                  <Typography
                    variant='h6'
                    color='secondary'
                    sx={{
                      margin: "0px",
                      fontSize: "1.1rem",
                      textAlign: "start",
                    }}
                  >
                    {content}
                  </Typography>
                  <Typography
                    variant='p'
                    component={"p"}
                    sx={{
                      margin: "0px",
                      fontSize: "0.9rem",
                      color: "#888686",

                      textAlign: "start",
                    }}
                  >
                    {formatTime(createdAt)}
                  </Typography>
                </Box>
                <DoneAllIcon color={isRead ? "neutral" : "blue"} sx={{}} />
              </Box>
              <Divider />
            </>
          );
        })}
      </Box>
    </Grid>
  );
};

export default Notification;
