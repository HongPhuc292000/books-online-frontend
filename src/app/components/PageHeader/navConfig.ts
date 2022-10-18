import path from "app/routes/path";
import { HeaderNavChangePageI } from "types";

export const pages: HeaderNavChangePageI[] = [
  {
    title: "home",
    link: path.home,
  },
  {
    title: "bookCategories",
    link: path.bookCategories,
    children: [
      {
        title: "test",
        link: `/bookCategories/test`,
      },
    ],
  },
  {
    title: "reviews",
    link: path.reviews,
  },
];

export const settings = ["Profile", "Account", "Dashboard", "Logout"];
