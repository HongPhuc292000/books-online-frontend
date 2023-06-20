import { Box, Button, Grid, TextField } from "@mui/material";
import useToastMessage from "app/hooks/useToastMessage";
import { useFormik } from "formik";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { AddEditCustomerRequest, ImageFileType } from "types";

import { useAppDispatch, useAppSelector } from "app/hooks";
import React from "react";
import { defaultValue, CustomerSchema } from "./customerSchema.data";
import { useLoading } from "app/hooks/useLoading";
import RoundMediaCard from "app/components/MediaCard/RoundMediaCard";
import { SimpleDatePicker } from "app/components/DatePicker/SimpleDatePicker";
import RadioSingleItem from "app/components/RadioSelect/RadioSingleItem";
import { GenderEnum } from "types/enums";
import { withLoading } from "app/components/HOC/withLoadingPage";
import { selectAuth } from "../../slice/selector";
import { authActions } from "../../slice";

interface EditMemberProps {
  onCloseDialog: () => void;
  setLoading: Function;
}

const EditMember = memo(({ onCloseDialog, setLoading }: EditMemberProps) => {
  const [image, setImage] = useState<ImageFileType>({
    file: null,
    url: "",
  });
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);
  const { showLoading, hideLoading } = useLoading({ setLoading });
  const { showErrorSnackbar, showSuccessSnackbar } = useToastMessage();

  const handleGetDetailUser = () => {
    if (user?._id) {
      dispatch(authActions.getUserInfo(user._id, () => {}));
    }
  };

  console.log(image.file);

  const handleSubmit = (values: AddEditCustomerRequest) => {
    if (user?._id) {
      console.log(values);
      showLoading();
      dispatch(
        authActions.editCustomer(
          {
            id: user._id,
            formData: values,
            file: image.file,
          },
          (error) => {
            if (error) {
              hideLoading();
              onCloseDialog();
              showErrorSnackbar(t(`error.${error}`));
            } else {
              handleGetDetailUser();
              hideLoading();
              onCloseDialog();
              showSuccessSnackbar(t(`success.edit_profile_success`));
            }
          }
        )
      );
    }
  };

  const formik = useFormik({
    initialValues: defaultValue,
    validationSchema: CustomerSchema,
    onSubmit: (values) => {
      handleSubmit({ ...values, imageUrl: image.url });
    },
  });

  const handleResetForm = () => {
    if (user) {
      formik.resetForm({
        values: {
          imageUrl: user.imageUrl,
          username: user.username,
          password: user.password,
          fullname: user.fullname,
          phoneNumber: user.phoneNumber,
          email: user.email,
          birthday: user.birthday,
          gender: user.gender,
        },
      });
      setImage({ ...image, url: user.imageUrl });
    }
  };

  React.useEffect(() => {
    handleResetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} alignItems="end">
        <Grid item>
          <RoundMediaCard url={image.url} setImage={setImage} mb={2} />
        </Grid>
        <Grid item flex={1}>
          <TextField
            id="phoneNumber"
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            fullWidth
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            sx={{ mb: 2 }}
            label={`${t("user.phoneNumber")}*`}
            error={formik.touched.phoneNumber && !!formik.errors.phoneNumber}
            helperText={
              formik.touched.phoneNumber &&
              t(formik.errors.phoneNumber as string)
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="fullname"
            name="fullname"
            value={formik.values.fullname}
            onChange={formik.handleChange}
            fullWidth
            sx={{ mb: 2 }}
            label={`${t("user.fullname")}*`}
            error={formik.touched.fullname && !!formik.errors.fullname}
            helperText={
              formik.touched.fullname && t(formik.errors.fullname as string)
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            id="username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            fullWidth
            sx={{ mb: 2 }}
            label={`${t("user.username")}*`}
            error={formik.touched.username && !!formik.errors.username}
            helperText={
              formik.touched.username && t(formik.errors.username as string)
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            fullWidth
            sx={{ mb: 2 }}
            label={`${t("user.password")}*`}
            error={formik.touched.password && !!formik.errors.password}
            helperText={
              formik.touched.password && t(formik.errors.password as string)
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            fullWidth
            sx={{ mb: 2 }}
            label={t("common.email")}
            error={formik.touched.email && !!formik.errors.email}
            helperText={
              formik.touched.email && t(formik.errors.email as string)
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <SimpleDatePicker
            formik={formik}
            field="birthday"
            tableName="user"
            required={true}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <RadioSingleItem
            allItems={Object.keys(GenderEnum)}
            field="gender"
            isRow={true}
            selected={formik.values.gender || ""}
            setFieldValue={formik.setFieldValue}
          />
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "right", mt: 4 }}>
        <Button variant="contained" color="success" type="submit">
          {t("common.edit")}
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ mx: 1 }}
          onClick={handleResetForm}
        >
          {t("common.reset")}
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            onCloseDialog();
          }}
        >
          {t("common.close")}
        </Button>
      </Box>
    </Box>
  );
});

export default withLoading(EditMember);
