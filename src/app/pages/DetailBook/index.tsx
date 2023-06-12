import { Box, Grid, useTheme } from "@mui/material";
import { withLoading } from "app/components/HOC/withLoadingPage";
import DetailBookMainContent from "./components/DetailBookMainContent";
import { useEffect, useLayoutEffect } from "react";
import { useAppDispatch } from "app/hooks";
import { detailBookAction } from "./slice";
import { useParams } from "react-router-dom";
import { useLoading } from "app/hooks/useLoading";
import useToastMessage from "app/hooks/useToastMessage";
import { useTranslation } from "react-i18next";
import IntroduceProduct from "./components/IntroduceProduct";
import { DetailBookContainer } from "./components/CommonComponents";

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
  }, []);

  useEffect(() => {
    if (id) {
      handleFetchDetailProduct();
    }
  }, []);
  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={9}>
          <DetailBookContainer>
            <DetailBookMainContent />
          </DetailBookContainer>
          <DetailBookContainer
            borderTop={`1px dashed ${theme.palette.grey[300]}`}
          >
            <IntroduceProduct />
          </DetailBookContainer>
        </Grid>
        <Grid item xs={3}>
          <DetailBookContainer>heh</DetailBookContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default withLoading(DetailBook);
