import { toast } from "react-toastify";

function notificationReducer(state, action) {
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
      return { ...state, isLoading: false, isError: true, isExpired: false };
    }
  }
  if (action.type === "ALL_NOTIFICATIONS") {
    const { notifications } = action.payload;
    return {
      ...state,
      isLoading: false,
      isError: false,
      notifications,
    };
  }

  throw new Error(`action type of ${action.type} no found`);
}

export default notificationReducer;
