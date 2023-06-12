import FilterAltIcon from "@mui/icons-material/FilterAlt";
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
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { SimpleCardImage } from "app/components/CardImage";
import { useAppDispatch, useAppSelector } from "app/hooks";
import useToastMessage from "app/hooks/useToastMessage";
import { debounce } from "lodash";
import querystring from "query-string";
import { useCallback, useEffect, useLayoutEffect, useState, memo } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { BookFilter } from "types";
import { listBooksActions } from "./slice";
import { selectListBooks } from "./slice/selector";
import { useLoading } from "app/hooks/useLoading";
import { withLoading } from "app/components/HOC/withLoadingPage";

const ListBookTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

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
  const [sortProducts, setSortProduct] = useState<number>(1);

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

  const handleChangeSortProduct = () => {
    setSortProduct(sortProducts === 1 ? -1 : 1);
    dispatch(
      listBooksActions.setFilterListBooks({
        ...filterListBooks,
        sort: filterListBooks?.sort === 1 ? -1 : 1,
      })
    );
  };

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // onFilterToQueryString({ ...filterListBooks, inStock: isInStock });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInStock]);

  useEffect(() => {
    // onFilterToQueryString({ ...filterListBooks, sort: sortProducts });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortProducts]);

  useEffect(() => {
    if (filterListBooks) {
      onFilterToQueryString(filterListBooks);
    }
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
  }, []);

  useEffect(() => {
    // const params = querystring.parse(searchLocation, {
    //   arrayFormat: "bracket",
    // });
    // const newFilter: BookFilter = filterFromQuery(params);
    // if (filterListBooks) {
    //   dispatch(listBooksActions.setFilterListBooks(filterListBooks));
    // } else {
    //   dispatch(listBooksActions.setFilterListBooks(newFilter));
    // }
    if (filterListBooks) {
      const handleFetchData = debounce(() => onFetchData(filterListBooks), 100);
      handleFetchData();
    }
    // eslint-disable-next-line
  }, [filterListBooks]);

  useEffect(() => {
    return () => {
      dispatch(listBooksActions.getAllBooksSuccess(undefined));
      dispatch(listBooksActions.setFilterListBooks(undefined));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={2} sx={{ backgroundColor: theme.palette.common.white }}>
          <ListBookTitle
            variant="h4"
            sx={{ display: "flex", alignItems: "center" }}
          >
            {t("common.filter")}
            <FilterAltIcon />
          </ListBookTitle>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label={t("common.inStock")}
              onClick={handleToggleInStock}
              checked={isInStock}
            />
          </FormGroup>
        </Grid>
        <Grid
          item
          xs={10}
          borderLeft={`1px dashed ${theme.palette.grey[300]}`}
          sx={{ backgroundColor: theme.palette.common.white }}
        >
          <Grid container justifyContent="space-between" marginBottom={4}>
            <Typography variant="h4">{t("listBooks.defaultTitle")}</Typography>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">Age</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={sortProducts}
                label="Age"
                onChange={handleChangeSortProduct}
              >
                <MenuItem value={-1}>{t("listBooks.descOrder")}</MenuItem>
                <MenuItem value={1}>{t("listBooks.ascOrder")}</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Box paddingRight={2}>
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
        </Grid>
      </Grid>
    </Box>
  );
});

export default withLoading(ListProducts);
