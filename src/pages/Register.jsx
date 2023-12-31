import StickyNote2RoundedIcon from "@mui/icons-material/StickyNote2Rounded";
import Button from "@mui/material/Button";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import TextField from "@mui/material/TextField";

import Typography from "@mui/material/Typography";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import Container from "@mui/material/Container";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import {
  Avatar,
  Box,
  FormHelperText,
  IconButton,
  InputAdornment,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UseAuthProvider } from "../context/context";

import { useRef } from "react";
import Loading from "../auth/Loading";
import { inputStyle, theme } from "../utils/helpers";
import axios from "axios";
import { toast } from "react-toastify";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [preview, setPreview] = useState("");
  const [image, setImage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { registerUser, isRegistered, isLoading } = UseAuthProvider();
  const { register, handleSubmit } = useForm();
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const formData = new FormData();
  const uploadImage = async (file) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_LINK}/files`,
        file,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        setImage(response?.data?.url);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.msg);
    }
  };
  //FIXME: Fix the submitting
  const handleFormSubmit = async (formData) => {
    setSubmitting(true);
    if (preview) {
      await uploadImage(preview);
    }
    try {
      await registerUser({ ...formData, image });
      setSubmitting(false);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const navigate = useNavigate();
  const inputRef = useRef();
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();
    formData.append("image", file);

    reader.onload = async () => {
      const result = reader.result;
      if (result) {
        setPreview(result);
      }
    };
    reader.onerror = async (error) => {
      console.log(error);
    };
    reader.readAsDataURL(file);
  };
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
            sm: "600px",
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
          <Avatar
            src={preview ? preview : "../images/no-profile.jpg"}
            sx={{ width: 100, height: 100, mx: "auto", my: "20px" }}
          />
          <input
            type='file'
            name=''
            ref={inputRef}
            className='hidden'
            onChange={handleImageUpload}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              cursor: "pointer",
            }}
            onClick={() => {
              inputRef?.current?.click();
            }}
          >
            <AddPhotoAlternateOutlinedIcon />
            <Typography variant='p'>Add Profile Pic</Typography>
          </Box>
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
                sx={{ ...inputStyle, width: "100%" }}
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
              sx={{ ...inputStyle, width: "90%" }}
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
                sx={{ ...inputStyle, width: "100%" }}
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
                sx={{ ...inputStyle, width: "100%" }}
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
            disabled={submitting}
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
            {submitting ? "Registering..." : "Register"}
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
