import { Grid } from "@mui/material";
import { TitlePageWithIcon } from "app/components/Label";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import { FilterWithSelect } from "app/components/SelectOptionBox";
import { useTranslation } from "react-i18next";
import { memo } from "react";

const NewBooks = memo(() => {
  const { t } = useTranslation();
  return (
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
  );
});

export default NewBooks;
