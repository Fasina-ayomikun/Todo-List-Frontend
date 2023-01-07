import { toast } from "react-toastify";

function reducer(state, action) {
  if (action.type === "LOADING") {
    return { ...state, isLoading: true, isError: false, isExpired: false };
  }

  if (action.type === "ERROR") {
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
  if (action.type === "LOGGINGIN") {
    const { msg, username, email } = action.payload;
    toast.success(msg, {
      toastId: "123",
    });

    return {
      ...state,
      user: { username, email },
      isLoading: false,
      msg,

      isError: false,
      isExpired: false,
    };
  }
  if (action.type === "REGISTERING") {
    const { msg } = action.payload;
    toast.success(msg);
    return {
      ...state,
      msg,
      isLoading: false,
      isError: false,
      isExpired: false,
    };
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

export default reducer;
