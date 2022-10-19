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
      <Suspense fallback={<LazyLoad />}>
        <Outlet />
      </Suspense>
    </>
  );
}

export default DefaultLayout;
