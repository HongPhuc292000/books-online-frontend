import { styled, Typography } from "@mui/material";

export const TitlePage = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  textTransform: "uppercase",
  padding: 1,
  color: theme.palette.primary.dark,
}));

export const CommonLabel = styled(Typography)(() => ({
  fontSize: 12,
}));
