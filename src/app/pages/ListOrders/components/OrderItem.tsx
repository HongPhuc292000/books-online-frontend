import { Box, CardMedia, Grid, Typography, useTheme } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import ProductPrice from "app/components/Label/ProductPrice";
import StatusLabel from "app/components/Label/StatusLabel";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Order } from "types";

interface OrderItemProps {
  detailOrder: Order;
}

const OrderItem = ({ detailOrder }: OrderItemProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { _id, orderCode, status, products } = detailOrder;
  return (
    <Box
      sx={{
        "backgroundColor": theme.palette.common.white,
        "mb": 1,
        "padding": 2,
        ":hover": { cursor: "pointer" },
      }}
      onClick={() => {
        navigate(`/order/${_id}`);
      }}
    >
      <Grid
        container
        borderBottom={`1px dashed ${theme.palette.grey[500]}`}
        pb={2}
        justifyContent={detailOrder.checkout ? "space-between" : "left"}
      >
        <Box display="flex">
          <Typography mr={1}>
            {t("order.orderCode", { orderCode: orderCode })}
          </Typography>
          <StatusLabel status={status} />
        </Box>
        {detailOrder?.checkout ? (
          <Typography
            alignSelf="center"
            display="flex"
            alignItems="center"
            color={theme.palette.success.main}
          >
            <VerifiedIcon sx={{ marginRight: 1 }} />
            {t("order.checkedOut")}
          </Typography>
        ) : null}
      </Grid>
      <Grid container>
        {products.map((product) => (
          <Grid item xs={6} key={product.productId} mt={1} mb={1}>
            <Grid container spacing={1}>
              <Grid item xs={2}>
                <CardMedia component="img" src={product.imageUrl} />
              </Grid>
              <Grid item>
                <Typography variant="caption">{product.bookCode}</Typography>
                <Typography variant="body2">{product.name}</Typography>
                <ProductPrice
                  defaultPrice={product.defaultPrice}
                  reducedPrice={product.reducedPrice}
                />
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OrderItem;
