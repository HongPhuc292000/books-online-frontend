import { Typography, Grid } from "@mui/material";
import palette from "styles/theme/palette";

const LazyLoad = () => {
  return (
    <Grid sx={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}>
      <Typography variant="body1" sx={{ color: palette.primary.main }}>
        Vui lòng đợi...
      </Typography>
    </Grid>
  );
};

export default LazyLoad;
