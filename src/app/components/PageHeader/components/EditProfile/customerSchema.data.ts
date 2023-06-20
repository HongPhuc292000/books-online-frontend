import { AddEditCustomerRequest } from "types";
import { GenderEnum } from "types/enums";
import { emailRegex } from "utils/constants";
import * as Yup from "yup";

export const CustomerSchema = Yup.object().shape({
  fullname: Yup.string().required("user.fullnameRequired"),
  phoneNumber: Yup.string()
    .test(
      "validate-phone-passed",
      "user.phoneNotValid",
      (value, context) => !!value && value[0] === "0"
    )
    .max(10, "user.phoneNotValid")
    .min(10, "user.phoneNotValid")
    .required("user.phoneRequired"),
  email: Yup.string().matches(emailRegex, "user.emailNotValid"),
});

export const defaultValue: AddEditCustomerRequest = {
  username: "",
  password: "",
  fullname: "",
  phoneNumber: "",
  birthday: "",
  gender: GenderEnum.MALE,
};
