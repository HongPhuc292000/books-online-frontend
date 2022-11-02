import React, { memo } from "react";
import { Grid } from "@mui/material";
import TitlePageWithIcon from "app/components/Label/LabelWithIcon";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { FilterWithSelect } from "app/components/SelectOptionBox";
import { useTranslation } from "react-i18next";
import { SimpleCardImage } from "app/components/CardImage";

const testArr = ["aa", "bb", "cc", "dd", "ee", "gg", "ff", "ii", "jj"];

const HotBooks = memo(() => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <Grid container justifyContent="space-between" alignItems="center" mb={2}>
        <Grid item>
          <TitlePageWithIcon
            title={t("common.hotBooks")}
            icon={<LocalFireDepartmentIcon color="inherit" />}
          />
        </Grid>
        <Grid item>
          <FilterWithSelect />
        </Grid>
      </Grid>
      <Grid container spacing={1.5}>
        {testArr.map((item) => {
          return (
            <Grid key={item} item xs={6} sm={3} md={2} lg={1.5}>
              <SimpleCardImage />
            </Grid>
          );
        })}
      </Grid>
    </React.Fragment>
  );
});

export default HotBooks;
