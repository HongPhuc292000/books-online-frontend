import { Button, Grid, TextField } from "@mui/material";
import { withLoading } from "app/components/HOC/withLoadingPage";
import { authActions } from "app/components/PageHeader/slice";
import PasswordField from "app/components/PasswordField";
import { useAppDispatch } from "app/hooks";
import { useLoading } from "app/hooks/useLoading";
import useToastMessage from "app/hooks/useToastMessage";
import { useFormik } from "formik";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { RegisterRequest } from "types";
import { registerSchema } from "./register.data";

interface RegisterFormProps {
  setLoading: Function;
  onCloseModal: Function;
}

const RegisterForm = memo(({ onCloseModal, setLoading }: RegisterFormProps) => {
  const { t } = useTranslation();
  const { showLoading, hideLoading } = useLoading({ setLoading });
  const dispatch = useAppDispatch();
  const { showSuccessSnackbar, showErrorSnackbar } = useToastMessage();
  const [showPassword, setShowPassword] = useState({
    password: false,
    repeatPassword: false,
  });

  const handleCancelRegister = () => {
    onCloseModal();
  };

  const handleToggleShowPassword = () => {
    setShowPassword((prev) => ({ ...prev, password: !prev.password }));
  };

  const handleToggleShowRepeatPassword = () => {
    setShowPassword((prev) => ({
      ...prev,
      repeatPassword: !prev.repeatPassword,
    }));
  };

  const handleRegister = (values: RegisterRequest) => {
    showLoading();
    dispatch(
      authActions.register(values, (error) => {
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

  const formik = useFormik({
    initialValues: {
      username: "",
      phoneNumber: "",
      password: "",
      repeatPassword: "",
      fullname: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      const { username, password, phoneNumber, fullname } = values;
      const formValues = {
        username,
        phoneNumber,
        password,
        fullname,
      };
      handleRegister(formValues);
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
        error={formik.touched.username && !!formik.errors.username}
        helperText={
          formik.touched.username && t(formik.errors.username as string)
        }
      />
      <TextField
        {...formik.getFieldProps("fullname")}
        fullWidth
        required
        label={t("common.fullname")}
        margin="normal"
        error={formik.touched.fullname && !!formik.errors.fullname}
        helperText={
          formik.touched.fullname && t(formik.errors.fullname as string)
        }
      />
      <TextField
        {...formik.getFieldProps("phoneNumber")}
        fullWidth
        required
        label={t("user.phoneNumber")}
        margin="normal"
        error={formik.touched.phoneNumber && !!formik.errors.phoneNumber}
        helperText={
          formik.touched.phoneNumber && t(formik.errors.phoneNumber as string)
        }
      />
      <PasswordField
        formik={formik}
        showPassword={showPassword.password}
        onToggleShowPassword={handleToggleShowPassword}
        field="password"
      />
      <PasswordField
        formik={formik}
        showPassword={showPassword.password}
        onToggleShowPassword={handleToggleShowRepeatPassword}
        field="repeatPassword"
      />
      <Grid container justifyContent="center" mt={2}>
        <Button
          type="submit"
          variant="contained"
          color="success"
          sx={{ mr: 2 }}
        >
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
    </form>
  );
});

export default withLoading(RegisterForm);
