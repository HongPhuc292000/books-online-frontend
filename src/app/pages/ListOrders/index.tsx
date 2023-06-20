import {
  Box,
  CardMedia,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Typography,
  useTheme,
} from "@mui/material";
import { withLoading } from "app/components/HOC/withLoadingPage";
import { selectAuth } from "app/components/PageHeader/slice/selector";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useLoading } from "app/hooks/useLoading";
import useToastMessage from "app/hooks/useToastMessage";
import noDataImg from "assets/images/no-data.png";
import { memo, useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { OrderFilter } from "types";
import { OrderStatusesEnum } from "types/enums";
import OrderItem from "./components/OrderItem";
import { listOrdersActions } from "./slice";
import { selectListOrders } from "./slice/selector";

const listStatus = [
  OrderStatusesEnum.ORDERED,
  OrderStatusesEnum.CANCEL,
  OrderStatusesEnum.DELIVERING,
  OrderStatusesEnum.DONE,
  OrderStatusesEnum.REPAY,
];

interface ListOrdersProps {
  setLoading: Function;
}

const ListOrders = memo(({ setLoading }: ListOrdersProps) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);
  const { listOrders } = useAppSelector(selectListOrders);
  const { showErrorSnackbar } = useToastMessage();
  const { t } = useTranslation();
  const theme = useTheme();
  const { showLoading, hideLoading } = useLoading({ setLoading });
  const [filter, setFilter] = useState<OrderFilter>({ page: 0, size: 10 });

  const handleFetchData = (params: OrderFilter) => {
    if (user?._id) {
      showLoading();
      dispatch(
        listOrdersActions.getAllOrders(
          {
            ...params,
            customerId: user._id,
          },
          (err) => {
            if (err) {
              showErrorSnackbar(t(`order.${err}`));
            }
            hideLoading();
          }
        )
      );
    }
  };

  const handleChangeStatus = (event: SelectChangeEvent) => {
    if (event.target.value === "ALL") {
      setFilter({ ...filter, status: undefined });
    } else {
      setFilter({ ...filter, status: event.target.value as OrderStatusesEnum });
    }
  };

  const handleFetchDataForPage = (value: number) => {
    setFilter({ ...filter, page: value - 1 });
  };

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleFetchData(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, filter]);

  return (
    <Box>
      <Grid
        container
        sx={{
          padding: "8px 16px",
          backgroundColor: theme.palette.common.white,
          mb: 1,
        }}
      >
        <Grid item flex={1}>
          <Typography fontSize={24}>{t("order.listOrders")}</Typography>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth size="small">
            <InputLabel id="simple-select-status">
              {t("order.status")}
            </InputLabel>
            <Select
              labelId="simple-select-status"
              id="simple-select-status"
              value={filter.status || "ALL"}
              label={t("order.status")}
              onChange={handleChangeStatus}
            >
              <MenuItem value="ALL">{t("common.all")}</MenuItem>
              {listStatus.map((status) => (
                <MenuItem key={status} value={status}>
                  {t(`enums.${status}`)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {listOrders?.data
        ? listOrders?.data.map((order) => (
            <OrderItem key={order._id} detailOrder={order} />
          ))
        : null}

      {listOrders?.total && listOrders?.size ? (
        <Grid container justifyContent="right" mt={2}>
          <Pagination
            count={Math.ceil(listOrders?.total / listOrders?.size)}
            color="primary"
            onChange={(e, value) => {
              handleFetchDataForPage(value);
            }}
            page={filter?.page ? filter?.page + 1 : 1}
          />
        </Grid>
      ) : null}

      {listOrders?.data && listOrders?.data.length === 0 ? (
        <Box
          sx={{
            padding: 2,
            display: "flex",
            justifyContent: "center",
            backgroundColor: theme.palette.common.white,
          }}
        >
          <Box width="240px">
            <CardMedia component="img" src={noDataImg} />
            <Typography>{t("order.noDataFound")}</Typography>
          </Box>
        </Box>
      ) : null}
    </Box>
  );
});

export default withLoading(ListOrders);
