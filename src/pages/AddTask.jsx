import Button from "@mui/material/Button";

import TextField  from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import { FormHelperText, Stack } from "@mui/material";
import { useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTaskProvider } from "../context/tasksContext";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Loading from "../auth/Loading";
import { UseAuthProvider } from "../context/context";
import { checkExpiredToken, theme } from "../utils/helpers";

export default function AddTask() {
  const [info, setInfo] = useState({});
  const cancelBtnRef = useRef(null);
  const {
    createTask,
    taskAdded,
    isExpired,
    logout,
    isEditing,
    editedTask,
    editTask,
  } = useTaskProvider();
  const { isLoading } = UseAuthProvider();
  const navigate = useNavigate();
  const press = useRef(true);
  const { register, handleSubmit } = useForm();
  const handleFormSubmit = (formData) => {
    setInfo(formData);
  };

  useEffect(() => {
    if (info !== {}) {
      if (press.current) {
        press.current = false;
      } else {
        checkExpiredToken(isExpired, navigate, logout);
        if (isEditing) {
          editTask(editedTask.id, info);
        } else {
          createTask(info);
        }
      }
    } else {
      return;
    }
    // eslint-disable-next-line
  }, [info, isExpired]);

  let minDate = new Date(Date.now()).toISOString().slice(0, -8);
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
            xs: "400px",
            sm: "450px",
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
          mt={3}
        >
          {isEditing ? "Edit Task" : "Add Task"}
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
              label='Title'
              autoComplete='off'
              color='secondary'
              required
              type='text'
              defaultValue={isEditing ? editedTask.title : null}
              {...register("title")}
              inputProps={{
                maxLength: 50,
              }}
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
              label='Description'
              color='secondary'
              type='text'
              autoComplete='off'
              defaultValue={isEditing ? editedTask.description : null}
              {...register("description")}
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
              color='secondary'
              defaultValue={
                isEditing
                  ? editedTask.deadline
                  : new Date(Date.now() + 86400000).toISOString().slice(0, -8)
              }
              type='datetime-local'
              required
              {...register("deadline")}
              placeholder='Deadline'
              inputProps={{
                min: minDate,
              }}
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
            <FormHelperText
              sx={{
                color: "#a39f9f ",
                margin: "0",
                width: "90%",
              }}
            >
              Deadline*
            </FormHelperText>
          </Stack>
          <Stack
            direction='row'
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              alignItems: "center",
              justifyContent: "center",
              width: "90%",
              gap: "10px",
              margin: "0 auto",
              marginTop: "30px",
            }}
          >
            <Button
              variant='contained'
              color='secondary'
              sx={{
                width: "100%",
                margin: "auto",
                color: "#00072D",
                fontSize: {
                  xs: "0.8rem",
                  sm: "0.9rem",
                },
              }}
              type='submit'
            >
              {taskAdded && navigate("/tasks")}
              {isEditing ? "Edit" : "Save"}
            </Button>
            <Button
              variant='contained'
              color='secondary'
              sx={{
                width: "100%",
                margin: "auto",
                color: "#00072D",
                fontSize: {
                  xs: "0.8rem",
                  sm: "0.9rem",
                },
              }}
              onClick={() => {
                cancelBtnRef.current.click();
              }}
            >
              <NavLink to='/dashboard' className='link' ref={cancelBtnRef}>
                Cancel
              </NavLink>
            </Button>
          </Stack>
        </form>
      </Container>
    </ThemeProvider>
  );
}
