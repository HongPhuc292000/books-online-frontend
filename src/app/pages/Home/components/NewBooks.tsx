import { Grid, useTheme } from "@mui/material";
import TitlePageWithIcon from "app/components/Label/LabelWithIcon";
import StatusLabel from "app/components/Label/StatusLabel";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import { FilterWithSelect } from "app/components/SelectOptionBox";
import { useTranslation } from "react-i18next";
import React, { memo } from "react";
import { ItemInfo, ListContentWrap } from "app/components/ListContent/HomeItem";
import { DefaultEllipsisText } from "app/components/EllipsisText";

const NewBooks = memo(() => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <React.Fragment>
      <Grid container justifyContent="space-between" alignItems="center" mb={2}>
        <Grid item>
          <TitlePageWithIcon
            title={t("common.newBooks")}
            icon={<NewReleasesIcon color="inherit" />}
          />
        </Grid>
        <Grid item>
          <FilterWithSelect />
        </Grid>
      </Grid>
      <ListContentWrap>
        {["hmmmmmmmmmmmmmmmmmmmmmmmmmmmmm adash adasd", "haiz", "nani"].map(
          (item) => {
            return (
              <Grid container>
                <ItemInfo item xs={8} md={6} container>
                  <Grid item xs={10} md={10} container alignItems="center">
                    <DefaultEllipsisText title={item} />
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    md={2}
                    sx={{
                      overflow: "hidden",
                    }}
                  >
                    <StatusLabel status="HOT" />
                  </Grid>
                </ItemInfo>
                <ItemInfo
                  item
                  md={3}
                  lg={2}
                  sx={{ [theme.breakpoints.down("md")]: { display: "none" } }}
                >
                  <DefaultEllipsisText title={item} />
                </ItemInfo>
                <ItemInfo item xs={4} md={3} lg={2}>
                  <DefaultEllipsisText title={item} />
                </ItemInfo>
                <ItemInfo
                  item
                  lg={2}
                  sx={{ [theme.breakpoints.down("lg")]: { display: "none" } }}
                >
                  <DefaultEllipsisText title={item} />
                </ItemInfo>
              </Grid>
            );
          }
        )}
      </ListContentWrap>
    </React.Fragment>
  );
});

export default NewBooks;
