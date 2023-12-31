import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { dashboardUser } from "../utils/helpers";
import { useCommentProvider } from "../context/commentContext";

const SingleComment = ({ comment, id }) => {
  const {
    comment: text,
    creator: { username, profile, _id },
  } = comment;
  const { deleteComment } = useCommentProvider();

  return (
    <Box sx={{ padding: "10px 5px" }} key={comment._id}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "10px",
        }}
      >
        <Avatar
          src={profile ? profile : "../images/no-profile.jpg"}
          sx={{ width: 25, height: 25 }}
        />
        <Typography sx={{ width: "100%" }} component='p'>
          {username}
        </Typography>
        {_id === dashboardUser?._id && (
          <DeleteRoundedIcon
            sx={{
              color: "#FF8E8E",
              padding: "5px",
              borderRadius: "5px",
              width: "15px",
              height: "15px",
              cursor: "pointer",
            }}
            onClick={() => deleteComment(comment._id, id)}
          />
        )}
      </Box>
      <Typography
        component='p'
        sx={{
          color: "#ccc",
          fontSize: "0.85rem",
          textAlign: "start",
          paddingLeft: "5px",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default SingleComment;
