import { Button, Grid, TextField } from "@mui/material";
import { memo } from "react";
import { useTranslation } from "react-i18next";

interface RegisterFormProps {
  onCloseModal: Function;
}

const RegisterForm = memo(({ onCloseModal }: RegisterFormProps) => {
  const { t } = useTranslation();

  const handleCancelRegister = () => {
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
      <TextField fullWidth required label={t("common.email")} margin="normal" />
      <TextField
        type="password"
        fullWidth
        required
        label={t("common.password")}
        margin="normal"
      />
      <TextField
        type="password"
        fullWidth
        required
        label={t("common.repeatPassword")}
        margin="normal"
      />
      <Grid container justifyContent="center" mt={2}>
        <Button variant="contained" color="success" sx={{ mr: 2 }}>
          {t("common.register")}
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleCancelRegister}
        >
          {t("common.cancel")}
        </Button>
      </Grid>
    </>
  );
});

export default RegisterForm;
