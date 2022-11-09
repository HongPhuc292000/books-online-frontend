import { Box, Grid, useTheme } from "@mui/material";
import { memo } from "react";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useTranslation } from "react-i18next";

import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Logo from "app/components/Logo";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function tabLabelProps(index: number) {
  return {
    id: `sign-tab-${index}`,
    "aria-controls": `sign-tabpanel-${index}`,
  };
}

interface AuthModalProps {
  onClose: Function;
  loginSelected: boolean;
}

const AuthModal = memo(({ onClose, loginSelected }: AuthModalProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [value, setValue] = React.useState(loginSelected ? 0 : 1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container justifyContent="right" color={theme.palette.primary.main}>
        <Logo displayXs="flex" displayMd="flex" variant="h5" />
      </Grid>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label={t("common.login")} {...tabLabelProps(0)} />
          <Tab label={t("common.register")} {...tabLabelProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <LoginForm onCloseModal={onClose} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <RegisterForm onCloseModal={onClose} />
      </TabPanel>
    </Box>
  );
});

export default AuthModal;
