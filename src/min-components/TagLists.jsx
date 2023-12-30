import { Box, Chip, MenuItem, OutlinedInput, Select } from "@mui/material";
import React from "react";
import { tagList } from "../utils/helpers";

const TagLists = ({ tags, handleChange }) => {
  return (
    <Select
      labelId='demo-multiple-name-label'
      id='demo-multiple-name'
      multiple
      placeholder='Tags'
      maxRows={2}
      maxLength={2}
      style={{ width: "100%" }}
      color='gold'
      value={tags}
      onChange={handleChange}
      sx={{
        color: "white",
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
      input={
        <OutlinedInput
          color='primary'
          disableInjectingGlobalStyles={false}
          id='select-multiple-chip'
          label='Tags'
          style={{ borderColor: "red" }}
        />
      }
      renderValue={(selected) => (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 0.5,
            color: "#fff",
          }}
          color='primary'
        >
          {selected.map((value) => (
            <Chip
              key={value}
              label={value}
              variant='primary'
              color='primary'
              sx={{
                color: "#fff",
                backgroundColor: "#cccccc52",
              }}
            />
          ))}
        </Box>
      )}
    >
      {tagList.map((tagItem, index) => {
        return (
          <MenuItem
            key={index}
            color='gold'
            value={tagItem}
            sx={{
              textTransform: "capitalize",
            }}
          >
            {tagItem}
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default TagLists;
