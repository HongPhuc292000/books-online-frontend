import { Typography } from "@mui/material";
import { memo } from "react";

interface DefaultEllipsisProps {
  title: string;
}

export const DefaultEllipsisText = memo(({ title }: DefaultEllipsisProps) => {
  return (
    <Typography
      variant="body2"
      sx={{
        display: "inline-block",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        width: "100%",
      }}
    >
      {title}
    </Typography>
  );
});
