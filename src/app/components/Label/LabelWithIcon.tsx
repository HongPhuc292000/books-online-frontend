import { Box, Grid, useTheme } from "@mui/material";
import { memo } from "react";
import { TitlePage } from ".";

interface TitlePageWithIconProps {
  title: string;
  icon: React.ReactNode;
}

const TitlePageWithIcon = memo(({ title, icon }: TitlePageWithIconProps) => {
  const theme = useTheme();
  return (
    <Grid
      container
      alignItems="center"
      sx={{ color: theme.palette.primary.dark }}
    >
      <Box sx={{ borderBottom: `1px solid ${theme.palette.primary.dark}` }}>
        <TitlePage mr={0.5}>{title}</TitlePage>
      </Box>
      {icon}
    </Grid>
  );
});

export default TitlePageWithIcon;
