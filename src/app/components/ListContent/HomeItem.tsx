import { memo } from "react";

import { Grid, Box, styled } from "@mui/material";
import { borderContentStyle } from "styles/theme/utils";
import { StatusLabel } from "../Label/StatusLabel";

export const ItemInfo = styled(Grid)(({ theme }) => ({
  lineHeight: theme.spacing(5),
  height: theme.spacing(5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  borderBottom: borderContentStyle,
  borderRight: borderContentStyle,
}));

export const HomeItem = memo(() => {
  return (
    <Grid container>
      <ItemInfo item xs={6}>
        <StatusLabel status="HOT" />
      </ItemInfo>
      <ItemInfo item xs={2}>
        aa
      </ItemInfo>
      <ItemInfo item xs={2}>
        aa
      </ItemInfo>
      <ItemInfo item xs={2}>
        aa
      </ItemInfo>
    </Grid>
  );
});
