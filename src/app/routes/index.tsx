import { DefaultLayout } from "app/components/Layouts";
import React, { lazy } from "react";
import { useRoutes } from "react-router-dom";
import path from "./path";

const Home = lazy(() => import("app/pages/Home"));

export default function Router() {
  return useRoutes([
    {
      path: path.home,
      element: <DefaultLayout />,
      children: [
        {
          path: path.home,
          element: <Home />,
        },
      ],
    },
    { path: "*", element: <Home /> },
  ]);
}
