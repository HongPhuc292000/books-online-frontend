import { Grid } from "@mui/material";
import { withLoading } from "app/components/HOC/withLoadingPage";
import BookCategories from "./components/BookCategories";
import DoneBooks from "./components/DoneBooks";
import HotBooks from "./components/HotBooks";
import NewBooks from "./components/NewBooks";
import ReadingBooks from "./components/ReadingBooks";

const Home = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <HotBooks />
      </Grid>
      <Grid item xs={12} container spacing={2}>
        <Grid item xs={12} lg={9}>
          <NewBooks />
        </Grid>
        <Grid item xs={12} lg={3}>
          <ReadingBooks />
          <BookCategories />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <DoneBooks />
      </Grid>
    </Grid>
  );
};

export default withLoading(Home);
