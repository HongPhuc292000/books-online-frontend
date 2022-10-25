import { Grid, useTheme } from "@mui/material";
import TitlePageWithIcon from "app/components/Label/LabelWithIcon";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { useTranslation } from "react-i18next";
import React, { memo } from "react";
import { ItemInfo, ListContentWrap } from "app/components/ListContent/HomeItem";
import { DefaultEllipsisText } from "app/components/EllipsisText";

const ReadingBooks = memo(() => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <React.Fragment>
      <Grid container sx={{ height: theme.spacing(5), mb: 2 }}>
        <TitlePageWithIcon
          title={t("common.readingBooks")}
          icon={<AutoStoriesIcon color="inherit" />}
        />
      </Grid>
      <ListContentWrap>
        {["hmm", "haiz", "naniiiiiiiiiiiiiiiiiiiiiidấdada"].map((item) => {
          return (
            <Grid container>
              <ItemInfo item xs={7} container alignItems="center">
                <DefaultEllipsisText title={item} />
              </ItemInfo>
              <ItemInfo item xs={5} container alignItems="center">
                <DefaultEllipsisText title={item} />
              </ItemInfo>
            </Grid>
          );
        })}
      </ListContentWrap>
    </React.Fragment>
  );
});

export default ReadingBooks;
