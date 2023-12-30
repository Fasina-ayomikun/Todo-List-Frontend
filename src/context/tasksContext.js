import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import taskReducer from "../reducer/taskReducer";
import { dashboardUser, token } from "../utils/helpers";

const initialState = {
  tasks: [],
  filteredTasks: [],
  isLoading: false,
  isError: false,
  msg: "",

  isEditing: false,
};
const TaskContext = createContext();
function TasksContextProvider({ children }) {
  const [taskAdded, setTaskAdded] = useState(false);
  const [taskRemoved, setTaskRemoved] = useState(false);
  const [sorting, setSorting] = useState(false);
  const [editedTask, setEditedTask] = useState({
    id: "",
    title: "",
    description: "",
    deadline: "",
    completed: [],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [state, dispatch] = useReducer(taskReducer, initialState);

  const getAllTasks = async (sort) => {
    dispatch({ type: "LOADING" });
    try {
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
  const getAllTasksInvolved = async (id) => {
    dispatch({ type: "LOADING" });
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_LINK}/tasks/users/all/${id}?sort=-createdAt`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response;
      console.log(data);
      dispatch({ type: "ALL_TASKS_INVOLVED", payload: data });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response });
    }
  };
  const createTask = async (body) => {
    dispatch({ type: "LOADING" });
    try {
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
      console.log(data);
      dispatch({ type: "TASK_CREATED", payload: data });
      if (response.status === 201) {
        getAllTasksInvolved(dashboardUser._id);
        setTaskAdded(true);
        setTimeout(() => {
          setTaskAdded(false);
        }, [2000]);
      }
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response });
    }
  };
  const editTask = async (taskId, body) => {
    dispatch({ type: "LOADING" });
    console.log(body);
    try {
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
      if (response.status === 200) {
        getAllTasksInvolved(dashboardUser._id);
        setTaskAdded(true);
        setTimeout(() => {
          setTaskAdded(false);
        }, [2000]);
      }
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response });
    }
  };
  const deleteTask = async (taskId) => {
    dispatch({ type: "LOADING" });
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_LINK}/tasks/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setTaskRemoved(true);
        getAllTasksInvolved(dashboardUser._id);
        setTimeout(() => {
          setTaskRemoved(false);
        }, [2000]);
      }
      const { data } = response;
      dispatch({ type: "DELETE_TASK", payload: data });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.response });
    }
  };

  const filterTaskByTag = (tag) => {
    console.log(tag);
    dispatch({ type: "FILTER_TASK_BY_TAG", payload: tag });
  };
  const filterTaskBySearch = (text) => {
    dispatch({ type: "FILTER_TASK_BY_SEARCH", payload: text });
  };
  const sortTask = (text) => {
    dispatch({ type: "SORT_TASK", payload: text });
  };

  return (
    <TaskContext.Provider
      value={{
        ...state,

        setSorting,
        sorting,
        sortTask,
        filterTaskByTag,
        createTask,
        filterTaskBySearch,
        taskAdded,
        setTaskAdded,
        getAllTasks,
        editTask,
        editedTask,
        setEditedTask,
        isEditing,
        setIsEditing,
        deleteTask,
        taskRemoved,
        setTaskRemoved,
        getAllTasksInvolved,
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
