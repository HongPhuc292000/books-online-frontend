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

export const LinkLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: "underline",
  cursor: "pointer",
}));

export const NavigateBackLabel = styled(Typography)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  color: theme.palette.primary.main,
  cursor: "pointer",
}));
