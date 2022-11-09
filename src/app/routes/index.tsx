import { DefaultLayout } from "app/components/Layouts";
import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import path from "./path";
import Home from "app/pages/Home";
import BookCategories from "app/pages/BookCategories";
import Reviews from "app/pages/Reviews";

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
