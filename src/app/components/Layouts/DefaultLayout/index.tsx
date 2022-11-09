import { Container } from "@mui/material";
import PageHeader from "app/components/PageHeader";
import React from "react";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <>
      <PageHeader />
      <Container fixed sx={{ mt: 12 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default DefaultLayout;
