import { Button, Grid, TextField } from "@mui/material";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import authService from "services/auth";

interface LoginFormProps {
  onCloseModal: Function;
}

const LoginForm = memo(({ onCloseModal }: LoginFormProps) => {
  const { t } = useTranslation();

  const handleLogin = async () => {
    const response = await authService.login({
      username: "Helen",
      password: "Helen020920",
    });

    console.log(response);
  };

  const handleCancelLogin = () => {
    onCloseModal();
  };

  return (
    <>
      <TextField
        fullWidth
        required
        label={t("common.username")}
        margin="normal"
      />
      <TextField
        type="password"
        fullWidth
        required
        label={t("common.password")}
        margin="normal"
      />
      <Grid container justifyContent="center" mt={2}>
        <Button
          variant="contained"
          color="success"
          sx={{ mr: 2 }}
          onClick={handleLogin}
        >
          {t("common.login")}
        </Button>
        <Button variant="contained" color="error" onClick={handleCancelLogin}>
          {t("common.cancel")}
        </Button>
      </Grid>
    </>
  );
});

export default LoginForm;
