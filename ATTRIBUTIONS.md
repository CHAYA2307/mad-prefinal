import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Home } from "./components/Home";
import { CategoryDetail } from "./components/CategoryDetail";
import { CreatorList } from "./components/CreatorList";
import { CreatorProfile } from "./components/CreatorProfile";
import { Booking } from "./components/Booking";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { path: "/", Component: Login },
      { path: "/register", Component: Register },
      { path: "/home", Component: Home },
      { path: "/category/:categoryName", Component: CategoryDetail },
      { path: "/creators/:subcategory", Component: CreatorList },
      { path: "/creator/:id", Component: CreatorProfile },
      { path: "/booking/:id", Component: Booking },
    ],
  },
]);
