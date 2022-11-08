import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

interface DialogProps {
  open: boolean;
  title?: string;
  disabledCloseButton?: boolean;
  onClose: () => void;
  showContent?: () => React.ReactNode;
  maxWidth: "xs" | "sm" | "md" | "lg" | "xl";
  [propsName: string]: any;
}

export default function ActionDialog({
  open,
  title,
  onClose,
  showContent,
  maxWidth,
  ...rest
}: DialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      aria-labelledby="responsive-dialog-title"
      {...rest}
    >
      {title ? (
        <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
      ) : null}
      <DialogContent>{showContent && showContent()}</DialogContent>
    </Dialog>
  );
}
