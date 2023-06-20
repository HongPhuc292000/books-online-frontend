import { CardMedia, Grid, Typography } from "@mui/material";
import { DetailBookByCode } from "types/Order";
import ProductPrice from "../Label/ProductPrice";

interface ProductBoughtProps {
  detailProduct: DetailBookByCode;
}

const ProductBought = ({ detailProduct }: ProductBoughtProps) => {
  const { imageUrl, name, amount, reducedPrice, defaultPrice } = detailProduct;
  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <CardMedia component="img" src={imageUrl} alt={name} />
      </Grid>
      <Grid item flex={1}>
        <Typography variant="body2">{name}</Typography>
        <Typography variant="body2">{`x${amount}`}</Typography>
        <ProductPrice defaultPrice={defaultPrice} reducedPrice={reducedPrice} />
      </Grid>
    </Grid>
  );
};

export default ProductBought;
