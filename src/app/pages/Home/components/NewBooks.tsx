import { Grid } from "@mui/material";
import { TitlePageWithIcon } from "app/components/Label";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import { FilterWithSelect } from "app/components/SelectOptionBox";
import { useTranslation } from "react-i18next";
import React, { memo } from "react";
import { HomeTable } from "app/components/Table";

const NewBooks = memo(() => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <Grid container justifyContent="space-between">
        <Grid item>
          <TitlePageWithIcon
            title={t("common.newBooks")}
            icon={<NewReleasesIcon color="inherit" />}
          />
        </Grid>
        <Grid item xs={3}>
          <FilterWithSelect />
        </Grid>
      </Grid>
      <HomeTable />
    </React.Fragment>
  );
});

export default NewBooks;
