import { createContext, useContext, useReducer, useState } from "react";
import reducer from "../reducer/reducer";

import axios from "axios";
const AuthContext = createContext();

export const initialState = {
  user: {},
  isLoading: false,
  isError: false,
  isRegisteredUser: false,
  msg: "",
  tasks: [],
  isEditing: false,
  isExpired: false,
};
const localStoragePrefix = "Todo-List-";
export const AuthProvider = ({ children }) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [localToken, setLocalToken] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);

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
        body,
        {
          headers: {
            "Access-Control-Allow-Origin":
              "https://todo-list-frontend-five.vercel.app",
          },
        }
      );
      const { data } = response;
      dispatch({ type: "LOGGINGIN", payload: data });
      const { token, username, email } = data;
      localStorage.setItem(`${localStoragePrefix}token`, JSON.stringify(token));
      localStorage.setItem(
        `${localStoragePrefix}details`,
        JSON.stringify({ username, email })
      );
      setLocalToken(token);
      if (data.success === true) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response });
    }
  };
  return (
    <AuthContext.Provider
      value={{
        ...state,
        registerUser,
        loginUser,
        isLoggedIn,
        setIsLoggedIn,
        isRegistered,
        setIsRegistered,
        localToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuthProvider = () => {
  return useContext(AuthContext);
};
