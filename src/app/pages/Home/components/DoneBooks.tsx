import { Grid } from "@mui/material";
import { TitlePageWithIcon } from "app/components/Label";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import { useTranslation } from "react-i18next";
import { memo } from "react";

const DoneBooks = memo(() => {
  const { t } = useTranslation();
  return (
    <TitlePageWithIcon
      title={t("common.doneBooks")}
      icon={<BeenhereIcon color="inherit" />}
    />
  );
});

export default DoneBooks;
