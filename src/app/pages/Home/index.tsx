import { Button } from "@mui/material";
import { withLoading } from "app/components/HOC/withLoadingPage";

const Home = () => {
  return (
    <div>
      <Button variant="contained" color="primary">
        halo
      </Button>
    </div>
  );
};

export default withLoading(Home);
