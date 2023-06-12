import { Box, Grid, Typography, styled, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

const CartHeaderTitle = styled(Typography)(({ theme }) => ({}));

const CartHeader = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box sx={{ backgroundColor: theme.palette.common.white }}>
      <Grid container height={48} alignItems="center" padding="0 16px">
        <Grid item xs={4}>
          <CartHeaderTitle variant="body2">
            {t("common.product")}
          </CartHeaderTitle>
        </Grid>
        <Grid item xs={2} textAlign="center">
          <CartHeaderTitle variant="body2">
            {t("common.unitPrice")}
          </CartHeaderTitle>
        </Grid>
        <Grid item xs={2} textAlign="center">
          <CartHeaderTitle variant="body2">
            {t("common.amount")}
          </CartHeaderTitle>
        </Grid>
        <Grid item xs={2} textAlign="center">
          <CartHeaderTitle variant="body2">
            {t("common.productPrice")}
          </CartHeaderTitle>
        </Grid>
        <Grid item xs={2} textAlign="center">
          <CartHeaderTitle variant="body2">
            {t("common.action")}
          </CartHeaderTitle>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartHeader;
