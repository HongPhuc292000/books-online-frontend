import { Box, Grid, useTheme } from "@mui/material";
import { TitlePage } from ".";

interface TitlePageWithIconProps {
  title: string;
  icon: React.ReactNode;
}

export const TitlePageWithIcon = ({ title, icon }: TitlePageWithIconProps) => {
  const theme = useTheme();
  return (
    <Grid
      container
      alignItems="center"
      sx={{ color: theme.palette.primary.dark, marginBottom: 2 }}
    >
      <Box sx={{ borderBottom: `1px solid ${theme.palette.primary.dark}` }}>
        <TitlePage mr={0.5}>{title}</TitlePage>
      </Box>
      {icon}
    </Grid>
  );
};
