import React, { memo } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import { HeaderNavChangePageI } from "types";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

interface NavProps {
  page: HeaderNavChangePageI;
}

interface SubNavProps {
  navItems?: HeaderNavChangePageI[];
  isOpenSubNav: boolean;
}

const SubNav = memo(({ navItems, isOpenSubNav }: SubNavProps) => {
  return (
    <Collapse in={isOpenSubNav} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {navItems ? (
          <>
            {navItems.map((nav) => (
              <React.Fragment key={nav.title}>
                <ListItem>
                  <ListItemButton>
                    <ListItemIcon sx={{ minWidth: 28, fontSize: 12 }}>
                      <FiberManualRecordIcon fontSize="inherit" />
                    </ListItemIcon>
                    <ListItemText primary={nav.title} />
                  </ListItemButton>
                </ListItem>
              </React.Fragment>
            ))}
          </>
        ) : null}
      </List>
    </Collapse>
  );
});

const MainNav = memo(({ page }: NavProps) => {
  const { title, link, children, icon = <></> } = page;
  const [openSubNav, setOpenSubNav] = React.useState<boolean>(false);

  const handleToggleSubnav = () => {
    setOpenSubNav(!openSubNav);
  };
  return (
    <>
      <ListItem disablePadding onClick={handleToggleSubnav}>
        <ListItemButton>
          <ListItemIcon sx={{ minWidth: 40 }}>{icon}</ListItemIcon>
          <ListItemText primary={title} />
          {page.children ? (
            <>{openSubNav ? <ExpandLess /> : <ExpandMore />}</>
          ) : null}
        </ListItemButton>
      </ListItem>
      {children ? (
        <SubNav isOpenSubNav={openSubNav} navItems={children} />
      ) : null}
    </>
  );
});

export default MainNav;
