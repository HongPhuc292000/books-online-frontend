import PageHeader from "app/components/PageHeader";
import React from "react";
import { Outlet } from "react-router-dom";

function DefaultLayout() {
  return (
    <>
      <PageHeader />
      {/* <Outlet />
      <Footer />
      <SocialsLink /> */}
      <Outlet />
    </>
  );
}

export default DefaultLayout;
