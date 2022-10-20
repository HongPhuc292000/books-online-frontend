import { Grid, useTheme } from "@mui/material";
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
      sx={{ p: "8px 0", color: theme.palette.primary.dark }}
    >
      <TitlePage mr={0.5}>{title}</TitlePage>
      {icon}
    </Grid>
  );
};
