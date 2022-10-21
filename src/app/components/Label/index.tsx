import { styled, Typography } from "@mui/material";

export { TitlePageWithIcon } from "./LabelWithIcon";

export const TitlePage = styled(Typography)(({ theme }) => ({
  fontSize: 20,
  fontWeight: 600,
  textTransform: "uppercase",
  padding: 1,
  color: theme.palette.primary.dark,
}));
