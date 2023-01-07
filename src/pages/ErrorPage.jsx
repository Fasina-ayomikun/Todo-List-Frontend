import { Button, Container, ThemeProvider, Typography } from "@mui/material";
import React from "react";
import { useRef } from "react";
import { NavLink } from "react-router-dom";
import { theme } from "../utils/helpers";

function ErrorPage() {
  const linkRef = useRef();
  return (
    <ThemeProvider theme={theme}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant='h1'
          sx={{
            margin: "auto",
            color: "#fff",
            fontSize: {
              xs: "3rem",
              sm: "7rem",
            },
            fontWeight: "700",
            marginTop: "200px",
          }}
        >
          404
        </Typography>

        <Button
          variant='contained'
          color='secondary'
          sx={{
            width: "200px",
            margin: "auto",
            color: "#00072D",
            fontSize: {
              xs: "0.8rem",
              sm: "0.9rem",
            },
          }}
        >
          <NavLink to='/' className='link' ref={linkRef}>
            Go Back Home
          </NavLink>
        </Button>
      </Container>
    </ThemeProvider>
  );
}

export default ErrorPage;
