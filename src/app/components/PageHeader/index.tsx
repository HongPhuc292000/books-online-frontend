import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";
import { styled, alpha, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { HeaderNavChangePageI } from "types";
import path from "app/routes/path";
import { Cookies } from "types/enums";
import { useLoading } from "app/hooks/useLoading";
import noAvatar from "assets/img/no-avatar.jpg";

import { pages, settings } from "./navConfig";
import MainNavLink from "./components/MainNavLink";
import MobileNav from "./components/MobileNav";
import { SignButton } from "../Button";
import ActionDialog from "../ActionDialog";
import AuthModal from "./components/AuthModal";
import Logo from "../Logo";
import { decodeTokenGetId, deleteCookie, getCookies } from "utils/cookies";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectAuth } from "./slice/selector";
import { authActions } from "./slice";
import { withLoading } from "../HOC/withLoadingPage";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  marginRight: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: "auto",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "14ch",
    "&:focus": {
      width: "24ch",
    },
  },
}));

interface PageHeaderProps {
  setLoading: Function;
}

const PageHeader = ({ setLoading }: PageHeaderProps) => {
  const { t } = useTranslation();
  const [openMobileNav, setOpenMobileNav] = useState<boolean>(false);
  const [showSignModal, setShowSignModal] = useState({
    show: false,
    login: true,
  });
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { authToken, user } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading({ setLoading });

  const handleOpenMobileNav = () => {
    setOpenMobileNav(true);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    setShowSignModal((prevStatus) => ({
      ...prevStatus,
      show: false,
    }));
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

  const handleSelectUserMenu = (link: string) => {
    handleCloseUserMenu();
    navigate(link);
  };

  const handleOpenSignModal = (login?: boolean) => {
    setShowSignModal({
      show: true,
      login: !!login,
    });
  };

  const handleCloseSignModal = useCallback(() => {
    setShowSignModal((prevStatus) => ({
      ...prevStatus,
      show: false,
    }));
  }, []);

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

  return (
    <AppBar position="fixed">
      <Container>
        <Toolbar
          disableGutters
          sx={{ justifyContent: { xs: "space-between", md: "initial" } }}
        >
          {/* Logo in desktop */}
          <Logo
            onClick={() => navigate(path.home)}
            displayXs="none"
            displayMd="flex"
            variant="h6"
            mr={2}
          />
          {/* Main nav in mobile */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={handleOpenMobileNav}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <MobileNav
              openMobileNav={openMobileNav}
              setOpenMobileNav={setOpenMobileNav}
            />
          </Box>
          {/* Logo in mobile */}
          <Logo
            onClick={() => navigate(path.home)}
            displayXs="flex"
            displayMd="none"
            variant="h5"
          />
          {/* Main nav in Desktop */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page: HeaderNavChangePageI) => (
              <MainNavLink key={page.title} page={page} />
            ))}
          </Box>
          {/* Searchbar in desktop */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder={t("common.searchPlaceholder")}
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          {/* Profile */}
          <Box sx={{ flexGrow: 0 }}>
            <Grid>
              {!!authToken ? (
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={user?.fullname}
                      src={user?.avatar ? "" : noAvatar}
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
                    open={showSignModal.show}
                    title={``}
                    maxWidth="sm"
                    onClose={handleCloseSignModal}
                    showContent={() => (
                      <AuthModal
                        onClose={handleCloseSignModal}
                        loginSelected={showSignModal.login}
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
              {settings.map((setting) => (
                <MenuItem
                  key={setting.title}
                  onClick={() => handleSelectUserMenu(setting.link)}
                >
                  <Typography textAlign="center">
                    {t(`common.${setting.title}`)}
                  </Typography>
                </MenuItem>
              ))}
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">{t("common.logout")}</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default withLoading(PageHeader);
