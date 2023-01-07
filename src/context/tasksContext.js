import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import reducer from "../reducer/reducer";
import { initialState } from "./context";

const TaskContext = createContext();
function TasksContextProvider({ children }) {
  const [taskAdded, setTaskAdded] = useState(false);
  const [taskRemoved, setTaskRemoved] = useState(false);
  const [editedTask, setEditedTask] = useState({
    id: "",
    title: "",
    description: "",
    deadline: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const createTask = async (body) => {
    dispatch({ type: "LOADING" });
    try {
      const token = JSON.parse(localStorage.getItem("Todo-List-token"));
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_LINK}/tasks`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response;
      dispatch({ type: "TASK_CREATED", payload: data });
      setTaskAdded(true);
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response });
    }
  };

  const getAllTasks = async (sort) => {
    dispatch({ type: "LOADING" });
    try {
      const token = JSON.parse(localStorage.getItem("Todo-List-token"));
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_LINK}/tasks?sort=${sort}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response;
      dispatch({ type: "ALL_TASKS", payload: data });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response });
    }
  };
  const editTask = async (taskId, body) => {
    dispatch({ type: "LOADING" });
    try {
      const token = JSON.parse(localStorage.getItem("Todo-List-token"));
      const response = await axios.patch(
        `${process.env.REACT_APP_BACKEND_LINK}/tasks/${taskId}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response;
      dispatch({ type: "EDITING_TASK", payload: data });
      setTaskAdded(true);
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response });
    }
  };
  const deleteTask = async (taskId) => {
    dispatch({ type: "LOADING" });
    try {
      const token = JSON.parse(localStorage.getItem("Todo-List-token"));
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_LINK}/tasks/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response;
      dispatch({ type: "DELETE_TASK", payload: data });
      setTaskRemoved(true);
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response });
    }
  };
  const logout = () => {
    localStorage.setItem("Todo-List-details", JSON.stringify({}));
    localStorage.setItem("Todo-List-token", JSON.stringify(""));
    toast.success("Logout Successful");
  };
  return (
    <TaskContext.Provider
      value={{
        ...state,
        createTask,
        taskAdded,
        setTaskAdded,
        getAllTasks,
        editTask,
        editedTask,
        setEditedTask,
        isEditing,
        logout,
        setIsEditing,
        deleteTask,
        taskRemoved,
        setTaskRemoved,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
export const useTaskProvider = () => {
  return useContext(TaskContext);
};
export default TasksContextProvider;
