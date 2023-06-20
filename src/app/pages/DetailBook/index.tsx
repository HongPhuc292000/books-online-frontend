import { Box, Grid, Typography, useTheme } from "@mui/material";
import { withLoading } from "app/components/HOC/withLoadingPage";
import DetailBookMainContent from "./components/DetailBookMainContent";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { detailBookAction } from "./slice";
import { useParams } from "react-router-dom";
import { useLoading } from "app/hooks/useLoading";
import useToastMessage from "app/hooks/useToastMessage";
import { useTranslation } from "react-i18next";
import IntroduceProduct from "./components/IntroduceProduct";
import { DetailBookContainer } from "./components/CommonComponents";
import { selectDetailBook } from "./slice/selector";
import SuggestBook from "./components/SuggestBook";

interface DetailBookProps {
  setLoading: Function;
}

const DetailBook = ({ setLoading }: DetailBookProps) => {
  const { id } = useParams();
  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { showLoading, hideLoading } = useLoading({ setLoading });
  const { showErrorSnackbar } = useToastMessage();
  const { listBestSellingBooks, listBookSameAuthor } =
    useAppSelector(selectDetailBook);
  const detailRef = useRef<HTMLDivElement>(null);
  const moreBookRef = useRef<HTMLDivElement>(null);

  const handleFetchDetailProduct = () => {
    if (id) {
      showLoading();
      dispatch(
        detailBookAction.getDetailBook(id, (error) => {
          if (error) {
            hideLoading();
            showErrorSnackbar(t(`error.${error}`));
          } else {
            hideLoading();
          }
        })
      );
    }
  };

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      dispatch(detailBookAction.getDetailBookSuccess(undefined));
      dispatch(detailBookAction.getAllBooksSameAuthorSuccess(undefined));
      dispatch(detailBookAction.getAllBestSellingBooksSuccess(undefined));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (detailRef.current && moreBookRef.current) {
      const detailContainerHeight = detailRef.current.clientHeight;
      moreBookRef.current.style.maxHeight = `${detailContainerHeight}px`;
    }
  });

  useEffect(() => {
    if (id) {
      handleFetchDetailProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return (
    <Box>
      <Grid container justifyContent="space-between">
        <Grid item flex={1} mr={1} ref={detailRef} height="fit-content">
          <DetailBookContainer>
            <DetailBookMainContent />
          </DetailBookContainer>
          <DetailBookContainer
            borderTop={`1px dashed ${theme.palette.grey[300]}`}
          >
            <IntroduceProduct />
          </DetailBookContainer>
        </Grid>
        <Grid item xs={2} ref={moreBookRef} sx={{ overflowY: "auto" }}>
          <DetailBookContainer>
            <Typography fontWeight={600}>
              {listBookSameAuthor?.data && listBookSameAuthor?.data?.length > 0
                ? t("detailBook.sameAuthor")
                : t("detailBook.bestSelling")}
            </Typography>

            {listBookSameAuthor?.data || listBestSellingBooks?.data ? (
              <Box>
                {listBookSameAuthor?.data &&
                listBookSameAuthor.data.length !== 0
                  ? listBookSameAuthor.data
                      .filter((book) => book._id !== id)
                      .map((book) => (
                        <SuggestBook key={book._id} detailBook={book} />
                      ))
                  : null}
                {listBestSellingBooks?.data &&
                listBookSameAuthor?.data?.length === 0
                  ? listBestSellingBooks.data
                      .filter((book) => book._id !== id)
                      .map((book) => (
                        <SuggestBook key={book._id} detailBook={book} />
                      ))
                  : null}
              </Box>
            ) : null}
          </DetailBookContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default withLoading(DetailBook);
