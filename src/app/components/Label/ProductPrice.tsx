import { Grid, Typography, styled, useTheme } from "@mui/material";
import { formatVND } from "utils";

const ContentLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[500],
}));

interface ProductPriceProps {
  defaultPrice: number;
  reducedPrice?: number;
}

const ProductPrice = ({ defaultPrice, reducedPrice }: ProductPriceProps) => {
  const theme = useTheme();
  return (
    <Grid container alignItems="baseline">
      <ContentLabel
        variant="subtitle1"
        sx={{
          marginRight: reducedPrice ? 1 : 0,
          color: theme.palette.error.main,
        }}
      >
        {reducedPrice ? formatVND(reducedPrice) : formatVND(defaultPrice)}
      </ContentLabel>
      {reducedPrice ? (
        <ContentLabel variant="caption" sx={{ textDecoration: "line-through" }}>
          {formatVND(defaultPrice)}
        </ContentLabel>
      ) : null}
    </Grid>
  );
};

export default ProductPrice;
