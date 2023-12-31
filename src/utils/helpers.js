import { createTheme } from "@mui/material";
import moment from "moment";
export const dashboardUser = JSON.parse(
  localStorage.getItem("Todo-List-details")
);
export const token = JSON.parse(localStorage.getItem("Todo-List-token"));

export let minDate = new Date(Date.now()).toISOString().slice(0, -8);
export const tagList = ["important", "social", "homework", "fun", "work"];
export const initialFullTask = {
  id: "",
  title: "",
  desc: "",
  deadline: "",
  participants: [],
  tags: [],
  completed: [],
  user: "",
};
export const formatTime = (time) => {
  const createdAt = moment(time);
  const now = moment();

  const duration = moment.duration(now.diff(createdAt));
  const seconds = duration.seconds();
  const minutes = duration.minutes();
  const hours = duration.hours();
  const days = duration.days();

  let formattedTime = "";

  if (days > 0) {
    formattedTime += `${days} day${days > 1 ? "s" : ""} `;
  }

  if (hours > 0) {
    formattedTime += `${hours} hour${hours > 1 ? "s" : ""} `;
  }

  if (minutes > 0) {
    formattedTime += `${minutes} minute${minutes > 1 ? "s" : ""} `;
  }

  if (seconds > 0 || formattedTime === "") {
    formattedTime += `${seconds} second${seconds > 1 ? "s" : ""}`;
  }
  return formattedTime;
};
const checkDateTime = (date) => {
  const recentDate = new Date(Date.now()).getTime();
  const gottenDate = new Date(date).getTime();
  const diff = Math.floor((gottenDate - recentDate) / 1000 / 3600);

  if (gottenDate < recentDate) {
    const dif = recentDate - gottenDate;
    const duration = moment.duration(dif);
    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();
    const seconds = duration.seconds();
    return `${hours}:${minutes}:${seconds} ago`;
  } else if (diff <= 24 && diff > 0) {
    return "Today";
  } else if (diff > 0 && diff >= 24 && diff <= 48) {
    return "Tomorrow";
  } else {
    return moment(date).format("MMMM Do YYYY, h:mm a");
  }
};
export const handleCompleted = (id, setCompletedIds) =>
  setCompletedIds((prev) => {
    const idExist = prev.completed.filter((pId) => pId === id);
    if (idExist.length < 1) {
      return { ...prev, completed: [...prev.completed, id] };
    } else {
      const newIds = prev.completed.filter((pId) => pId !== id);
      return { ...prev, completed: newIds };
    }
  });
const theme = createTheme({
  palette: {
    gold: {
      light: "#fed367",
      main: "#feb400",
      dark: "#fe9a00",
      contrastText: "#fff",
    },
    pink: {
      light: "#f9b9f2",
      main: "#ff70a6",
      dark: "#ffbfb7",
      contrastText: "#22223b",
    },
    blue: {
      light: "#70f8ba",
      main: "#02BBE0",
      dark: "#70f8ba",
      contrastText: "#00072d",
    },
    red: {
      light: "#f15041",
      main: "#EE3625",
      dark: "#ef2415",
      contrastText: "#fff",
    },
    primary: {
      light: "#a6e1fa",
      main: "#00072d",
      dark: "#0000",
      contrastText: "#fff",
    },
    secondary: {
      contrastText: "#00072d",
      main: "#fff",
      light: "#d6f4fb",
      dark: "#a6e1fa",
    },
    success: {
      light: "#38b000",
      main: "#008000",
      dark: "#004b23",
    },
    danger: {
      light: "#ba181b",
      main: "#d00000",
      dark: "#9d0208",
      contrastText: "#fff",
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
export const inputStyle = {
  input: {
    color: "#c7c7c7",
  },
  label: {
    color: "#a39f9f !important",
  },
  fieldset: { borderColor: "#fff", "&:hover": "#fff" },
  "& .MuiOutlinedInput-root:hover": {
    "& > fieldset": {
      borderColor: "#a39f9f",
    },
  },

  margin: "0 auto",
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "90%",
    sm: "70%",
    md: "60%",
  },
  minWidth: "200px",
  bgcolor: "#00072D",
  border: "2px solid #fff",
  borderRadius: "10px",
  boxShadow: 24,
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
