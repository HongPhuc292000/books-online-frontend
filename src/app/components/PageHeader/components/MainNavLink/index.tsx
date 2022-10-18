import { Box, Button, Menu, MenuItem, useTheme } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import { HeaderNavChangePageI } from "types";

interface Props {
  page: HeaderNavChangePageI;
}

const MainNavLink = memo(({ page }: Props) => {
  const { link, title, children } = page;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  let resolved = useResolvedPath(link);
  let match = useMatch({ path: `${resolved.pathname}:category` });

  // logic submenu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleSelectMainMenu = (
    event: React.MouseEvent<HTMLElement>,
    target?: string
  ) => {
    if (children) {
      setAnchorEl(event.currentTarget);
    } else {
      if (target) navigate(target);
    }
  };

  const handleCloseSubMenu = () => {
    setAnchorEl(null);
  };

  const handleSelectSubMenu = (target?: string) => {
    handleCloseSubMenu();
    if (target) {
      navigate(target);
    }
    handleCloseSubMenu();
  };

  return (
    <Box sx={{ "&:not(last-child)": { marginRight: 1 } }}>
      <Button
        sx={{
          my: 2,
          color: "white",
          backgroundColor:
            match || open
              ? theme.palette.primary.dark
              : theme.palette.primary.main,
          "&:hover": {
            backgroundColor: theme.palette.primary.dark,
          },
        }}
        onClick={(event) => handleSelectMainMenu(event, link)}
        endIcon={children ? <ArrowDropDownIcon /> : null}
      >
        {t(`common.${title}`)}
      </Button>
      {children ? (
        <Menu
          sx={{ mt: 2 }}
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseSubMenu}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          {children.map((child) => (
            <MenuItem
              key={child.title}
              onClick={() => handleSelectSubMenu(child.link)}
            >
              {child.title}
            </MenuItem>
          ))}
        </Menu>
      ) : null}
    </Box>
  );
});

export default MainNavLink;
