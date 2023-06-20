import { DefaultLayout } from "app/components/Layouts";
import React from "react";
import { useRoutes } from "react-router-dom";
import path from "./path";
import Home from "app/pages/Home";
import DetailBook from "app/pages/DetailBook";
import CartPage from "app/pages/Cart";
import ListProducts from "app/pages/ListProducts";
import CheckoutSuccess from "app/pages/CheckoutSuccess";
import ListOrders from "app/pages/ListOrders";
import DetailOrder from "app/pages/DetailOrder";

export default function Router() {
  return useRoutes([
    {
      path: path.inherit,
      element: <DefaultLayout />,
      children: [
        {
          index: true,
          path: path.inherit,
          element: <Home />,
        },
        {
          path: path.product,
          children: [
            {
              path: path.list,
              element: <ListProducts />,
            },
            {
              path: path.detail,
              element: <DetailBook />,
            },
          ],
        },
        {
          path: path.cart,
          children: [
            {
              path: path.inherit,
              element: <CartPage />,
            },
          ],
        },
        {
          path: path.order,
          children: [
            {
              path: path.list,
              element: <ListOrders />,
            },
            {
              path: path.checkoutSuccess,
              element: <CheckoutSuccess />,
            },
            {
              path: path.detail,
              element: <DetailOrder />,
            },
          ],
        },
      ],
    },
    { path: "*", element: <Home /> },
  ]);
}
