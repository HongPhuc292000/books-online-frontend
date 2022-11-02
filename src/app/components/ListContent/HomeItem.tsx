import { Grid, Box, styled } from "@mui/material";
import { borderContentStyle } from "styles/theme/utils";

export const ListContentWrap = styled(Box)(() => ({
  "& > div:first-of-type": { borderTop: borderContentStyle },
  borderLeft: borderContentStyle,
}));

export const ItemInfo = styled(Grid)(({ theme }) => ({
  lineHeight: theme.spacing(5),
  height: theme.spacing(5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  borderBottom: borderContentStyle,
  borderRight: borderContentStyle,
}));
