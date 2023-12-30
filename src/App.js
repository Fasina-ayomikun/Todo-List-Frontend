import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Welcome from "./pages/Welcome";
import AddTask from "./pages/AddTask";
import ErrorPage from "./pages/ErrorPage";
import PrivateRoutes from "./auth/PrivateRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UseAuthProvider } from "./context/context";
function App() {
  const token = JSON.parse(localStorage.getItem("Todo-List-token"));
  const { localToken } = UseAuthProvider();

  return (
    <BrowserRouter>
      <ToastContainer
        position='top-center'
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />

      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route
          path='dashboard'
          element={
            <PrivateRoutes token={localToken || token}>
              <Dashboard />
            </PrivateRoutes>
          }
        />

        <Route
          path='/add'
          element={
            <PrivateRoutes token={token}>
              <AddTask />
            </PrivateRoutes>
          }
        />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
