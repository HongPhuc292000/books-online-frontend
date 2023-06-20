import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import WifiCalling3Icon from "@mui/icons-material/WifiCalling3";
import { Badge, Grid, alpha, styled, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useLoading } from "app/hooks/useLoading";
import path from "app/routes/path";
import noAvatar from "assets/img/no-avatar.jpg";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { Cookies } from "types/enums";

import { useAppDispatch, useAppSelector } from "app/hooks";
import useToastMessage from "app/hooks/useToastMessage";
import { cartActions } from "app/pages/Cart/slice";
import { selectOrder } from "app/pages/Cart/slice/selector";
import { decodeTokenGetId, deleteCookie, getCookies } from "utils/cookies";
import ActionDialog from "../ActionDialog";
import { SignButton } from "../Button";
import { withLoading } from "../HOC/withLoadingPage";
import Logo from "../Logo";
import AuthModal from "./components/AuthModal";
import { settings } from "./navConfig";
import { authActions } from "./slice";
import { selectAuth } from "./slice/selector";
import { listBooksActions } from "app/pages/ListProducts/slice";
import { selectListBooks } from "app/pages/ListProducts/slice/selector";
import BaseActionDialog from "../ActionDialog/BaseActionDialog";
import EditProfile from "./components/EditProfile";

const Search = styled("div")(({ theme }) => ({
  "position": "relative",
  "marginRight": theme.spacing(2),
  "borderRadius": theme.shape.borderRadius,
  "backgroundColor": alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  "width": "auto",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  "color": "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1),
    transition: theme.transitions.create("width"),
    width: "32ch",
  },
}));

interface PageHeaderProps {
  setLoading: Function;
}

const PageHeader = ({ setLoading }: PageHeaderProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const location = useLocation();

  const { authToken, user, signModalStatus } = useAppSelector(selectAuth);
  const { totalProductInCart } = useAppSelector(selectOrder);
  const { filterListBooks } = useAppSelector(selectListBooks);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading({ setLoading });
  const { showErrorSnackbar } = useToastMessage();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [searchKey, setSearchKey] = useState<string>("");

  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);

  const handleCloseDialog = () => {
    setShowDetailModal(false);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    dispatch(authActions.setShowSignModal({ ...signModalStatus, show: false }));
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    showLoading();
    dispatch(
      authActions.logout(() => {
        hideLoading();
      })
    );
  };

  const handleSelectUserMenu = (type: string) => {
    handleCloseUserMenu();
    if (type === "order") {
      navigate("/order/list");
    }
    if (type === "profile") {
      setShowDetailModal(true);
    }
  };

  const handleOpenSignModal = (login?: boolean) => {
    dispatch(
      authActions.setShowSignModal({
        show: true,
        login: !!login,
      })
    );
  };

  const handleCloseSignModal = useCallback(() => {
    dispatch(
      authActions.setShowSignModal({
        ...signModalStatus,
        show: false,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signModalStatus]);

  const handleFetchDetailCart = () => {
    if (user) {
      showLoading();
      dispatch(
        cartActions.getCartDetail(user._id, (error) => {
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

  const handleSearchBooks = () => {
    if (location.pathname === "/product/list") {
      dispatch(
        listBooksActions.setFilterListBooks({
          ...filterListBooks,
          searchKey: searchKey,
        })
      );
    } else {
      navigate(`/product/list?searchKey=${searchKey}`);
    }
  };

  useEffect(() => {
    if (!!getCookies(Cookies.AUTHTOKEN)) {
      showLoading();
      dispatch(
        authActions.getUserInfo(
          decodeTokenGetId(getCookies(Cookies.AUTHTOKEN)) || "",
          () => {
            hideLoading();
          }
        )
      );
    } else {
      deleteCookie(Cookies.AUTHTOKEN);
      deleteCookie(Cookies.REFRESHTOKEN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleFetchDetailCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <AppBar position="fixed">
      <Container>
        <Toolbar
          disableGutters
          sx={{ justifyContent: { xs: "space-between" } }}
        >
          {/* Logo in desktop */}
          <Logo
            onClick={() => navigate(path.inherit)}
            displayXs="none"
            displayMd="flex"
            variant="h6"
            mr={2}
          />
          {/* Logo in mobile */}
          <Logo
            onClick={() => navigate(path.inherit)}
            displayXs="flex"
            displayMd="none"
            variant="h5"
          />
          {/* Searchbar in desktop */}
          <Search>
            <StyledInputBase
              placeholder={t("common.searchPlaceholder")}
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => setSearchKey(e.target.value)}
              value={searchKey}
            />
            <IconButton
              type="button"
              aria-label="search"
              sx={{ cursor: "pointer", color: theme.palette.common.white }}
              onClick={handleSearchBooks}
            >
              <SearchIcon />
            </IconButton>
          </Search>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <WifiCalling3Icon />
            <Box sx={{ ml: 1 }}>
              <Typography variant="subtitle1">0988 888 888</Typography>
              <Typography variant="body2">Hot line</Typography>
            </Box>
          </Box>
          {!!authToken ? (
            <IconButton
              onClick={() => {
                navigate("/cart");
              }}
            >
              <Badge badgeContent={totalProductInCart} color="secondary">
                <ShoppingCartIcon color="action" />
              </Badge>
            </IconButton>
          ) : null}
          {/* Profile */}
          <Box sx={{ flexGrow: 0 }}>
            <Grid>
              {!!authToken ? (
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={user?.fullname}
                      src={user?.imageUrl ? user.imageUrl : noAvatar}
                    />
                  </IconButton>
                </Tooltip>
              ) : (
                <>
                  <SignButton
                    sx={{ mr: 1 }}
                    onClick={() => handleOpenSignModal(true)}
                  >
                    {t("common.login")}
                  </SignButton>
                  <SignButton onClick={() => handleOpenSignModal()}>
                    {t("common.register")}
                  </SignButton>
                  <ActionDialog
                    open={signModalStatus.show}
                    title={``}
                    maxWidth="sm"
                    onClose={handleCloseSignModal}
                    showContent={() => (
                      <AuthModal
                        onClose={handleCloseSignModal}
                        loginSelected={signModalStatus.login}
                      />
                    )}
                  />
                </>
              )}
            </Grid>
            {/* User menu */}
            <Menu
              sx={{ mt: { xs: 1, sm: 1.5, md: 2 } }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={() => handleSelectUserMenu("profile")}>
                <Typography textAlign="center">
                  {t("common.profile")}
                </Typography>
              </MenuItem>
              <MenuItem onClick={() => handleSelectUserMenu("order")}>
                <Typography textAlign="center">
                  {t("order.alreadyBoughtOrder")}
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">{t("common.logout")}</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>

      {/* Do latter */}
      <Box style={{ backgroundColor: theme.palette.common.white }}>
        <Container>
          <Grid container>
            <Grid item></Grid>
            <Grid item></Grid>
          </Grid>
        </Container>
      </Box>

      <BaseActionDialog
        title={t("user.profileInfo")}
        isOpen={showDetailModal}
        dialogContent={<EditProfile onCloseDialog={handleCloseDialog} />}
        onCancel={handleCloseDialog}
        maxWidth="md"
      />
    </AppBar>
  );
};
export default withLoading(PageHeader);
