import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";

import { toast } from "react-toastify";
import commentReducer from "../reducer/commentReducer";
import { token } from "../utils/helpers";

const initialState = {
  comments: [],
  isLoading: false,
  isError: false,
  msg: "",

  isEditing: false,
};
const CommentContext = createContext();
function CommentsContextProvider({ children }) {
  const [state, dispatch] = useReducer(commentReducer, initialState);

  const createComment = async (body, taskId) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_LINK}/comment`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        toast.success(response.data.msg);
        getAllComments(taskId);
      }
      console.log(response);
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response });
    }
  };
  const deleteComment = async (id, taskId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_LINK}/comment/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.msg);
        getAllComments(taskId);
      }
      console.log(response);
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response });
    }
  };
  const getAllComments = async (taskId) => {
    try {
      console.log(taskId);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_LINK}/comment/all/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: "ALL_COMMENTS", payload: response.data });

      console.log(response);
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response });
    }
  };
  return (
    <CommentContext.Provider
      value={{
        ...state,
        deleteComment,
        getAllComments,

        createComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
}
export const useCommentProvider = () => {
  return useContext(CommentContext);
};
export default CommentsContextProvider;
