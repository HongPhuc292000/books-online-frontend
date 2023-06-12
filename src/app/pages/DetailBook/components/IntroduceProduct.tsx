import { Box, Typography, useTheme } from "@mui/material";
import { selectDetailBook } from "../slice/selector";
import { useAppSelector } from "app/hooks";
import { DetailBookTitle } from "./DetailBookMainContent";
import { useTranslation } from "react-i18next";

const IntroduceProduct = () => {
  const { detailBook } = useAppSelector(selectDetailBook);
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <Box>
      <DetailBookTitle marginBottom={6}>
        {t("detailBook.introduceProduct")}
      </DetailBookTitle>
      <DetailBookTitle
        sx={{
          textAlign: "center",
          color: theme.palette.error.main,
          fontWeight: 600,
          mb: 6,
        }}
      >
        {detailBook?.name}
      </DetailBookTitle>
      <Typography
        variant="body2"
        marginBottom={2}
        dangerouslySetInnerHTML={{
          __html: detailBook?.description || `${t("detailBook.noDescription")}`,
        }}
      />
    </Box>
  );
};

export default IntroduceProduct;
