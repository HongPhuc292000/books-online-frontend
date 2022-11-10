import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

interface PasswordFieldProps {
  formik: any;
  showPassword: boolean;
  onToggleShowPassword: Function;
  field: string;
}

const PasswordField = ({
  showPassword,
  onToggleShowPassword,
  field,
  formik,
}: PasswordFieldProps) => {
  const { t } = useTranslation();

  return (
    <TextField
      {...formik.getFieldProps(field)}
      type={showPassword ? "text" : "password"}
      fullWidth
      required
      label={t(`common.${field}`)}
      margin="normal"
      error={formik.touched[field] && !!formik.errors[field]}
      helperText={formik.touched[field] && t(formik.errors[field] as string)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => {
                onToggleShowPassword();
              }}
              //   onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordField;
