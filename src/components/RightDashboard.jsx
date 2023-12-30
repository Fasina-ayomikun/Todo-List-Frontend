import { Box, Grid, Typography } from "@mui/material";
import SearchBar from "./SearchBar";
import { useTaskProvider } from "../context/tasksContext";
import SingleTask from "./SingleTask";

const RightDashboard = ({ setFullTask, setOpen, setIsTaskDeleted }) => {
  const {
    filteredTasks,

    setEditedTask,
  } = useTaskProvider();
  return (
    <Grid item xs={12} md={7} lg={8}>
      <SearchBar />
      <Box
        className='scroll-container'
        sx={{
          marginTop: "30px",
          height: "100%",
          padding: "0px",
          maxHeight: "54vh",
          overflowY: "scroll",
        }}
      >
        {filteredTasks.length < 1 ? (
          <Typography
            variant='h6'
            sx={{
              borderBottom: "0",
            }}
          >
            No Task Available.
          </Typography>
        ) : (
          filteredTasks.map((task) => {
            return (
              <SingleTask
                key={task._id}
                task={task}
                setEditedTask={setEditedTask}
                setFullTask={setFullTask}
                setOpen={setOpen}
                setIsTaskDeleted={setIsTaskDeleted}
              />
            );
          })
        )}
      </Box>
    </Grid>
  );
};

export default RightDashboard;
