import { createBrowserRouter } from "react-router-dom";

import Splash from "./screens/Splash";

import Login from "./screens/Login";

import Register from "./screens/Register";

import Categories from "./screens/Categories";

import CreatorList from "./screens/CreatorList";

import CreatorProfile from "./screens/CreatorProfile";

import Booking from "./screens/Booking";

import Dashboard from "./screens/Dashboard";

import CreatorSetup from "./screens/CreatorSetup";

import PortfolioUpload from "./screens/PortfolioUpload";

import CustomerDashboard from "./screens/CustomerDashboard";


export const router =
  createBrowserRouter([

    {
      path: "/",
      element: <Splash />,
    },

    {
      path: "/login",
      element: <Login />,
    },

    {
      path: "/register",
      element: <Register />,
    },

    {
      path: "/categories",
      element: <Categories />,
    },

    {
      path:
        "/creators/:category/:subcategory",
      element: <CreatorList />,
    },

    {
      path: "/creator/:id",
      element: <CreatorProfile />,
    },

    {
      path:
        "/booking/:creatorId",
      element: <Booking />,
    },

    {
      path: "/dashboard",
      element: <Dashboard />,
    },

    {
      path:
        "/customer-dashboard",
      element:
        <CustomerDashboard />,
    },

    {
      path:
        "/creator-setup",
      element:
        <CreatorSetup />,
    },

    {
      path:
        "/portfolio-upload",
      element:
        <PortfolioUpload />,
    },

  ]);