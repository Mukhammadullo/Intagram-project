import React from "react";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Explore from "./pages/Explore/Explore";
import Reels from "./pages/Reels/Reels";
import Message from "./pages/Message/Message";
import Natification from "./pages/natification/Natification";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./Layout/Layout";
import Registration from "./pages/Registration/Registration";
import UserProfile from "./pages/User/userProfile";
import DefaultMessage from "./pages/DefaultMessage/DefaultMessage";
import ChatById from "./pages/chat/ChatById";
import UserById from "./pages/UserById/UserById";

export const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/basic",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "explore",
          element: <Explore />,
        },
        {
          path: "reels",
          element: <Reels />,
        },
        {
          path: "message/*",
          element: <Message />,
          children: [
            {
              index: true,
              path: "get",
              element: <DefaultMessage />,
            },
            {
              path: "chatById/:id",
              element: <ChatById />,
            },
          ],
        },
        // {
        //   path: "notifications",
        //   element: <Notifications />,
        // },
        {
          path: "profile",
          element: <Profile />,
        },

        {
          path: "user/:id",
          element: <UserProfile />,
        },

        {
          path: "profile/account/settings",
          element: <Settings />,
        },
        {
          path : "userId/:id",
          element : <UserById />
        }
      ],
    },
    {
      path: "/registration",
      element: <Registration />,
    },
  ]);

  return <RouterProvider router={router} />;
};
