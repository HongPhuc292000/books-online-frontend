import { Box, Typography } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useTranslation } from "react-i18next";

interface LogoProps {
  onClick?: Function;
  displayXs: "none" | "flex";
  displayMd: "none" | "flex";
  variant: "h6" | "h5";
  mr?: number;
}

const Logo = ({
  onClick,
  displayXs,
  displayMd,
  variant,
  mr = 0,
}: LogoProps) => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: { xs: displayXs, md: displayMd },
        cursor: "pointer",
        mr: mr,
      }}
      onClick={() => onClick && onClick()}
    >
      <MenuBookIcon sx={{ display: { xs: displayXs, md: displayMd }, mr: 1 }} />
      <Typography
        variant={variant}
        noWrap
        sx={{
          display: { xs: displayXs, md: displayMd },
          fontFamily: "monospace",
          fontWeight: 700,
          color: "inherit",
        }}
      >
        {t("common.logoText")}
      </Typography>
    </Box>
  );
};

export default Logo;
