import { Grid } from "@mui/material";
import { TitlePageWithIcon } from "app/components/Label";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { useTranslation } from "react-i18next";
import { memo } from "react";

const ReadingBooks = memo(() => {
  const { t } = useTranslation();
  return (
    <TitlePageWithIcon
      title={t("common.readingBooks")}
      icon={<AutoStoriesIcon color="inherit" />}
    />
  );
});

export default ReadingBooks;
