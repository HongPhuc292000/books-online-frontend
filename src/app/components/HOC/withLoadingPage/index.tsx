import { Box } from "@mui/material";
import * as React from "react";
import loadingIcon from "assets/images/page_loading_icon.png";
import styled from "@emotion/styled";

const LoadingImg = styled.img`
  -webkit-animation: spin 1s linear infinite;
  -moz-animation: spin 1s linear infinite;
  animation: spin 1s linear infinite;
  display: flex;
  margin: auto;
  @-moz-keyframes spin {
    100% {
      -moz-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

export function withLoading(WrappedComponent: React.ElementType) {
  function HOC(props: any) {
    const [loading, setLoading] = React.useState(true);
    return (
      <>
        {loading && (
          <Box
            sx={{
              backgroundColor: "rgba(0,0,0,0.5)",
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1,
            }}
          >
            <LoadingImg className="image" src={loadingIcon} alt="" />
          </Box>
        )}
        <WrappedComponent {...props} setLoading={setLoading} />
      </>
    );
  }
  return HOC;
}
