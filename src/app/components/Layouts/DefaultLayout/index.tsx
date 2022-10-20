import { Container } from "@mui/material";
import LazyLoad from "app/components/LazyLoad";
import PageHeader from "app/components/PageHeader";
import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

function DefaultLayout() {
  return (
    <>
      <PageHeader />
      {/* <Outlet />
      <Footer />
      <SocialsLink /> */}
      <Container fixed sx={{ mt: 4 }}>
        <Suspense fallback={<LazyLoad />}>
          <Outlet />
        </Suspense>
      </Container>
    </>
  );
}

export default DefaultLayout;
