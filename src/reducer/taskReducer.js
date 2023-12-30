import { toast } from "react-toastify";

function taskReducer(state, action) {
  if (action.type === "LOADING") {
    return { ...state, isLoading: true, isError: false, isExpired: false };
  }

  if (action.type === "ERROR") {
    console.log(action);
    const { data } = action.payload;
    const { msg } = data;
    if (msg.includes("jwt expired")) {
      toast.error("Token Expired, Please login", {
        toastId: "jwt_error",
      });

      return { ...state, isLoading: false, isError: true, isExpired: true };
    } else {
      toast.error(msg, {
        toastId: "error",
      });
      return { ...state, isLoading: false, isError: true, isExpired: false };
    }
  }

  if (action.type === "TASK_CREATED") {
    const { msg } = action.payload;
    toast.success(msg, {
      toastId: "created",
    });
    return {
      ...state,
      msg,
      isLoading: false,
      isError: false,
      isEditing: false,
      isExpired: false,
    };
  }
  if (action.type === "ALL_TASKS") {
    const { msg, tasks } = action.payload;
    return {
      ...state,
      msg,
      isLoading: false,
      isError: false,
      tasks,
      filteredTasks: tasks,
      isExpired: false,
    };
  }

  if (action.type === "ALL_TASKS_INVOLVED") {
    const { msg, tasks } = action.payload;
    return {
      ...state,
      msg,
      isLoading: false,

      filteredTasks: [...tasks],
      isError: false,
      tasks,
      isExpired: false,
    };
  }
  if (action.type === "FILTER_TASK_BY_TAG") {
    const tag = action.payload;
    state.filteredTasks = [...state.tasks];
    let tempTasks = [];
    if (tag.toLowerCase() === "all") {
      tempTasks = [...state.tasks];
    } else {
      tempTasks = state.tasks.filter((task) =>
        task.tags.includes(tag.toLowerCase())
      );
    }
    console.log(tempTasks);
    return {
      ...state,
      filteredTasks: tempTasks,
      isLoading: false,
      isError: false,
      isExpired: false,
    };
  }
  if (action.type === "FILTER_TASK_BY_SEARCH") {
    const text = action.payload;
    state.filteredTasks = [...state.tasks];

    const tempTasks = state.tasks.filter((task) =>
      task.title.toLowerCase().startsWith(text.toLowerCase())
    );
    console.log(tempTasks);
    return {
      ...state,
      filteredTasks: tempTasks,
      isLoading: false,
      isError: false,
      isExpired: false,
    };
  }
  if (action.type === "SORT_TASK") {
    const text = action.payload;
    state.filteredTasks = [...state.tasks];
    let tempTasks = [];
    if (text === "descending") {
      tempTasks = state.tasks.sort((a, b) => {
        console.log(new Date(a.createdAt));
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
    } else if (text === "ascending") {
      tempTasks = state.tasks.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
    console.log(tempTasks);
    return {
      ...state,
      filteredTasks: tempTasks,
      isLoading: false,
      isError: false,
      isExpired: false,
    };
  }
  if (action.type === "EDITING_TASK") {
    const { msg } = action.payload;
    toast.success(msg, {
      toastId: "edited",
    });
    return {
      ...state,
      msg,
      isLoading: false,
      isError: false,
      isEditing: true,
      isExpired: false,
    };
  }
  if (action.type === "DELETE_TASK") {
    const { msg } = action.payload;
    toast.success(msg, {
      toastId: "deleted",
    });
    return {
      ...state,
      msg,
      isLoading: false,
      isError: false,
      isEditing: false,
      isExpired: false,
    };
  }

  throw new Error(`action type of ${action.type} no found`);
}

export default taskReducer;
