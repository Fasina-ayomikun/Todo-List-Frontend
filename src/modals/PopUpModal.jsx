import { Box, Modal, Typography } from "@mui/material";
import React from "react";
import { checkDateTime, style } from "../utils/helpers";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

function PopUpModal({ open, handleClose, fullTask }) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <CloseRoundedIcon
          sx={{
            position: "absolute",
            right: "10px",
            top: "10px",
          }}
          onClick={() => handleClose()}
        />
        <Typography
          id='modal-modal-title'
          variant='h6'
          component='h2'
          sx={{
            wordBreak: "break-all",
            mt: 2,
            borderBottom: "1px solid #7e7c7c",
            paddingBottom: "5px",
          }}
        >
          {fullTask.title}
        </Typography>
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
            mt: 1,
            color: "#ccc",

            textAlign: "end",
          }}
        >
          {checkDateTime(fullTask.deadline)}
        </Typography>
      </Box>
    </Modal>
  );
}

export default PopUpModal;
