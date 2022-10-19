import path from "app/routes/path";
import { HeaderNavChangePageI } from "types";
import HomeIcon from "@mui/icons-material/Home";
import ClassIcon from "@mui/icons-material/Class";
import ReviewsIcon from "@mui/icons-material/Reviews";

export const pages: HeaderNavChangePageI[] = [
  {
    title: "home",
    link: path.home,
    icon: <HomeIcon />,
  },
  {
    title: "bookCategories",
    link: path.bookCategories,
    icon: <ClassIcon />,
    children: [
      {
        title: "test",
        link: `/bookCategories/test`,
      },
      {
        title: "hmmm",
        link: `/bookCategories/hmmm`,
      },
    ],
  },
  {
    title: "reviews",
    link: path.reviews,
    icon: <ReviewsIcon />,
  },
];

export const settings = ["Profile", "Account", "Dashboard", "Logout"];
