import { createBrowserRouter } from "react-router";
import Splash from "./screens/Splash";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Categories from "./screens/Categories";
import CreatorList from "./screens/CreatorList";
import CreatorProfile from "./screens/CreatorProfile";
import Booking from "./screens/Booking";
import Dashboard from "./screens/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Splash,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/categories",
    Component: Categories,
  },
  {
    path: "/creators/:category/:subcategory",
    Component: CreatorList,
  },
  {
    path: "/creator/:id",
    Component: CreatorProfile,
  },
  {
    path: "/booking/:creatorId",
    Component: Booking,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
]);
