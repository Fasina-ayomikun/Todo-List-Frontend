import axios from "axios";
import React, { createContext, useContext, useReducer, useState } from "react";

import { toast } from "react-toastify";
import notificationReducer from "../reducer/notificationReducer";
import { dashboardUser, token } from "../utils/helpers";

const initialState = {
  notifications: [],
  isLoading: false,
  isError: false,
  msg: "",
  isEditing: false,
};
const NotificationContext = createContext();
function NotificationsContextProvider({ children }) {
  const [state, dispatch] = useReducer(notificationReducer, initialState);
  const [openNotification, setOpenNotification] = useState(false);

  const createNotification = async (body) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_LINK}/notification`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        getAllNotifications(dashboardUser._id);
      }
      console.log(response);
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response });
    }
  };
  const editNotification = async (id) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BACKEND_LINK}/notification/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        getAllNotifications(dashboardUser._id);
      }
      console.log(response);
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response });
    }
  };
  const getAllNotifications = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_LINK}/notification/all/${dashboardUser._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: "ALL_NOTIFICATIONS", payload: response.data });

      console.log(response);
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response });
    }
  };
  return (
    <NotificationContext.Provider
      value={{
        ...state,

        createNotification,
        editNotification,
        getAllNotifications,
        setOpenNotification,
        openNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
export const useNotificationProvider = () => {
  return useContext(NotificationContext);
};
export default NotificationsContextProvider;
