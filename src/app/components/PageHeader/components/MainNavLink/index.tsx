import { Button, useTheme, styled } from "@mui/material";
import path from "app/routes/path";
import { useTranslation } from "react-i18next";
import { NavLink, useMatch, useResolvedPath } from "react-router-dom";
import { HeaderNavChangePageI } from "types";

interface Props {
  page: HeaderNavChangePageI;
}

const MainNavBtnDesktop = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const MainNavLink = ({ page }: Props) => {
  const { link = path.home, title } = page;
  const { t } = useTranslation();
  const theme = useTheme();
  let resolved = useResolvedPath(link);
  let match = useMatch({ path: resolved.pathname, end: true });
  const defaultStyles = {
    color: theme.palette.common.white,
    textDecoration: "none",
  };

  return (
    <NavLink to={link} style={defaultStyles}>
      {match ? (
        <MainNavBtnDesktop
          key={title}
          // onClick={() => handleCloseNavMenu()}
          sx={{ my: 2, color: "white", display: "block" }}
        >
          {t(`common.${title}`)}
        </MainNavBtnDesktop>
      ) : (
        <Button
          key={title}
          // onClick={() => handleCloseNavMenu()}
          sx={{ my: 2, color: "white", display: "block" }}
        >
          {t(`common.${title}`)}
        </Button>
      )}
    </NavLink>
  );
};

export default MainNavLink;
