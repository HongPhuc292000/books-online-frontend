import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
  useTheme,
} from "@mui/material";
import DiscountIcon from "@mui/icons-material/Discount";
import { useState, useCallback, memo } from "react";
import { useTranslation } from "react-i18next";
import { formatVND } from "utils";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectOrder } from "../slice/selector";
import ApplyCodeDialog from "./ApplyCodeDialog";
import BaseActionDialog from "app/components/ActionDialog/BaseActionDialog";
import { OrderStatusesEnum, PaymentTypeEnum } from "types/enums";
import { cartActions } from "../slice";
import { withLoading } from "app/components/HOC/withLoadingPage";
import { useLoading } from "app/hooks/useLoading";
import useToastMessage from "app/hooks/useToastMessage";
import { selectAuth } from "app/components/PageHeader/slice/selector";

interface SubmitFormProps {
  setLoading: Function;
  setAddressErr: Function;
}

const SubmitForm = memo(({ setLoading, setAddressErr }: SubmitFormProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { orderForm, detailCart } = useAppSelector(selectOrder);
  const { user } = useAppSelector(selectAuth);
  const { showLoading, hideLoading } = useLoading({ setLoading });
  const { showErrorSnackbar, showSuccessSnackbar } = useToastMessage();

  const [showDialog, setShowDialog] = useState<boolean>(false);

  const handleChangeCheckoutType = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checkoutType = (event.target as HTMLInputElement)
      .value as PaymentTypeEnum;
    if (orderForm) {
      dispatch(
        cartActions.setOrderForm({
          ...orderForm,
          paymentType: checkoutType,
          checkout: false,
        })
      );
    }
  };

  const handleCloseDialog = useCallback(() => {
    setShowDialog(false);
  }, []);

  const handleFetchDetailCart = () => {
    if (user) {
      showLoading();
      dispatch(
        cartActions.getCartDetail(user._id, (error) => {
          if (error) {
            hideLoading();
            showErrorSnackbar(t(`error.${error}`));
          } else {
            hideLoading();
          }
        })
      );
    }
  };

  const handleSubmitOrder = () => {
    if (!orderForm?.customerAddress) {
      setAddressErr(true);
    } else {
      if (detailCart && orderForm) {
        showLoading();
        if (orderForm.paymentType === PaymentTypeEnum.CASH) {
          dispatch(
            cartActions.checkoutOfflined(
              {
                id: detailCart._id,
                formValue: {
                  ...orderForm,
                  status: OrderStatusesEnum.ORDERED,
                },
              },
              (err) => {
                if (err) {
                  hideLoading();
                  showErrorSnackbar(t(`error.${err}`));
                } else {
                  dispatch(cartActions.setOrderForm(undefined));
                  handleFetchDetailCart();
                  hideLoading();
                  showSuccessSnackbar(t("order.orderSuccess"));
                }
              }
            )
          );
        } else {
          dispatch(
            cartActions.checkoutOnline(
              {
                id: detailCart._id,
                formValue: { ...orderForm, status: OrderStatusesEnum.INCART },
              },
              (err) => {
                if (err) {
                  hideLoading();
                  showErrorSnackbar(t(`error.${err}`));
                } else {
                }
              }
            )
          );
        }
      }
    }
  };

  return (
    <Box mt={1} sx={{ backgroundColor: theme.palette.common.white }}>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        padding={2}
        borderBottom={`1px dashed ${theme.palette.grey[300]}`}
      >
        <Grid item sx={{ fontSize: "14px", display: "flex" }}>
          <FormControl>
            <FormLabel>{t("order.checkoutType")}</FormLabel>
            <RadioGroup
              value={orderForm?.paymentType}
              defaultValue={PaymentTypeEnum.CASH}
              name="radio-checkout-type-group"
              onChange={handleChangeCheckoutType}
              row
            >
              <FormControlLabel
                value={PaymentTypeEnum.CASH}
                control={<Radio />}
                label={t("order.cod")}
              />
              <FormControlLabel
                value={PaymentTypeEnum.ONLINE}
                control={<Radio />}
                label={t("order.checkoutNow")}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item>
          <Grid container alignItems="center">
            <Grid item>
              <Grid container mr={2}>
                <DiscountIcon color="primary" />
                <Typography ml={1} variant="body2">
                  {t(
                    `order.${
                      orderForm?.orderDiscountId
                        ? "selectedCoupon"
                        : "notSelectedCoupon"
                    }`
                  )}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Button
                onClick={() => {
                  setShowDialog(true);
                }}
              >
                {t("order.selectOrInputCoupon")}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container padding={2} justifyContent="right" alignItems="center">
        <Box mr={2}>
          <Grid container justifyContent="right">
            <Typography>{`${t("order.totalPay")}:`}</Typography>
            <Typography variant="h4" ml={1} color="primary">
              {formatVND(orderForm?.totalPrices)}
            </Typography>
          </Grid>
          {orderForm?.orderDiscountPrices ? (
            <Grid container justifyContent="right">
              <Typography variant="body2">{t("detailBook.saving")}</Typography>
              <Typography variant="body2" ml={1} color="primary">
                {formatVND(
                  orderForm.orderPrices > orderForm.orderDiscountPrices
                    ? orderForm.orderDiscountPrices
                    : orderForm.orderPrices
                )}
              </Typography>
            </Grid>
          ) : null}
        </Box>
        <Box>
          <Button
            variant="contained"
            color="success"
            type="submit"
            sx={{ mr: 1 }}
            onClick={handleSubmitOrder}
          >
            {t("order.checkout")}
          </Button>
        </Box>
      </Grid>
      <BaseActionDialog
        title={t("order.selectCoupon")}
        isOpen={showDialog}
        dialogContent={
          <ApplyCodeDialog handleCloseDialog={handleCloseDialog} />
        }
        onCancel={handleCloseDialog}
      />
    </Box>
  );
});

export default withLoading(SubmitForm);
