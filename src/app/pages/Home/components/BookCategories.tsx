import { TitlePageWithIcon } from "app/components/Label";
import ClassIcon from "@mui/icons-material/Class";
import { useTranslation } from "react-i18next";
import { memo } from "react";

const BookCategories = memo(() => {
  const { t } = useTranslation();
  return (
    <TitlePageWithIcon
      title={t("common.bookCategories")}
      icon={<ClassIcon color="inherit" />}
    />
  );
});

export default BookCategories;
