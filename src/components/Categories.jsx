import { Grid } from "@mui/material";
import SidebarContent from "../min-components/SidebarContent";

const Categories = () => {
  return (
    <Grid
      item
      xs={0}
      md={4}
      lg={3}
      className='scroll-container'
      maxHeight={"75vh"}
      sx={{
        borderRadius: "5px",
        width: "100%",
        backgroundColor: "#00072d",
        padding: "30px 0",
        overflowY: "scroll",
        display: {
          xs: "none",
          md: "block",
        },
      }}
    >
      <SidebarContent isModel={false} toggleDrawer={() => {}} />
    </Grid>
  );
};

export default Categories;
