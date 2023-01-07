import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import Container from "@mui/material/Container";
import LoginIcon from "@mui/icons-material/Login";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { ThemeProvider } from "@mui/material/styles";
import {
  FormHelperText,
  IconButton,
  InputAdornment,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UseAuthProvider } from "../context/context";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import Loading from "../components/Loading";
import { theme } from "../utils/helpers";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [body, setBody] = useState({});
  const { loginUser, isLoggedIn, setIsRegistered, isLoading } =
    UseAuthProvider();
  const { register, handleSubmit } = useForm();
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleFormSubmit = (formData) => {
    setBody(formData);
  };
  const navigate = useNavigate();
  const press = useRef(true);
  useEffect(() => {
    setIsRegistered(false);
    if (body !== {}) {
      if (press.current) {
        press.current = false;
      } else {
        loginUser(body);
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
            xs: "350px",
            sm: "400px",
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
          columnGap='20px'
          mt={3}
        >
          Login{" "}
          <LoginIcon
            color='secondary'
            sx={{
              fontSize: "2.5rem",
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
            <TextField
              id='outlined-basic'
              label='Email'
              autoComplete='off'
              {...register("email")}
              color='secondary'
              required
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
            <TextField
              id='outlined-basic'
              label='Password'
              color='secondary'
              autoComplete='off'
              required
              {...register("password")}
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
                width: "90%",
                margin: "0 auto",
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={handleShowPassword}>
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
            {isLoggedIn && navigate("/dashboard")}
            Login
          </Button>
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
            Don't have an account?{" "}
            <NavLink to='/register' className='white'>
              Register
            </NavLink>
          </FormHelperText>
        </form>
      </Container>
    </ThemeProvider>
  );
}
