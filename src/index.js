import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/context";
import TasksContextProvider from "./context/tasksContext";
import CommentsContextProvider from "./context/commentContext";
import NotificationsContextProvider from "./context/notificationContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <TasksContextProvider>
      <CommentsContextProvider>
        <NotificationsContextProvider>
          <App />
        </NotificationsContextProvider>
      </CommentsContextProvider>
    </TasksContextProvider>
  </AuthProvider>
);
