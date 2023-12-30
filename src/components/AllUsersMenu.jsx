import React, { useState } from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import {
  Avatar,
  Box,
  Divider,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import Search from "@mui/icons-material/Search";
import { UseAuthProvider } from "../context/context";

const AllUsersMenu = ({ setParticipants, participants }) => {
  const { AllUsers, setFilteredUsers, filteredUsers } = UseAuthProvider();
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const updateParticipantList = (participant) => {
    setParticipants((prev) => {
      const participantExist = prev.filter(
        (user) => user._id === participant._id
      );
      if (participantExist.length < 1) {
        return [...prev, participant];
      } else {
        const newParticipants = prev.filter(
          (user) => user._id !== participant._id
        );
        return newParticipants;
      }
    });
  };

  const handleChange = (value) => {
    const filteredUsers = AllUsers.filter((user) =>
      user.username.toLowerCase().startsWith(value.toLowerCase())
    );
    console.log(AllUsers);
    setFilteredUsers(filteredUsers);
  };
  const handleClickMenu = (e) => {
    if (anchorEl === null) {
      setAnchorEl(e.currentTarget);
    } else {
      setAnchorEl(null);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <AddCircleOutlineOutlinedIcon
        sx={{
          fontSize: "2rem",
        }}
        onClick={(e) => {
          handleClickMenu(e);
        }}
      />
      {openMenu && (
        <Box
          sx={{
            height: "400px",
            position: "absolute",
            top: "25px",
            left: "0",
            background: "#00072d",
            color: "#fff",
            padding: "10px 0",
            borderRadius: "10px",
            zIndex: "10",
            minWidth: "300px",
          }}
        >
          <Box
            sx={{
              padding: "10px 10px",
            }}
          >
            <Typography
              onClick={handleClose}
              variant='p'
              component='p'
              sx={{
                fontSize: "1rem",
                textAlign: "end",
                cursor: "pointer",
                width: "100%",
                color: "#ccc",
                mb: "15px",
                textDecoration: "underline",
              }}
            >
              Close
            </Typography>
            <OutlinedInput
              autoFocus={false}
              sx={{
                color: "#fff",
                height: "100%",
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "#fff",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#fff",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#fff",
                },
                ".MuiSvgIcon-root ": {
                  fill: "white !important",
                },
              }}
              onKeyUp={(e) => {
                e.preventDefault();
                handleChange(e.target.value);
              }}
              placeholder={"Search User"}
              fullWidth
              id='input-with-icon-adornment'
              startAdornment={
                <InputAdornment position='start'>
                  <Search
                    sx={{
                      color: "#ccc",
                    }}
                  />
                </InputAdornment>
              }
            />
          </Box>
          <Divider />
          <Box
            className='scroll-container'
            sx={{
              overflowY: "scroll",
              height: "300px",
            }}
          >
            {filteredUsers.length < 1 ? (
              <Typography component='p'>No user found</Typography>
            ) : (
              filteredUsers.map((user) => {
                const { _id, username, email, profile } = user;
                return (
                  <Box
                    disableAutoFocus
                    key={_id}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "10px",
                      padding: "10px 20px",
                    }}
                  >
                    <Avatar src={profile} sx={{ width: 35, height: 35 }} />
                    <Box
                      sx={{
                        width: "100%",
                      }}
                    >
                      <Typography
                        variant='h6'
                        sx={{
                          margin: "0px",
                          fontSize: "1.1rem",
                          color: "#fff",
                          textAlign: "start",
                        }}
                      >
                        {username}
                      </Typography>
                      <Typography
                        variant='p'
                        component={"p"}
                        sx={{
                          margin: "0px",
                          textAlign: "start",
                          fontSize: "0.9rem",
                          color: "#888686",
                        }}
                      >
                        {email}
                      </Typography>
                    </Box>
                    {participants.filter((p) => p._id === _id).length < 1 ? (
                      <AddBoxOutlinedIcon
                        sx={{
                          color: "#fff",
                          justifySelf: "end",
                        }}
                        onClick={() => {
                          updateParticipantList({
                            _id,
                            email,
                            username,
                            profile,
                          });
                        }}
                      />
                    ) : (
                      <CheckBoxOutlinedIcon
                        sx={{
                          color: "#fff",
                          justifySelf: "end",
                        }}
                        onClick={() => {
                          updateParticipantList({
                            _id,
                            email,
                            username,
                            profile,
                          });
                        }}
                      />
                    )}
                  </Box>
                );
              })
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AllUsersMenu;
