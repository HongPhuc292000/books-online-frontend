import { Box, Grid, Typography, useTheme } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { memo } from "react";
import { useTranslation } from "react-i18next";

interface ProductStatusProps {
  amount: number;
}

const ProductStatus = memo(({ amount }: ProductStatusProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "base-line",
        fontSize: "16px",
      }}
    >
      {amount > 0 ? (
        <>
          <CheckIcon fontSize="inherit" color="success" />
          <Typography
            variant="caption"
            style={{ color: theme.palette.success.main }}
          >
            {t("common.inStock")}
          </Typography>
        </>
      ) : (
        <>
          <LocalPhoneIcon fontSize="inherit" color="info" />
          <Typography
            variant="caption"
            style={{ color: theme.palette.info.main }}
          >
            {t("common.outStock")}
          </Typography>
        </>
      )}
    </Box>
  );
});

export default ProductStatus;
