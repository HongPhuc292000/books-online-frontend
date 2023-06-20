import { CardMedia, Grid, Typography, styled, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Book } from "types";
import { formatVND } from "utils";

const ContentLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[500],
}));

interface SuggestBookProps {
  detailBook: Book;
}

const SuggestBook = ({ detailBook }: SuggestBookProps) => {
  const { _id, imageUrl, name, authorId, defaultPrice, reducedPrice } =
    detailBook;
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Grid
      container
      justifyContent="center"
      mt={2}
      sx={{ ":hover": { cursor: "pointer" } }}
      onClick={() => {
        navigate(`/product/${_id}`);
      }}
    >
      <Grid item xs={12}>
        <CardMedia component="img" src={imageUrl} />
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="caption"
          sx={{
            mt: 1,
            display: "block",
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
            <ContentLabel
              variant="caption"
              sx={{ textDecoration: "line-through" }}
            >
              {formatVND(defaultPrice)}
            </ContentLabel>
          ) : null}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SuggestBook;
