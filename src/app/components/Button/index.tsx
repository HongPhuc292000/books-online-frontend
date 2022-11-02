import { Button, styled } from "@mui/material";

export const SignButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
}));
