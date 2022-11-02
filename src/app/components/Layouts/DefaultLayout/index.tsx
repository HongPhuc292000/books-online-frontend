import { Container } from "@mui/material";
import LazyLoad from "app/components/LazyLoad";
import PageHeader from "app/components/PageHeader";
import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <>
      <PageHeader />
      <Container fixed sx={{ mt: 12 }}>
        <Suspense fallback={<LazyLoad />}>
          <Outlet />
        </Suspense>
      </Container>
    </>
  );
};

export default DefaultLayout;
