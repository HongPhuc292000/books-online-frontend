import { useMediaQuery, useTheme, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import {
  DatePicker,
  DesktopDatePicker,
  MobileDatePicker,
} from "@mui/x-date-pickers";
import moment from "moment";
import { useTranslation } from "react-i18next";

interface SimpleDatePickerProps {
  formik: any;
  field: string;
  tableName: string;
  required?: boolean;
  disablePast?: boolean;
}

export const SimpleDatePicker = ({
  formik,
  field,
  tableName,
  required = false,
  disablePast = false,
}: SimpleDatePickerProps) => {
  const { t } = useTranslation();

  return (
    <>
      <DatePicker
        sx={{ width: "100%" }}
        label={`${t(`${tableName}.${field}`)}${required ? "*" : ""}`}
        value={moment(formik.values[field]) || null}
        onChange={(newValue) => {
          formik.setFieldValue(field, moment(newValue).format(), true);
        }}
        format="DD/MM/YYYY"
      />
    </>
  );
};
