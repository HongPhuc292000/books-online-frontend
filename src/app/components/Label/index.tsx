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

export const ErrorLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: 12,
  margin: "3px 14px 0",
}));
