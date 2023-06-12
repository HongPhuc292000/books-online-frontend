import { Box } from "@mui/material";
import { withLoading } from "app/components/HOC/withLoadingPage";
import { memo } from "react";

const DetailOrder = memo(() => {
  return <Box>Detail Order</Box>;
});

export default withLoading(DetailOrder);
