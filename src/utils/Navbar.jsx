import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import NotificationsIcon from "@mui/icons-material/Notifications";

import { useNavigate } from "react-router";

import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import { UseAuthProvider } from "../context/context";
import { useNotificationProvider } from "../context/notificationContext";
import { dashboardUser } from "./helpers";
function Navbar({ toggleDrawer }) {
  const { logout, localUser } = UseAuthProvider();
  const [profileUser, setProfileUser] = useState(localUser);
  const { setOpenNotification, notifications } = useNotificationProvider();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const unReadNotification = notifications.filter((not) => !not.isRead);
  const handleClickMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    if (!localUser._id) {
      if (dashboardUser?._id) {
        setProfileUser(dashboardUser);
      }
    }
  }, [dashboardUser]);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#00072D",
      }}
      px={4}
      py={2}
    >
      <DensityMediumIcon
        sx={{
          display: {
            xs: "block",
            md: "none",
          },
        }}
        onClick={toggleDrawer}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "5px",
        }}
      >
        <IconButton>
          <AutoStoriesIcon
            color='secondary'
            sx={{
              fontSize: {
                xs: "1.7rem",
                sm: "2rem",
              },
              margin: "5px 0",
            }}
          />
        </IconButton>
        <Typography
          variant='h3'
          sx={{
            fontSize: {
              xs: "0.9rem",
              sm: "1.5rem",
            },
          }}
        >
          My Todo List
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: {
            xs: "5px",
            sm: "15px",
          },
        }}
      >
        {/*TODO: Add counter*/}
        <Badge badgeContent={unReadNotification.length} color='blue'>
          <NotificationsIcon
            onClick={() => setOpenNotification(true)}
            sx={{ height: "20px", width: "20px" }}
          />
        </Badge>
        <Box
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },
            alignItems: "center",
            justifyContent: "space-between",
            gap: "15px",
          }}
        >
          <Typography
            variant='h4'
            sx={{
              fontSize: {
                xs: "1.2rem",
              },
            }}
          >
            {profileUser?.username}
          </Typography>
          <Avatar
            alt=''
            src={
              profileUser?.profile
                ? profileUser?.profile
                : "../images/no-profile.jpg"
            }
            onClick={(e) => {
              handleClickMenu(e);
            }}
            sx={{ width: 45, height: 45 }}
          />
          <Menu
            color='primary'
            sx={{
              display: {
                xs: "none",
                md: "block",
              },
            }}
            id='basic-menu'
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => {
                logout();
                handleClose();
                navigate("/");
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
}

export default Navbar;
