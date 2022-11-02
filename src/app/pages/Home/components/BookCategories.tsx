import TitlePageWithIcon from "app/components/Label/LabelWithIcon";
import ClassIcon from "@mui/icons-material/Class";
import { useTranslation } from "react-i18next";
import { memo } from "react";
import { Grid, useTheme } from "@mui/material";

const BookCategories = memo(() => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <Grid sx={{ [theme.breakpoints.down("lg")]: { display: "none" } }}>
      <TitlePageWithIcon
        title={t("common.bookCategories")}
        icon={<ClassIcon color="inherit" />}
      />
    </Grid>
  );
});

export default BookCategories;
