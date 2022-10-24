import { memo } from "react";

import { Grid, Box, styled } from "@mui/material";

export const Iteminfo = styled(Grid)(({ theme }) => ({
  lineHeight: theme.spacing(5),
  height: theme.spacing(5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
}));

export const HomeItem = memo(() => {
  return (
    <Grid container>
      <Iteminfo item xs={6}>
        aa
      </Iteminfo>
      <Iteminfo item xs={2}>
        aa
      </Iteminfo>
      <Iteminfo item xs={2}>
        aa
      </Iteminfo>
      <Iteminfo item xs={2}>
        aa
      </Iteminfo>
    </Grid>
  );
});
