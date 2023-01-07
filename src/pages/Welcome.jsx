import {
  Button,
  Container,
  IconButton,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useRef } from "react";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { NavLink } from "react-router-dom";
import { theme } from "../utils/helpers";

function Welcome() {
  const registerBtnRef = useRef(null);
  const loginBtnRef = useRef(null);
  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth='sm'
        align='center'
        sx={{
          border: {
            xs: "0",
            sm: "1px solid #fff",
          },
          borderRadius: "10px",
          marginTop: "50px",
          minHeight: "250px",
          height: {
            xs: "300px",
            sm: "350px",
          },
        }}
      >
        <IconButton>
          <AutoStoriesIcon
            color='secondary'
            sx={{
              fontSize: {
                xs: "4rem",
                sm: "7rem",
              },
              margin: "5px 0",
            }}
          />
        </IconButton>
        <Typography
          variant='h4'
          sx={{
            fontSize: {
              xs: "1.5rem",
              sm: "2.5rem",
            },
          }}
          align='center'
        >
          My Todo List
        </Typography>
        <Stack direction='column' spacing={2} mt={4} alignItems='center'>
          <Button
            variant='contained'
            color='secondary'
            sx={{
              width: "90%",
              margin: "auto",
              color: "#00072D",
              fontSize: {
                xs: "0.8rem",
                sm: "1rem",
              },
            }}
            onClick={() => {
              registerBtnRef.current.click();
            }}
          >
            <NavLink to='/register' className='link' ref={registerBtnRef}>
              Register
            </NavLink>
          </Button>
          <Button
            variant='contained'
            color='secondary'
            sx={{
              width: "90%",
              margin: "0 auto",
              color: "#00072D",
              fontSize: {
                xs: "0.8rem",
                sm: "1rem",
              },
            }}
            onClick={() => {
              loginBtnRef.current.click();
            }}
          >
            <NavLink to='/login' className='link' ref={loginBtnRef}>
              Login
            </NavLink>
          </Button>
        </Stack>
      </Container>
    </ThemeProvider>
  );
}

export default Welcome;
