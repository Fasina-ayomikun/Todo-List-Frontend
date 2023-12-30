import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { dashboardUser } from "../utils/helpers";
import SingleComment from "../min-components/SingleComment";
import { useCommentProvider } from "../context/commentContext";

const CommentSection = ({ id }) => {
  const [comment, setComment] = useState("");
  const { comments, createComment } = useCommentProvider();

  return (
    <FormControl
      sx={{
        width: "100%",
        color: "#fff",
      }}
    >
      <Typography
        id='modal-modal-deadline'
        sx={{
          color: "#ccc",
          fontSize: "1rem",
          textAlign: "start",
          mb: 3,
          mt: 1,
        }}
        variant={"p"}
      >
        Comment
      </Typography>
      <TextField
        color='secondary'
        variant='outlined'
        multiline
        value={comment}
        className='scroll-container'
        maxRows={4}
        sx={{
          textarea: {
            color: "#c7c7c7",
          },

          fieldset: { borderColor: "#fff", "&:hover": "#fff" },
          "& .MuiOutlinedInput-root:hover": {
            "& > fieldset": {
              borderColor: "#a39f9f",
              color: "#fff",
            },
          },
          width: "100%",
        }}
        onChange={(e) => setComment(e.target.value)}
      ></TextField>
      <Button
        color='blue'
        variant={"contained"}
        onClick={() => {
          createComment(
            {
              comment,
              task: id,
              creator: dashboardUser._id,
            },
            id
          );
          setComment("");
        }}
        sx={{
          width: "15%",
          marginY: "25px",
        }}
        endIcon={<SendIcon />}
      >
        Send
      </Button>
      <Box>
        {comments.map((comment) => {
          return <SingleComment comment={comment} id={id} />;
        })}
      </Box>
    </FormControl>
  );
};

export default CommentSection;
