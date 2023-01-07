import { createTheme } from "@mui/material";
import moment from "moment";

const checkDateTime = (date) => {
  const recentDate = new Date(Date.now()).getTime();
  const gottenDate = new Date(date).getTime();
  const diff = Math.floor((gottenDate - recentDate) / 1000 / 3600);

  if (diff <= 24) {
    return "Today";
  } else if (diff >= 24 && diff <= 48) {
    return "Tomorrow";
  } else {
    return moment(date).format("MMMM Do YYYY, h:mm a");
  }
};
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
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: " 40%",
  minWidth: "200px",
  bgcolor: "#00072D",
  border: "2px solid #fff",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};
const checkExpiredToken = (isExpired, navigate, logout) => {
  if (isExpired) {
    logout();
    navigate("/login");
  } else {
    return;
  }
};
export { checkDateTime, theme, style, checkExpiredToken };
