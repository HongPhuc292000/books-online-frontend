import DiscountIcon from "@mui/icons-material/Discount";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  Box,
  Button,
  CardMedia,
  Grid,
  TextField,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "app/hooks";
import React, { memo, useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CartHeader from "./components/CartHeader";
import ProductInCart from "./components/ProductIncart";
import SubmitForm from "./components/SubmitForm";
import { cartActions } from "./slice";
import { selectOrder } from "./slice/selector";
import { DiscountTypeEnum, PaymentTypeEnum } from "types/enums";
import emptyCart from "assets/images/empty-cart.png";
import { useNavigate } from "react-router-dom";

const CartNote = styled(Typography)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  padding: theme.spacing(1, 2),
  border: `1px solid ${theme.palette.primary.light}`,
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(1),
}));

const VtrWey = styled(Box)(({ theme }) => ({
  height: "3px",
  width: "100%",
  backgroundPositionX: "-30px",
  backgroundSize: "116px 3px",
  backgroundImage: `repeating-linear-gradient(45deg,${theme.palette.info.light},${theme.palette.info.light} 33px,transparent 0,transparent 41px,${theme.palette.error.light} 0,${theme.palette.error.light} 74px,transparent 0,transparent 82px)`,
}));

const ShipAdressContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const CartPage = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { detailCart, orderForm, selectedDiscountCode } =
    useAppSelector(selectOrder);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [addressErr, setAdressErr] = useState<boolean>(false);

  const handleSetDefaultOrder = () => {
    if (detailCart) {
      const productsIncart = detailCart.products;
      let totalPrices = 0;
      let orderPrices = 0;
      let discountPrices = 0;
      productsIncart.forEach((product) => {
        if (product?.reducedPrice) {
          totalPrices += product.amount * product.reducedPrice;
          orderPrices += product.amount * product.reducedPrice;
        } else {
          totalPrices += product.amount * product.defaultPrice;
          orderPrices += product.amount * product.defaultPrice;
        }
      });
      if (selectedDiscountCode) {
        if (selectedDiscountCode.type === DiscountTypeEnum.PERCENT) {
          discountPrices = (orderPrices * selectedDiscountCode.value) / 100;
          totalPrices = orderPrices - discountPrices;
        } else {
          if (orderPrices > selectedDiscountCode.value) {
            discountPrices = selectedDiscountCode.value;
            totalPrices = orderPrices - discountPrices;
          } else {
            discountPrices = orderPrices;
            totalPrices = 0;
          }
        }
      }

      dispatch(
        cartActions.setOrderForm({
          ...orderForm,
          customerId: detailCart.customerId,
          customerPhoneNumber: detailCart.customerPhoneNumber,
          customerName: detailCart.customerName,
          paymentType: PaymentTypeEnum.CASH,
          products: detailCart.products,
          orderPrices: orderPrices,
          totalPrices: totalPrices,
          orderDiscountPrices: discountPrices,
          status: detailCart.status,
        })
      );
    }
  };

  const handleSetAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.value) {
      setAdressErr(false);
    } else {
      setAdressErr(true);
    }
    if (orderForm) {
      dispatch(
        cartActions.setOrderForm({
          ...orderForm,
          customerAddress: e.target.value,
        })
      );
    }
  };

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      dispatch(cartActions.setSelectedDiscountCode(undefined));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleSetDefaultOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailCart]);

  return (
    <Box>
      {detailCart ? (
        <React.Fragment>
          <CartNote variant="body2">
            <DiscountIcon
              color="primary"
              fontSize="small"
              sx={{ marginRight: 1 }}
            />
            {t("order.cartNote")}
          </CartNote>
          <Box
            sx={{
              backgroundColor: theme.palette.common.white,
              marginBottom: 1,
            }}
          >
            <VtrWey />
            <ShipAdressContainer>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: theme.palette.primary.main,
                  marginBottom: 2,
                }}
              >
                <LocationOnIcon />
                {t("order.inforOrder")}
              </Typography>
              <Grid container spacing={4}>
                <Grid item>
                  <Typography variant="body2" fontWeight={600}>
                    {detailCart.customerName}
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {detailCart.customerPhoneNumber}
                  </Typography>
                </Grid>
                <Grid item flex={1}>
                  <TextField
                    fullWidth
                    id="outlined-ship-adress"
                    variant="outlined"
                    size="small"
                    label={t("order.addressReceived")}
                    multiline
                    value={orderForm?.customerAddress || ""}
                    onChange={handleSetAddress}
                    error={addressErr}
                    helperText={
                      addressErr ? t("order.addressReceivedRequired") : ""
                    }
                  />
                </Grid>
              </Grid>
            </ShipAdressContainer>
          </Box>
          <CartHeader />
          <Box sx={{ backgroundColor: theme.palette.common.white }}>
            {orderForm
              ? orderForm.products.map((product) => (
                  <ProductInCart key={product.productId} detail={product} />
                ))
              : null}
          </Box>
          <SubmitForm setAddressErr={setAdressErr} />
        </React.Fragment>
      ) : (
        <Box width="50%" margin="auto" textAlign="center">
          <CardMedia
            width="100%"
            component="img"
            src={emptyCart}
            alt="No Products"
          />
          <Button
            variant="contained"
            onClick={() => {
              navigate("/");
            }}
          >
            {t("order.letsBuy")}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default memo(CartPage);
