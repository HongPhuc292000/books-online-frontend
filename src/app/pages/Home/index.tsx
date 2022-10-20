import { Grid, Box } from "@mui/material";
import { withLoading } from "app/components/HOC/withLoadingPage";
import { TitlePageWithIcon } from "app/components/Label";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

const Home = () => {
  return (
    <Box>
      <Grid container>
        <TitlePageWithIcon
          title="Truyện hot"
          icon={<LocalFireDepartmentIcon color="inherit" />}
        />
      </Grid>
      <Grid container></Grid>
    </Box>
  );
};

export default withLoading(Home);
