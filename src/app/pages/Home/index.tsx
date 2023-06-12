import { useLayoutEffect, useEffect } from "react";
import { Grid } from "@mui/material";
import { withLoading } from "app/components/HOC/withLoadingPage";
import BestSellingBooks from "./components/BestSellingBooks";
import NewBooks from "./components/NewBooks";
import HomeBanner from "./components/HomeBanner";
import { useAppDispatch } from "app/hooks";
import { homeActions } from "./slice";
import { useLoading } from "app/hooks/useLoading";

interface HomeProps {
  setLoading: Function;
}

const Home = ({ setLoading }: HomeProps) => {
  const dispatch = useAppDispatch();
  const { showLoading, hideLoading } = useLoading({ setLoading });

  const handleFetchBestSellingBooks = () => {
    showLoading();
    dispatch(
      homeActions.getAllBestSellingBooks(
        { page: 0, size: 8, bestSaled: true },
        () => {}
      )
    );
    dispatch(
      homeActions.getAllNewBooks({ page: 0, size: 8, isNew: true }, () => {})
    );
    hideLoading();
  };

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    handleFetchBestSellingBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <HomeBanner />
      </Grid>
      <Grid item xs={12}>
        <BestSellingBooks />
      </Grid>
      <Grid item xs={12}>
        <NewBooks />
      </Grid>
    </Grid>
  );
};

export default withLoading(Home);
