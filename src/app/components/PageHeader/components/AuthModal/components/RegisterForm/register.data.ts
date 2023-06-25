import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  username: Yup.string().required("common.usernameRequired"),
  password: Yup.string().required("common.passwordRequired"),
  repeatPassword: Yup.string().required("common.repeatPasswordRequired"),
  phoneNumber: Yup.string()
    .test(
      "validate-phone-passed",
      "user.phoneNotValid",
      (value, context) => !!value && value[0] === "0"
    )
    .max(10, "user.phoneNotValid")
    .min(10, "user.phoneNotValid")
    .required("user.phoneRequired"),
  fullname: Yup.string().required("common.fullnameRequired"),
});
