import React from "react";
// import Header from 'app/components/Header';
import { Outlet } from "react-router-dom";
// import Footer from 'app/components/Footer';

function DefaultLayout() {
  return (
    <>
      {/* <Header />
      <Outlet />
      <Footer />
      <SocialsLink /> */}
      <Outlet />
    </>
  );
}

export default DefaultLayout;
