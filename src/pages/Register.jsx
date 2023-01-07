import StickyNote2RoundedIcon from "@mui/icons-material/StickyNote2Rounded";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Typography from "@mui/material/Typography";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import Container from "@mui/material/Container";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import {
  FormHelperText,
  IconButton,
  InputAdornment,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UseAuthProvider } from "../context/context";
import { useEffect } from "react";
import { useRef } from "react";
import Loading from "../auth/Loading";
import { theme } from "../utils/helpers";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [body, setBody] = useState({});
  const { registerUser, isRegistered, isLoading } = UseAuthProvider();
  const { register, handleSubmit } = useForm();
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleFormSubmit = (formData) => {
    setBody(formData);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const navigate = useNavigate();
  const press = useRef(true);
  useEffect(() => {
    if (body !== {}) {
      if (press.current) {
        press.current = false;
      } else {
        registerUser(body);
      }
    } else {
      return;
    }
    // eslint-disable-next-line
  }, [body]);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <ThemeProvider theme={theme}>
      <Container
        component='main'
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
            sm: "480px",
          },
        }}
      >
        <Typography
          variant='h4'
          sx={{
            fontSize: {
              xs: "1.5rem",
              sm: "2.5rem",
            },
          }}
          align='center'
          display='flex'
          alignItems='center'
          justifyContent='center'
          columnGap='10px'
          mt={3}
        >
          Register{" "}
          <StickyNote2RoundedIcon
            color='secondary'
            sx={{
              fontSize: "3rem",
              margin: "0",
            }}
          />
        </Typography>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Stack
            direction='column'
            display='flex'
            alignItems='center'
            spacing={2}
            mt={4}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              width='90%'
              spacing={2}
            >
              <TextField
                id='outlined-basic'
                label='First Name'
                color='secondary'
                autoComplete='off'
                required
                {...register("firstName")}
                type='text'
                sx={{
                  input: {
                    color: "#c7c7c7",
                  },
                  label: {
                    color: "#a39f9f !important",
                  },
                  textDecoration: "capitalize",
                  fieldset: { borderColor: "#fff", "&:hover": "#fff" },
                  "& .MuiOutlinedInput-root:hover": {
                    "& > fieldset": {
                      borderColor: "#a39f9f",
                    },
                  },
                  width: "100%",
                  margin: "0 auto",
                }}
              />{" "}
              <TextField
                id='outlined-basic'
                label='Last Name'
                autoComplete='off'
                color='secondary'
                {...register("lastName")}
                required
                type='text'
                sx={{
                  input: {
                    color: "#c7c7c7",
                  },
                  label: {
                    color: "#a39f9f !important",
                  },

                  textDecoration: "capitalize",
                  fieldset: { borderColor: "#fff", "&:hover": "#fff" },
                  "& .MuiOutlinedInput-root:hover": {
                    "& > fieldset": {
                      borderColor: "#a39f9f",
                    },
                  },
                  width: "100%",
                  margin: "0 auto",
                }}
              />
            </Stack>
            <TextField
              id='outlined-basic'
              label='Email'
              color='secondary'
              autoComplete='off'
              required
              {...register("email")}
              type='email'
              sx={{
                input: {
                  color: "#c7c7c7",
                },
                label: {
                  color: "#a39f9f !important",
                },
                fieldset: { borderColor: "#fff", "&:hover": "#fff" },
                "& .MuiOutlinedInput-root:hover": {
                  "& > fieldset": {
                    borderColor: "#a39f9f",
                  },
                },
                width: "90%",
                margin: "0 auto",
              }}
            />
            <Stack
              direction={{ xs: "column", sm: "row" }}
              width='90%'
              spacing={2}
            >
              <TextField
                id='outlined-basic'
                label='Password'
                color='secondary'
                {...register("password")}
                required
                type={showPassword ? "text" : "password"}
                sx={{
                  input: {
                    color: "#c7c7c7",
                  },
                  label: {
                    color: "#a39f9f !important",
                  },
                  fieldset: { borderColor: "#fff", "&:hover": "#fff" },
                  "& .MuiOutlinedInput-root:hover": {
                    "& > fieldset": {
                      borderColor: "#a39f9f",
                    },
                  },
                  width: "100%",
                  margin: "0 auto",
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleShowPassword}
                      >
                        {showPassword ? (
                          <VisibilityRoundedIcon
                            sx={{
                              color: "#979696",
                            }}
                          />
                        ) : (
                          <VisibilityOffRoundedIcon
                            sx={{
                              color: "#979696",
                            }}
                          />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                id='outlined-basic'
                label='Confirm Password'
                color='secondary'
                required
                {...register("password2")}
                type={showConfirmPassword ? "text" : "password"}
                sx={{
                  input: {
                    color: "#c7c7c7",
                  },
                  label: {
                    color: "#a39f9f !important",
                  },
                  fieldset: { borderColor: "#fff", "&:hover": "#fff" },
                  "& .MuiOutlinedInput-root:hover": {
                    "& > fieldset": {
                      borderColor: "#a39f9f",
                    },
                  },
                  width: "100%",
                  margin: "0 auto",
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleShowConfirmPassword}
                      >
                        {showConfirmPassword ? (
                          <VisibilityRoundedIcon
                            sx={{
                              color: "#979696",
                            }}
                          />
                        ) : (
                          <VisibilityOffRoundedIcon
                            sx={{
                              color: "#979696",
                            }}
                          />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
          </Stack>
          <Button
            variant='contained'
            color='secondary'
            type='submit'
            sx={{
              width: "30%",
              margin: "auto",
              marginTop: "30px",
              color: "#00072D",
              fontSize: {
                xs: "0.8rem",
                sm: "0.9rem",
              },
            }}
          >
            {isRegistered && navigate("/login")}
            Register
          </Button>
        </form>

        <FormHelperText
          mt={4}
          color='secondary'
          sx={{
            color: "#fff",
            textAlign: "center",
            marginTop: "25px",
            fontSize: "0.9rem",
          }}
        >
          Already have an account?{" "}
          <NavLink to='/login' className='white'>
            Login
          </NavLink>
        </FormHelperText>
      </Container>
    </ThemeProvider>
  );
}
