import { Box, Grid, Typography, styled, useTheme } from "@mui/material";
import { Book } from "types";
import { formatVND, salePercent } from "utils";
import ProductStatus from "../Label/ProductStatus";
import { useNavigate } from "react-router-dom";

const CardWithHoverContainer = styled(Grid)(({ theme }) => ({
  justifyContent: "center",
  position: "relative",
  width: "100%",
  transition: "transform 0.15s",
  cursor: "pointer",
  backgroundColor: theme.palette.common.white,
}));

const CardWithHover = styled("img")(({ theme }) => ({
  display: "block",
  height: "240px",
  width: "auto",
  marginBottom: theme.spacing(1),
}));

const ContentLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[500],
}));

const SalePercentContainer = styled(Box)(({ theme }) => ({
  width: "40px",
  height: "40px",
  position: "absolute",
  top: "-12px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "14px",
  borderRadius: "50%",
  backgroundColor: theme.palette.error.main,
  color: theme.palette.common.white,
}));

interface SimpleCardImageProps {
  productInfo: Book;
}

export const SimpleCardImage = ({ productInfo }: SimpleCardImageProps) => {
  const { imageUrl, name, authorId, defaultPrice, reducedPrice, amount } =
    productInfo;
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <CardWithHoverContainer
      container
      sx={{
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 0.0625rem 0.125rem 0 rgba(0,0,0,.1)",
        },
        "marginBottom": 3,
        "padding": 1,
      }}
      onClick={() => {
        navigate(`/product/${productInfo._id}`);
      }}
    >
      {reducedPrice ? (
        <SalePercentContainer>
          -{salePercent(reducedPrice, defaultPrice)}%
        </SalePercentContainer>
      ) : null}
      <CardWithHover src={imageUrl} />
      <Grid item xs={12}>
        <Typography
          variant="body2"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: theme.palette.success.light }}
        >
          {authorId?.name}
        </Typography>
        <Grid container alignItems="baseline" justifyContent="space-between">
          <Grid item>
            <Grid container alignItems="baseline">
              <ContentLabel
                variant="subtitle1"
                sx={{
                  marginRight: reducedPrice ? 1 : 0,
                  color: theme.palette.error.main,
                }}
              >
                {reducedPrice
                  ? formatVND(reducedPrice)
                  : formatVND(defaultPrice)}
              </ContentLabel>
              {reducedPrice ? (
                <ContentLabel
                  variant="caption"
                  sx={{ textDecoration: "line-through" }}
                >
                  {formatVND(defaultPrice)}
                </ContentLabel>
              ) : null}
            </Grid>
          </Grid>
          <Grid item>
            <ProductStatus amount={amount} />
          </Grid>
        </Grid>
      </Grid>
    </CardWithHoverContainer>
  );
};
