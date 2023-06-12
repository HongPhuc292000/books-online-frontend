import { CardMedia, Grid, Typography, styled, useTheme } from "@mui/material";
import { DetailBookByCode } from "types/Order";
import { formatVND } from "utils";

const ContentLabel = styled("span")(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.grey[500],
}));

interface ProductBoughtProps {
  detailProduct: DetailBookByCode;
}

const ProductBought = ({ detailProduct }: ProductBoughtProps) => {
  const theme = useTheme();
  const { imageUrl, name, amount, reducedPrice, defaultPrice } = detailProduct;
  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <CardMedia component="img" src={imageUrl} alt={name} />
      </Grid>
      <Grid item flex={1}>
        <Typography variant="body2">{name}</Typography>
        <Typography variant="body2">{`x${amount}`}</Typography>
        {reducedPrice ? (
          <>
            <ContentLabel
              style={{
                textDecoration: "line-through",
                marginRight: reducedPrice ? 8 : 0,
              }}
            >
              {formatVND(defaultPrice)}
            </ContentLabel>
            <ContentLabel style={{ color: theme.palette.error.main }}>
              {formatVND(reducedPrice)}
            </ContentLabel>
          </>
        ) : (
          <ContentLabel style={{ color: theme.palette.error.main }}>
            {formatVND(defaultPrice)}
          </ContentLabel>
        )}
      </Grid>
    </Grid>
  );
};

export default ProductBought;
