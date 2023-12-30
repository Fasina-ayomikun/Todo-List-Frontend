import { createContext, useContext, useReducer, useState } from "react";
import reducer from "../reducer/reducer";

import axios from "axios";
import { toast } from "react-toastify";
const AuthContext = createContext();

export const initialState = {
  user: {},
  isLoading: false,
  isError: false,
  msg: "",
  isRegisteredUser: false,
  isExpired: false,
};
export const localStoragePrefix = "Todo-List-";
export const AuthProvider = ({ children }) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [localToken, setLocalToken] = useState("");
  const [localUser, setLocalUser] = useState({});
  const [state, dispatch] = useReducer(reducer, initialState);
  const [AllUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const registerUser = async (body) => {
    dispatch({ type: "LOADING" });
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_LINK}/users/register`,
        body
      );
      const { data } = response;
      dispatch({ type: "REGISTERING", payload: data });
      if (data.success === true) {
        setIsRegistered(true);
        setTimeout(() => {
          setIsRegistered(false);
        }, 1000);
      } else {
        setIsRegistered(false);
      }
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response });
    }
  };
  const loginUser = async (body) => {
    dispatch({ type: "LOADING" });
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_LINK}/users/login`,
        body
      );
      const { data } = response;
      dispatch({ type: "LOGGINGIN", payload: data });
      console.log(data);
      const { token, username, email, profile, _id } = data;
      localStorage.setItem(`${localStoragePrefix}token`, JSON.stringify(token));
      localStorage.setItem(
        `${localStoragePrefix}details`,
        JSON.stringify({ username, email, profile, _id })
      );
      setLocalToken(token);
      setLocalUser({ username, email, profile, _id });
      if (data.success === true) {
        setIsLoggedIn(true);
        setTimeout(() => {
          setIsLoggedIn(false);
        }, 1000);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: "ERROR", payload: error.response });
    }
  };
  const getAllUsers = async () => {
    const profileUser = JSON.parse(localStorage.getItem("Todo-List-details"));
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_LINK}/all-users`
      );
      const { data } = response;
      if (data.success === true) {
        console.log("users gotten");
        const newData = data.users.filter(
          (user) => user._id !== profileUser._id
        );
        setAllUsers(newData);
        setFilteredUsers(newData);
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: "ERROR", payload: error.response });
    }
  };
  const logout = () => {
    localStorage.setItem("Todo-List-details", JSON.stringify({}));
    localStorage.setItem("Todo-List-token", JSON.stringify(""));
    toast.success("Logout Successful");
  };
  return (
    <AuthContext.Provider
      value={{
        ...state,
        registerUser,
        loginUser,
        isLoggedIn,
        logout,
        setIsLoggedIn,
        isRegistered,
        setIsRegistered,
        localToken,
        getAllUsers,
        AllUsers,
        filteredUsers,
        setFilteredUsers,
        localUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuthProvider = () => {
  return useContext(AuthContext);
};
