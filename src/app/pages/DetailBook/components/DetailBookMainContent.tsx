import {
  Box,
  Button,
  CardMedia,
  Grid,
  Link,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { memo, useCallback, useState } from "react";
import { selectDetailBook } from "../slice/selector";
import { useTranslation } from "react-i18next";
import { formatVND, salePercent } from "utils";
import ChangeAmountProduct from "app/components/ChangeAmountProduct";
import { UpdateAmountEnum } from "types/enums";
import { detailBookAction } from "../slice";
import { withLoading } from "app/components/HOC/withLoadingPage";
import { useLoading } from "app/hooks/useLoading";
import useToastMessage from "app/hooks/useToastMessage";
import { selectAuth } from "app/components/PageHeader/slice/selector";
import { authActions } from "app/components/PageHeader/slice";
import { cartActions } from "app/pages/Cart/slice";
import { useNavigate } from "react-router-dom";

export const DetailBookTitle = styled(Typography)(() => ({
  fontSize: "24px",
}));

const ContentTypo = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  color: theme.palette.grey[500],
  marginBottom: theme.spacing(1),
}));

const OrderButton = styled(Button)(({ theme }) => ({
  textTransform: "uppercase",
}));

interface DetailMainBookMainContentProps {
  setLoading: Function;
}

const DetailMainBookMainContent = ({
  setLoading,
}: DetailMainBookMainContentProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { detailBook } = useAppSelector(selectDetailBook);
  const { authToken, user } = useAppSelector(selectAuth);
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading({ setLoading });
  const { showSuccessSnackbar, showErrorSnackbar } = useToastMessage();
  const [productAmount, setProductAmount] = useState<number>(1);
  const handleChangeAmount = useCallback(
    (type: UpdateAmountEnum, value?: number) => {
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
    },
    []
  );

  const handleAddProductTocart = () => {
    if (authToken && user) {
      if (detailBook) {
        showLoading();
        const formData = {
          customerId: user._id,
          productId: detailBook._id,
          name: detailBook.name,
          imageUrl: detailBook.imageUrl,
          bookCode: detailBook.bookCode,
          amount: productAmount,
          defaultPrice: detailBook.defaultPrice,
          reducedPrice: detailBook?.reducedPrice,
        };
        dispatch(
          cartActions.addProductToCart(formData, (err) => {
            if (err) {
              hideLoading();
              showErrorSnackbar(t(`error.${err}`));
            } else {
              hideLoading();
              showSuccessSnackbar(t("success.add_product_to_cart_success"));
            }
          })
        );
      }
    } else {
      dispatch(authActions.setShowSignModal({ login: true, show: true }));
    }
  };

  const handleBuyNow = () => {
    if (authToken && user) {
      if (detailBook) {
        showLoading();
        const formData = {
          customerId: user._id,
          productId: detailBook._id,
          name: detailBook.name,
          imageUrl: detailBook.imageUrl,
          bookCode: detailBook.bookCode,
          amount: productAmount,
          defaultPrice: detailBook.defaultPrice,
          reducedPrice: detailBook?.reducedPrice,
        };
        dispatch(
          cartActions.addProductToCart(formData, (err) => {
            if (err) {
              hideLoading();
              showErrorSnackbar(t(`error.${err}`));
            } else {
              hideLoading();
              navigate("/cart");
            }
          })
        );
      }
    } else {
      dispatch(authActions.setShowSignModal({ login: true, show: true }));
    }
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={4}>
        <CardMedia component="img" src={detailBook?.imageUrl} />
      </Grid>
      <Grid item xs={8}>
        <DetailBookTitle>{detailBook?.name}</DetailBookTitle>
        <DetailBookTitle
          sx={{ color: theme.palette.primary.main, fontWeight: 600 }}
        >
          {formatVND(
            detailBook?.reducedPrice
              ? detailBook.reducedPrice
              : detailBook?.defaultPrice
          )}
        </DetailBookTitle>
        <ContentTypo sx={{ color: theme.palette.primary.main }}>
          {t("detailBook.author")}
          {detailBook?.authorId?.name}
        </ContentTypo>
        {detailBook?.reducedPrice ? (
          <Grid container>
            <ContentTypo marginRight={0.25}>
              {t("detailBook.saving")}
            </ContentTypo>
            <ContentTypo
              sx={{ color: theme.palette.primary.main, fontWeight: 600 }}
            >{`${formatVND(
              detailBook.defaultPrice - detailBook.reducedPrice
            )}(${salePercent(
              detailBook.reducedPrice,
              detailBook.defaultPrice
            )}%)`}</ContentTypo>
          </Grid>
        ) : null}
        {detailBook?.reducedPrice ? (
          <ContentTypo>
            {t("detailBook.defaultPrice", {
              defaultPrice: formatVND(detailBook?.defaultPrice),
            })}
          </ContentTypo>
        ) : null}
        <Grid container>
          <ContentTypo>{t("detailBook.status")}</ContentTypo>
          <ContentTypo
            marginLeft={0.25}
            sx={{ color: theme.palette.primary.main }}
          >
            {detailBook?.amount && detailBook?.amount > 0
              ? t("common.inStock")
              : t("common.outStock")}
          </ContentTypo>
        </Grid>
        {detailBook?.categoryIds ? (
          <ContentTypo>
            {t("detailBook.categories", {
              categories: detailBook.categoryIds
                .map((item) => item.name)
                .join(", "),
            })}
          </ContentTypo>
        ) : null}
        <Grid container alignItems="center" mt={4} mb={4}>
          <Grid item>
            <Typography marginRight={0.25} variant="body2">
              {t("order.amount")}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <ChangeAmountProduct
              value={productAmount}
              handleChangeAmount={handleChangeAmount}
            />
          </Grid>
        </Grid>
        <Grid container>
          <OrderButton
            onClick={handleAddProductTocart}
            size="large"
            variant="outlined"
            sx={{ mr: 2 }}
            disabled={!!(!detailBook?.amount || detailBook?.amount <= 0)}
          >
            {t("order.addToCart")}
          </OrderButton>
          <OrderButton
            onClick={handleBuyNow}
            size="large"
            variant="contained"
            disabled={!!(!detailBook?.amount || detailBook?.amount <= 0)}
          >
            {t("order.buyNow")}
          </OrderButton>
        </Grid>
        <Grid container marginTop={2}>
          <Typography marginRight={0.5} variant="body2">
            {t("order.callToOrder")}
          </Typography>
          <Link
            variant="body2"
            sx={{ color: theme.palette.primary.main }}
            href="#"
          >
            0988 888 888
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withLoading(DetailMainBookMainContent);
