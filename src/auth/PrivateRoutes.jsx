import React from "react";
import { Navigate } from "react-router";

function PrivateRoutes({ children, token }) {
  if (!token) {
    console.log(token);
    console.log("auth no token");
    return <Navigate to='/'></Navigate>;
  } else {
    return children;
  }
}

export default PrivateRoutes;
