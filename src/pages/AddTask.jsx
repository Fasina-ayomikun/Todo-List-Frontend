import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  Stack,
} from "@mui/material";
import { useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTaskProvider } from "../context/tasksContext";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Loading from "../auth/Loading";
import { UseAuthProvider } from "../context/context";
import {
  checkExpiredToken,
  dashboardUser,
  inputStyle,
  minDate,
  theme,
} from "../utils/helpers";
import AvatarList from "../components/AvatarList";
import AllUsersMenu from "../components/AllUsersMenu";
import TagLists from "../min-components/TagLists";
export default function AddTask() {
  const { createTask, taskAdded, isEditing, editedTask, editTask } =
    useTaskProvider();
  const { isExpired, logout } = UseAuthProvider();
  const [participants, setParticipants] = useState(
    editedTask.participants || []
  );
  const [tags, setIags] = useState(editedTask.tags || []);
  const cancelBtnRef = useRef(null);
  const { isLoading } = UseAuthProvider();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const { getAllUsers } = UseAuthProvider();

  const handleFormSubmit = (formData) => {
    checkExpiredToken(isExpired, navigate, logout);
    if (isEditing) {
      editTask(editedTask.id, {
        ...formData,
        tags,
        participants,
        user: dashboardUser?._id,
      });
    } else {
      createTask({ ...formData, completed: [], tags, participants });
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    if (tags.length !== 2) {
      setIags(typeof value === "string" ? value.split(",") : value);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);
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
          height: {
            xs: "100%",
            sm: "100%",
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
              sx={{ ...inputStyle, width: "90%" }}
            />
            <TextField
              id='outlined-basic'
              label='Description'
              color='secondary'
              type='text'
              autoComplete='off'
              defaultValue={isEditing ? editedTask.description : null}
              {...register("description")}
              sx={{ ...inputStyle, width: "90%" }}
            />
            <FormControl sx={{ m: 1, width: "90%" }} color='primary'>
              <InputLabel
                id='demo-multiple-chip-label'
                color='secondary'
                sx={{ color: "#c7c7c7" }}
              >
                Tags
              </InputLabel>
              <TagLists handleChange={handleChange} tags={tags} />
            </FormControl>
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
              sx={{ ...inputStyle, width: "90%" }}
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
              justifyContent: "start",
              width: "90%",
              gap: "10px",
              margin: "0 auto",
              marginTop: "10px",
            }}
          >
            <Typography
              sx={{
                color: "#a39f9f ",
                margin: "0",
                textAlign: "start",
              }}
            >
              Participants:
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "2px",
              }}
            >
              <AvatarList data={participants} modal={true} />

              <AllUsersMenu
                participants={participants}
                setParticipants={setParticipants}
              />
            </Box>
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
              margin: "30px auto",
            }}
          >
            <Button
              variant='contained'
              color='secondary'
              sx={{
                width: "100%",
                margin: "auto",
                fontSize: {
                  xs: "0.8rem",
                  sm: "0.9rem",
                },
              }}
              type='submit'
            >
              {taskAdded && navigate("/dashboard")}
              {isEditing ? "Edit" : "Save"}
            </Button>
            <Button
              variant='contained'
              color='red'
              sx={{
                width: "100%",
                margin: "auto",
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
