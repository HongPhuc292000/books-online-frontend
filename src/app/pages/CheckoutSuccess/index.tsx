import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { withLoading } from "app/components/HOC/withLoadingPage";
import { NavigateBackLabel } from "app/components/Label";
import OrderSteps from "app/components/OrderSteps/OrderSteps";
import ProductBought from "app/components/ProductBought";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useLoading } from "app/hooks/useLoading";
import querystring from "query-string";
import { memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { formatVND } from "utils";
import { checkoutSuccessActions } from "./slice";
import { selectCheckoutSuccess } from "./slice/selector";

interface CheckoutSuccessProps {
  setLoading: Function;
}

const CheckoutSuccess = memo(({ setLoading }: CheckoutSuccessProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { checkoutSuccessDetail } = useAppSelector(selectCheckoutSuccess);
  const { showLoading, hideLoading } = useLoading({ setLoading });
  const searchLocation = location.search;
  const params = querystring.parse(searchLocation, {
    arrayFormat: "bracket",
  });

  useEffect(() => {
    if (params?.vnp_TxnRef) {
      showLoading();
      const id = params?.vnp_TxnRef as string;
      dispatch(
        checkoutSuccessActions.updateCheckout(id, () => {
          hideLoading();
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box p={2} sx={{ backgroundColor: theme.palette.common.white }}>
      <Grid container justifyContent="space-between" paddingBottom={2}>
        <NavigateBackLabel
          onClick={() => {
            navigate("/");
          }}
        >
          <ArrowBackIosIcon fontSize="inherit" />
          {t("common.backToHome")}
        </NavigateBackLabel>
        <Typography variant="body2">
          {t("order.orderCode", { orderCode: params?.vnp_TxnRef })}
        </Typography>
      </Grid>
      {checkoutSuccessDetail ? (
        <OrderSteps detailOrder={checkoutSuccessDetail} />
      ) : null}
      <Box>
        <Typography fontWeight={600} mb={2}>
          {t("common.product")}
        </Typography>
        <Grid container spacing={2}>
          {checkoutSuccessDetail?.products ? (
            <>
              {checkoutSuccessDetail?.products.map((product) => (
                <Grid item xs={6} key={product.productId}>
                  <ProductBought detailProduct={product} />
                </Grid>
              ))}
            </>
          ) : null}
        </Grid>
      </Box>
      <Box
        sx={{
          borderTop: `1px solid ${theme.palette.grey[500]}`,
          marginTop: 2,
          paddingTop: 2,
        }}
      >
        <Grid container textAlign="right" paddingTop={1} paddingBottom={1}>
          <Grid item flex={1}>
            {t("order.orderPrices")}
          </Grid>
          <Grid item xs={3}>
            {formatVND(checkoutSuccessDetail?.orderPrices)}
          </Grid>
        </Grid>
        {checkoutSuccessDetail?.orderDiscountPrices ? (
          <Grid container textAlign="right" paddingTop={1} paddingBottom={1}>
            <Grid item flex={1}>
              {t("order.beSold")}
            </Grid>
            <Grid item xs={3}>
              {formatVND(checkoutSuccessDetail?.orderDiscountPrices)}
            </Grid>
          </Grid>
        ) : null}
        <Grid container textAlign="right" paddingTop={1} paddingBottom={1}>
          <Grid item flex={1}>
            {t("order.toCash")}
          </Grid>
          <Grid item xs={3} color={theme.palette.error.main} fontSize={28}>
            {formatVND(checkoutSuccessDetail?.totalPrices)}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
});

export default withLoading(CheckoutSuccess);
