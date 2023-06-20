import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { withLoading } from "app/components/HOC/withLoadingPage";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { memo, useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { detailOrderAction } from "./slice";
import { useNavigate, useParams } from "react-router-dom";
import { useLoading } from "app/hooks/useLoading";
import { NavigateBackLabel } from "app/components/Label";
import { formatVND } from "utils";
import { selectDetailOrder } from "./slice/selector";
import ProductBought from "app/components/ProductBought";
import useToastMessage from "app/hooks/useToastMessage";
import OrderSteps from "app/components/OrderSteps/OrderSteps";
import { OrderStatusesEnum } from "types/enums";
import BaseActionDialog from "app/components/ActionDialog/BaseActionDialog";

interface CancelOrderContentProps {
  content: string;
  onAcceptCancel: Function;
  onCancel: Function;
}

const CancelOrderContent = ({
  content,
  onAcceptCancel,
  onCancel,
}: CancelOrderContentProps) => {
  const { t } = useTranslation();
  return (
    <Box>
      <Typography>{content}</Typography>
      <Grid container justifyContent="flex-end" mt={2}>
        <Button
          variant="contained"
          color="success"
          sx={{ mr: 2 }}
          onClick={() => onAcceptCancel()}
        >
          {t("common.accept")}
        </Button>
        <Button variant="contained" color="error" onClick={() => onCancel()}>
          {t("common.cancel")}
        </Button>
      </Grid>
    </Box>
  );
};

interface DetailOrderProps {
  setLoading: Function;
}

const DetailOrder = memo(({ setLoading }: DetailOrderProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { detailOrder } = useAppSelector(selectDetailOrder);
  const navigate = useNavigate();
  const { id } = useParams();
  const { showLoading, hideLoading } = useLoading({ setLoading });
  const { showErrorSnackbar, showSuccessSnackbar } = useToastMessage();
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const handleGetDetailOrder = () => {
    if (id) {
      showLoading();
      dispatch(
        detailOrderAction.getDetailOrder(id, (err) => {
          if (err) {
            showErrorSnackbar(t(`error.${err}`));
          }
          hideLoading();
        })
      );
    }
  };

  const handleCancelOrder = () => {
    if (id) {
      showLoading();
      dispatch(
        detailOrderAction.cancelOrder(id, (err) => {
          if (err) {
            showErrorSnackbar(t(`error.${err}`));
          } else {
            showSuccessSnackbar(t("order.cancelOrderSuccess"));
            handleGetDetailOrder();
          }
          hideLoading();
          setShowDialog(false);
        })
      );
    }
  };

  const handleCloseDialog = useCallback(() => {
    setShowDialog(false);
  }, []);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleGetDetailOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Box p={2} sx={{ backgroundColor: theme.palette.common.white }}>
      <Grid container justifyContent="space-between" paddingBottom={2}>
        <NavigateBackLabel
          onClick={() => {
            navigate(-1);
          }}
        >
          <ArrowBackIosIcon fontSize="inherit" />
          {t("common.back")}
        </NavigateBackLabel>
        <Typography variant="body2">
          {t("order.orderCode", { orderCode: detailOrder?.orderCode })}
        </Typography>
      </Grid>
      {detailOrder ? <OrderSteps detailOrder={detailOrder} /> : null}
      <Box>
        <Typography fontWeight={600} mb={2}>
          {t("common.product")}
        </Typography>
        <Grid container spacing={2}>
          {detailOrder?.products ? (
            <>
              {detailOrder?.products.map((product) => (
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
            {formatVND(detailOrder?.orderPrices)}
          </Grid>
        </Grid>
        {detailOrder?.orderDiscountPrices ? (
          <Grid container textAlign="right" paddingTop={1} paddingBottom={1}>
            <Grid item flex={1}>
              {t("order.beSold")}
            </Grid>
            <Grid item xs={3}>
              {formatVND(detailOrder?.orderDiscountPrices)}
            </Grid>
          </Grid>
        ) : null}
        <Grid container textAlign="right" paddingTop={1} paddingBottom={1}>
          <Grid item flex={1}>
            {t("order.toCash")}
          </Grid>
          <Grid item xs={3} color={theme.palette.error.main} fontSize={28}>
            {formatVND(detailOrder?.totalPrices)}
          </Grid>
        </Grid>
        {detailOrder?.status === OrderStatusesEnum.ORDERED ? (
          <Grid
            container
            justifyContent="right"
            paddingTop={1}
            paddingBottom={1}
          >
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setShowDialog(true);
              }}
            >
              {t("common.cancel")}
            </Button>
          </Grid>
        ) : null}
      </Box>
      <BaseActionDialog
        title={t("common.acceptCancel")}
        isOpen={showDialog}
        dialogContent={
          <CancelOrderContent
            content={t("order.acceptCancelOrder")}
            onAcceptCancel={handleCancelOrder}
            onCancel={handleCloseDialog}
          />
        }
        onCancel={handleCloseDialog}
        maxWidth="xs"
      />
    </Box>
  );
});

export default withLoading(DetailOrder);
