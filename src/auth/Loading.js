import { CircularProgress, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/system";
import React from "react";
const theme = createTheme({
  palette: {
    primary: {
      light: "#fff",
      main: "#00072D",
    },
    secondary: {
      main: "#fff",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});
function Loading() {
  return (
    <ThemeProvider theme={theme}>
      <CircularProgress
        color='secondary'
        sx={{
          width: "100px !important",
          height: "100px !important",
          display: "flex",
          alignItems: "center",
          margin: "0 auto",
          marginTop: "43vh",
        }}
      />
    </ThemeProvider>
  );
}

export default Loading;
