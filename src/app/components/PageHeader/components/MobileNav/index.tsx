import CloseIcon from "@mui/icons-material/Close";
import { Box, Divider, Drawer, IconButton, List, styled } from "@mui/material";
import * as React from "react";
import { memo } from "react";

import MainNav from "./MainNav";
import { pages } from "../../navConfig";

interface Props {
  openMobileNav: boolean;
  setOpenMobileNav: Function;
}

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const MobileNav = memo(({ openMobileNav, setOpenMobileNav }: Props) => {
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpenMobileNav(open);
    };

  return (
    <Drawer anchor="left" open={openMobileNav} onClose={toggleDrawer(false)}>
      <DrawerHeader>
        <IconButton onClick={toggleDrawer(false)}>
          <CloseIcon fontSize="large" />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <Box sx={{ width: 250 }} role="presentation">
        <List>
          {pages.map((page) => (
            <MainNav key={page.title} page={page} />
          ))}
        </List>
      </Box>
    </Drawer>
  );
});

export default MobileNav;
