import { configureStore } from "@reduxjs/toolkit";
import layout from "../reducers/Layout/Layout";
import profile from "../reducers/Profile/Profile";
import explore from "../reducers/explore/Explore";
import Reelse from "../reducers/reels/Reelse";
import searchred from "../reducers/search/searchred";
import message from "../reducers/Message/Message";
import post from "../reducers/post/post";
import Natification from "../reducers/natification/Natification";
import Home from "../reducers/Home/Home";
import Create from "../reducers/Create/Create";


export const store = configureStore({
  reducer: {
    layout,
    profile,
    explore,
    reels: Reelse,
    searchred,
    message,
    post,
    Natification,
    Home,
    Create,
  },
});

