import { Avatar, AvatarGroup } from "@mui/material";
import React from "react";

const AvatarList = ({ data, modal }) => {
  return (
    <AvatarGroup
      sx={{
        display: modal
          ? "flex"
          : {
              xs: "none",
              sm: "flex",
            },
        flexDirection: "row-reverse",
      }}
    >
      {data?.map((item, index) => {
        return (
          <Avatar
            key={index}
            src={item.profile ? item.profile : "../images/no-profile.jpg"}
            sx={{ width: 25, height: 25 }}
          />
        );
      })}
    </AvatarGroup>
  );
};

export default AvatarList;
