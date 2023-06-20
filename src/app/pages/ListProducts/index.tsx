import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { SimpleCardImage } from "app/components/CardImage";
import { withLoading } from "app/components/HOC/withLoadingPage";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useLoading } from "app/hooks/useLoading";
import useToastMessage from "app/hooks/useToastMessage";
import { debounce } from "lodash";
import querystring from "query-string";
import { memo, useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { BookFilter } from "types";
import { listBooksActions } from "./slice";
import { selectListBooks } from "./slice/selector";

const PaginationContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  padding: theme.spacing(4, 1, 2, 0),
  justifyContent: "right",
}));

interface ListProductsProps {
  setLoading: Function;
}

const ListProducts = memo(({ setLoading }: ListProductsProps) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { showErrorSnackbar } = useToastMessage();
  const { listBooks, filterListBooks } = useAppSelector(selectListBooks);
  const { showLoading, hideLoading } = useLoading({ setLoading });
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const searchLocation = location.search;

  const [isInStock, setIsInStock] = useState<boolean>(false);
  const [sortProducts, setSortProduct] = useState<string>("1");

  const onFetchData = (params: BookFilter) => {
    showLoading();
    dispatch(
      listBooksActions.getAllBooks(params, (error) => {
        if (error) {
          hideLoading();
          showErrorSnackbar(t(`error.${error}`));
        } else {
          hideLoading();
        }
      })
    );
  };

  const filterFromQuery = (query: any) => {
    const newFilter = {
      ...query,
      page: query.page ? +query.page : filterListBooks?.page,
      size: query.size ? +query.size : filterListBooks?.size,
    };
    return newFilter;
  };

  const onFilterToQueryString = (values: BookFilter): void => {
    navigate(
      {
        pathname: location.pathname,
        search: `?${querystring.stringify(
          {
            ...values,
            page: values?.page && values?.page > 0 ? values.page : 0,
            size: values?.size && values?.size > 0 ? values.size : 12,
          },
          { arrayFormat: "bracket", skipNull: true, skipEmptyString: true }
        )}`,
      },
      { replace: true }
    );
  };

  const handleFetchDataForPage = useCallback(
    (value: number) => {
      dispatch(
        listBooksActions.setFilterListBooks({
          ...filterListBooks,
          page: value - 1,
        })
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filterListBooks]
  );

  const handleToggleInStock = () => {
    setIsInStock(!isInStock);
    dispatch(
      listBooksActions.setFilterListBooks({
        ...filterListBooks,
        inStock: !filterListBooks?.inStock,
      })
    );
  };

  const handleChangeSortProduct = (event: SelectChangeEvent) => {
    setSortProduct(event.target.value as string);
    dispatch(
      listBooksActions.setFilterListBooks({
        ...filterListBooks,
        sort: event.target.value as string,
      })
    );
  };

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (filterListBooks) {
      onFilterToQueryString(filterListBooks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterListBooks]);

  useEffect(() => {
    if (searchLocation) {
      const params = querystring.parse(searchLocation, {
        arrayFormat: "bracket",
      });
      const newFilter = filterFromQuery(params);
      if (newFilter?.inStock) {
        setIsInStock(newFilter.inStock === "true" ? true : false);
      }
      if (newFilter?.sort) {
        setSortProduct(newFilter.sort);
      }
      dispatch(listBooksActions.setFilterListBooks(newFilter));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (filterListBooks) {
      const handleFetchData = debounce(() => onFetchData(filterListBooks), 100);
      handleFetchData();
    }
    // eslint-disable-next-line
  }, [filterListBooks]);

  useEffect(() => {
    return () => {
      dispatch(listBooksActions.getAllBooksSuccess(undefined));
      // dispatch(listBooksActions.setFilterListBooks(undefined));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box p={2} sx={{ backgroundColor: theme.palette.common.white }}>
      <Grid container justifyContent="space-between" marginBottom={4}>
        <Grid item>
          <Typography variant="h4">{t("listBooks.defaultTitle")}</Typography>
        </Grid>
        <Grid item display="flex" alignItems="center">
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label={t("common.inStock")}
              onClick={handleToggleInStock}
              checked={isInStock}
            />
          </FormGroup>
          <FormControl sx={{ ml: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">
              {t("listBooks.order")}
            </InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={sortProducts}
              label={t("listBooks.order")}
              onChange={handleChangeSortProduct}
            >
              <MenuItem value="1">{t("listBooks.ascOrder")}</MenuItem>
              <MenuItem value="-1">{t("listBooks.descOrder")}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Box>
        <Grid container spacing={2}>
          {listBooks?.data
            ? listBooks?.data.map((item) => (
                <Grid key={item._id} item xs={3}>
                  <SimpleCardImage productInfo={item} />
                </Grid>
              ))
            : null}
        </Grid>
      </Box>

      {listBooks?.total && listBooks?.size ? (
        <PaginationContainer>
          <Pagination
            count={Math.ceil(listBooks?.total / listBooks?.size)}
            color="primary"
            onChange={(e, value) => {
              handleFetchDataForPage(value);
            }}
            page={filterListBooks?.page ? filterListBooks?.page + 1 : 1}
          />
        </PaginationContainer>
      ) : null}
    </Box>
  );
});

export default withLoading(ListProducts);
