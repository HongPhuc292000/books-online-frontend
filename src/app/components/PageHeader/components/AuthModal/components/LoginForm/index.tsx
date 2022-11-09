import { Button, Grid, TextField } from "@mui/material";
import { withLoading } from "app/components/HOC/withLoadingPage";
import { authActions } from "app/components/PageHeader/slice";
import { useAppDispatch } from "app/hooks";
import { useLoading } from "app/hooks/useLoading";
import useToastMessage from "app/hooks/useToastMessage";
import { useFormik } from "formik";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { LoginParams } from "types";
import { LoginSchema } from "./login.data";

interface LoginFormProps {
  onCloseModal: Function;
  setLoading: Function;
}

const LoginForm = memo(({ onCloseModal, setLoading }: LoginFormProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { showLoading, hideLoading } = useLoading({ setLoading });
  const { showSuccessSnackbar, showErrorSnackbar } = useToastMessage();

  const handleLogin = (values: LoginParams) => {
    showLoading();
    dispatch(
      authActions.login(values, (error) => {
        if (!error) {
          showSuccessSnackbar(t("auth.loginSuccess"));
          hideLoading();
        } else {
          showErrorSnackbar(t(`auth.${error}`));
          hideLoading();
        }
      })
    );
  };

  const handleCancelLogin = () => {
    onCloseModal();
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        {...formik.getFieldProps("username")}
        fullWidth
        required
        label={t("common.username")}
        margin="normal"
        error={!!(formik.touched.username && formik.errors.username)}
        helperText={formik.errors.username}
      />
      <TextField
        {...formik.getFieldProps("password")}
        type="password"
        fullWidth
        required
        label={t("common.password")}
        margin="normal"
        error={!!(formik.touched.password && formik.errors.password)}
        helperText={formik.errors.password}
      />
      <Grid container justifyContent="center" mt={2}>
        <Button
          variant="contained"
          color="success"
          sx={{ mr: 2 }}
          type="submit"
        >
          {t("common.login")}
        </Button>
        <Button variant="contained" color="error" onClick={handleCancelLogin}>
          {t("common.cancel")}
        </Button>
      </Grid>
    </form>
  );
});

export default withLoading(LoginForm);
