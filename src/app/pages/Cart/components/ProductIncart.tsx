import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import {
  CardMedia,
  Grid,
  IconButton,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import ChangeAmountProduct from "app/components/ChangeAmountProduct";
import { selectAuth } from "app/components/PageHeader/slice/selector";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { memo, useEffect, useState } from "react";
import { DetailBookByCode } from "types/Order";
import { UpdateAmountEnum } from "types/enums";
import { formatVND } from "utils";
import { cartActions } from "../slice";

const ContentLabel = styled("span")(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.grey[500],
}));

const ProductContainer = styled(Grid)(({ theme }) => ({
  textAlign: "center",
  alignSelf: "center",
}));

interface ProductIncartProps {
  detail: DetailBookByCode;
}

const ProductIncart = ({ detail }: ProductIncartProps) => {
  const theme = useTheme();
  const { user } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const [firstRender, setFirstRender] = useState<boolean>(true);
  const { imageUrl, name, bookCode, defaultPrice, reducedPrice, amount } =
    detail;

  const [productAmount, setProductAmount] = useState<number>(1);

  const handleUpdateProductAmount = (
    type: UpdateAmountEnum,
    value?: number
  ) => {
    if (type === UpdateAmountEnum.REDUCE) {
      setProductAmount((prev) => prev - 1);
    } else if (type === UpdateAmountEnum.INSERT) {
      if (value) {
        setProductAmount(value);
      } else {
        setProductAmount(1);
      }
    } else {
      setProductAmount((prev) => prev + 1);
    }
  };

  const handleDoAfterChange = () => {
    if (user && detail) {
      dispatch(
        cartActions.addProductToCart(
          {
            productId: detail.productId,
            customerId: user._id,
            isInsertAmount: true,
            bookCode: detail.bookCode,
            name: detail.name,
            amount: productAmount,
            defaultPrice: detail.defaultPrice,
            reducedPrice: detail.reducedPrice,
            imageUrl: detail.imageUrl,
          },
          () => {}
        )
      );
    }
  };

  const handleRemoveProduct = () => {
    if (user && detail) {
      dispatch(
        cartActions.removeProductInCart(
          { customerId: user._id, productId: detail.productId },
          () => {}
        )
      );
    }
  };

  useEffect(() => {
    if (detail.amount !== productAmount) {
      setProductAmount(detail.amount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detail]);

  useEffect(() => {
    if (!firstRender) {
      handleDoAfterChange();
    } else {
      setFirstRender(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productAmount]);

  return (
    <Grid
      container
      padding={2}
      sx={{
        borderBottom: `1px dashed ${theme.palette.grey[500]}`,
      }}
    >
      <ProductContainer item xs={4}>
        <Grid container textAlign="left">
          <Grid item xs={3}>
            <CardMedia
              component="img"
              sx={{ width: "100%" }}
              image={imageUrl}
              alt={`Product ${detail}`}
            />
          </Grid>
          <Grid item xs={9}>
            <Typography
              variant="caption"
              style={{ marginLeft: 8, color: theme.palette.grey[500] }}
            >
              {bookCode}
            </Typography>
            <Typography variant="body2" style={{ marginLeft: 8 }}>
              {name}
            </Typography>
          </Grid>
        </Grid>
      </ProductContainer>
      <ProductContainer item xs={2}>
        <ContentLabel
          style={{
            textDecoration: "line-through",
            marginRight: reducedPrice ? 8 : 0,
          }}
        >
          {formatVND(defaultPrice)}
        </ContentLabel>
        <ContentLabel style={{ color: theme.palette.common.black }}>
          {formatVND(reducedPrice)}
        </ContentLabel>
      </ProductContainer>
      <ProductContainer item xs={2}>
        <ChangeAmountProduct
          value={productAmount}
          handleChangeAmount={handleUpdateProductAmount}
          handleDoAfterChange={handleDoAfterChange}
        />
      </ProductContainer>
      <ProductContainer item xs={2}>
        <ContentLabel style={{ color: theme.palette.error.main }}>
          {reducedPrice
            ? formatVND(reducedPrice * amount)
            : formatVND(defaultPrice * amount)}
        </ContentLabel>
      </ProductContainer>
      <ProductContainer item xs={2}>
        <IconButton
          color="error"
          onClick={() => {
            handleRemoveProduct();
          }}
        >
          <DisabledByDefaultIcon />
        </IconButton>
      </ProductContainer>
    </Grid>
  );
};

export default memo(ProductIncart);
