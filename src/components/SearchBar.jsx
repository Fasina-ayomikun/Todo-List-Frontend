import Search from "@mui/icons-material/Search";
import { Box, FormControl, InputAdornment, OutlinedInput } from "@mui/material";
import React from "react";
import FilterButton from "./FilterButton";
import { useTaskProvider } from "../context/tasksContext";
import { tagList } from "../utils/helpers";

const SearchBar = () => {
  const { filterTaskBySearch } = useTaskProvider();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row-reverse",
        flexWrap: {
          xs: "wrap",
          sm: "nowrap",
        },
        alignItems: "center",
        justifyContent: "space-between",
        gap: "15px",
        backgroundColor: "#00072d",
        padding: "30px 20px",
        borderRadius: "10px",
      }}
    >
      <FormControl
        variant='outlined'
        color='secondary'
        sx={{
          color: "#fff",
          border: "1px solid #ccc",
          borderRadius: "5px",
          width: "100%",
          height: "40px",
        }}
      >
        <OutlinedInput
          sx={{
            color: "#fff",
            height: "100%",
          }}
          placeholder={"Search Tasks.."}
          fullWidth
          onKeyUp={(e) => filterTaskBySearch(e.target.value)}
          startAdornment={
            <InputAdornment position='start'>
              <Search color='secondary' />
            </InputAdornment>
          }
        />
      </FormControl>
      <FilterButton text='Filter' data={["all", ...tagList]} />
      <FilterButton text='Sort' data={["ascending", "descending"]} />
    </Box>
  );
};

export default SearchBar;
