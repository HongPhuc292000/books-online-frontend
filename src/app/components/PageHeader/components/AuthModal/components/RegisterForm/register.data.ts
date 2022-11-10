import { emailRegex } from "utils/constants";
import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  username: Yup.string().required("common.usernameRequired"),
  password: Yup.string().required("common.passwordRequired"),
  repeatPassword: Yup.string().required("common.repeatPasswordRequired"),
  email: Yup.string()
    .required("common.emailRequired")
    .matches(emailRegex, "common.emailNotValid"),
  fullname: Yup.string().required("common.fullnameRequired"),
});
