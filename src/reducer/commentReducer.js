import { toast } from "react-toastify";

function commentReducer(state, action) {
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
  if (action.type === "ALL_COMMENTS") {
    const { comments } = action.payload;
    return {
      ...state,
      isLoading: false,
      isError: false,
      comments,
    };
  }

  throw new Error(`action type of ${action.type} no found`);
}

export default commentReducer;
