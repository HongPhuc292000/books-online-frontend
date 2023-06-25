import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import {
  Box,
  Button,
  Grid,
  Radio,
  Slider,
  TextField,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "app/hooks";
import moment from "moment";
import { memo, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Discount } from "types";
import { DiscountTypeEnum } from "types/enums";
import { formatVND } from "utils";
import { cartActions, initialState } from "../slice";
import { selectOrder } from "../slice/selector";
import _ from "lodash";

const DiscountCodeContainer = styled(Box)(({ theme }) => ({
  maxHeight: "60vh",
  overflowY: "auto",
}));

interface DiscountCodeProps {
  codeDetail: Discount;
  handleToggleCodeTemp: (discount?: Discount) => void;
  selectedCodeTemp?: Discount;
}

const DiscountCode = memo(
  ({
    codeDetail,
    handleToggleCodeTemp,
    selectedCodeTemp,
  }: DiscountCodeProps) => {
    const { code, description, type, value, exp, used, amount } = codeDetail;
    const theme = useTheme();
    const { t } = useTranslation();

    const controlProps = () => ({
      checked: selectedCodeTemp?.code === code,
      onClick: () => {
        if (selectedCodeTemp?.code === code) {
          handleToggleCodeTemp(undefined);
        } else {
          handleToggleCodeTemp(codeDetail);
        }
      },
      value: code,
      name: "coupon-radio-box",
      inputProps: { "aria-label": code },
    });

    return (
      <Grid container alignItems="center" mb={1}>
        <Grid item>
          <Box
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.common.white,
              fontSize: "68px",
              display: "flex",
              marginRight: 2,
            }}
          >
            <MonetizationOnIcon fontSize="inherit" color="inherit" />
          </Box>
        </Grid>
        <Grid item flex={1}>
          <Typography variant="body2">{`${code} - ${description}`}</Typography>
          <Typography variant="body2">
            {t("order.saleForOrder", {
              orderDiscountPrice:
                type === DiscountTypeEnum.CASH
                  ? `${formatVND(value)}`
                  : `${value}%`,
            })}
          </Typography>
          {used ? (
            <Slider
              size="small"
              value={parseInt(((used / amount) * 100).toFixed(0))}
            />
          ) : null}
          <Grid container>
            {used ? (
              <Typography variant="caption" mr={0.5}>
                {t("order.usedCoupon", {
                  used: parseInt(((used / amount) * 100).toFixed(0)) + "%",
                })}
              </Typography>
            ) : null}

            <Typography variant="caption">
              {t("discount.exp")} {moment(exp).format("h:mm:ss A - DD/MM/YYYY")}
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Radio {...controlProps()} />
        </Grid>
      </Grid>
    );
  }
);

interface ApplyCodeDialogProps {
  handleCloseDialog: () => void;
}

const ApplyCodeDialog = memo(({ handleCloseDialog }: ApplyCodeDialogProps) => {
  const { t } = useTranslation();
  const { listCodesForOrder, filterCode, orderForm } =
    useAppSelector(selectOrder);
  const dispatch = useAppDispatch();

  const [searchKey, setSearchKey] = useState<string>("");
  const [selectedCodeTemp, setSelectedCodeTemp] = useState<
    Discount | undefined
  >(undefined);

  const handleToggleCodeTemp = useCallback((discount?: Discount) => {
    setSelectedCodeTemp(discount);
  }, []);

  const handleToggleShowData = () => {
    if (filterCode.all) {
      dispatch(cartActions.setFilterCode({ ...filterCode, all: false }));
    } else {
      dispatch(cartActions.setFilterCode({ ...filterCode, all: true }));
    }
  };

  const handleSaveSelectedDiscount = () => {
    if (selectedCodeTemp && orderForm) {
      let totalOrderPrices = orderForm.orderPrices;
      let totalPrices = orderForm.totalPrices;
      let discountPrice = selectedCodeTemp.value;
      if (selectedCodeTemp.type === DiscountTypeEnum.CASH) {
        if (totalOrderPrices > discountPrice) {
          totalPrices = totalOrderPrices - discountPrice;
        } else {
          totalPrices = 0;
          discountPrice = totalOrderPrices;
        }
      } else {
        discountPrice = (totalOrderPrices * discountPrice) / 100;
        totalPrices = totalOrderPrices - discountPrice;
      }
      dispatch(
        cartActions.setOrderForm({
          ...orderForm,
          orderDiscountId: selectedCodeTemp._id,
          orderDiscountPrices: discountPrice,
          totalPrices,
        })
      );
      dispatch(cartActions.setSelectedDiscountCode(selectedCodeTemp));
      handleCloseDialog();
    } else if (orderForm) {
      const totalPrices = orderForm.orderPrices;
      const newOrderForm = _.omit(orderForm, [
        "orderDiscountId",
        "orderDiscountPrices",
      ]);
      dispatch(
        cartActions.setOrderForm({
          ...newOrderForm,
          totalPrices,
        })
      );
      dispatch(cartActions.setSelectedDiscountCode(undefined));
      handleCloseDialog();
    }
  };

  useEffect(() => {
    dispatch(cartActions.getAllDiscounts(filterCode));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterCode]);

  useEffect(() => {
    if (listCodesForOrder?.data && orderForm && orderForm?.orderDiscountId) {
      setSelectedCodeTemp(
        listCodesForOrder.data.find(
          (item) => item._id === orderForm.orderDiscountId
        )
      );
    }
    return () => {
      dispatch(cartActions.setFilterCode(initialState.filterCode));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Grid container spacing={1} alignItems="center" mb={2}>
        <Grid item>{t("order.inputBookCode")}</Grid>
        <Grid item flex={1}>
          <TextField
            fullWidth
            size="small"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="info"
            onClick={() => {
              dispatch(cartActions.setFilterCode({ ...filterCode, searchKey }));
            }}
          >
            {t("common.apply")}
          </Button>
        </Grid>
      </Grid>
      <DiscountCodeContainer>
        {listCodesForOrder?.data?.length
          ? listCodesForOrder.data.map((code) => (
              <DiscountCode
                key={code._id}
                handleToggleCodeTemp={handleToggleCodeTemp}
                selectedCodeTemp={selectedCodeTemp}
                codeDetail={code}
              />
            ))
          : null}
      </DiscountCodeContainer>
      <Box textAlign="center" mt={2}>
        <Button variant="outlined" onClick={handleToggleShowData}>
          {filterCode.all ? t("common.hideaway") : t("common.showmore")}
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={handleSaveSelectedDiscount}
          sx={{ mr: 1, ml: 1 }}
        >
          {t("common.accept")}
        </Button>
        <Button variant="contained" color="error" onClick={handleCloseDialog}>
          {t("common.back")}
        </Button>
      </Box>
    </Box>
  );
});

export default ApplyCodeDialog;
