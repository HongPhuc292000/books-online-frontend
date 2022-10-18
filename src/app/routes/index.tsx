import { DefaultLayout } from "app/components/Layouts";
import React, { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import path from "./path";

const Home = lazy(() => import("app/pages/Home"));
const BookCategories = lazy(() => import("app/pages/BookCategories"));
const Reviews = lazy(() => import("app/pages/Reviews"));

export default function Router() {
  return useRoutes([
    {
      path: path.root,
      element: <DefaultLayout />,
      children: [
        {
          index: true,
          element: <Navigate to={path.home} replace />,
        },
        {
          path: path.home,
          element: <Home />,
        },
        {
          path: path.bookCategories,
          element: <BookCategories />,
          children: [
            {
              path: path.bookCategory,
              element: <BookCategories />,
            },
          ],
        },
        {
          path: path.reviews,
          element: <Reviews />,
        },
      ],
    },
    { path: "*", element: <Home /> },
  ]);
}
