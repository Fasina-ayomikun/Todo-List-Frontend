import { Avatar, Box, Button, Typography } from "@mui/material";
import SidebarContent from "../min-components/SidebarContent";
import { UseAuthProvider } from "../context/context";
import { useNavigate } from "react-router";
const Drawer = ({ openDrawer, toggleDrawer }) => {
  const dashboardUser = JSON.parse(localStorage.getItem("Todo-List-details"));
  const { logout } = UseAuthProvider();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        position: "fixed",
        top: "0px",
        transform: openDrawer ? "translateX(0%)" : "translate(-100%)",
        transition: "0.5s ease-in",
        left: "0px",
        background: "rgba(0,0,0,0.6)",
        height: "100vh",
        zIndex: "15",
        width: "100vw",

        display: {
          xs: "flex",
          md: "none",
        },
      }}
      onClick={toggleDrawer}
    >
      <Box
        sx={{
          background: "#00072d",
          width: {
            xs: "100vw",
            sm: "60%",
          },
          height: "100%",
          marginBottom: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            padding: "15px 15px",
            gap: "15px",
          }}
        >
          <Avatar
            alt=''
            src={
              dashboardUser?.profile
                ? dashboardUser?.profile
                : "../images/no-profile.jpg"
            }
            sx={{ width: { xs: 50, sm: 90 }, height: { xs: 50, sm: 90 } }}
          />
          <Box
            sx={{
              width: {
                xs: "70%",
                sm: "100%",
              },
            }}
          >
            <Typography
              variant='h4'
              sx={{
                textAlign: "start",
                fontSize: {
                  xs: "1.4rem",
                },
              }}
            >
              {dashboardUser?.username}
            </Typography>
            <Typography
              variant='p'
              component='p'
              sx={{
                color: "#ccc",
                textAlign: "start",
                fontSize: {
                  xs: "0.9rem",
                },
              }}
            >
              {dashboardUser?.email}
            </Typography>
          </Box>
        </Box>
        <SidebarContent isModel={true} toggleDrawer={toggleDrawer} />
        <Button
          variant='text'
          color='gold'
          sx={{
            width: "100%",
            fontSize: {
              xs: "0.65rem",
              sm: "0.9rem",
            },
            textDecoration: "underline",
          }}
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          Sign Out
        </Button>
      </Box>
    </Box>
  );
};

export default Drawer;
