import { createSlice } from "@reduxjs/toolkit";
import {
  getPost,
  getPostById,
  postLike,
} from "../../api/ExploreApi/ExploreApi";

let explore = createSlice({
  name: "explore",
  initialState: {
    data: [],
    dataById: [],
    posts: [],
    loading: false,
    Comments: "",
    postLike:[]
  },
  reducers: {
    setComment: (state, action) => {
      state.Comments = action.payload;
      
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPost.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getPost.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(getPost.rejected, (state, action) => {
      state.loading.false;
    });
    //By Id
    builder.addCase(getPostById.fulfilled, (state, action) => {
      state.dataById = action.payload;
      console.log(state.dataById);
    });
    ("");

    //  StateForLike
    builder.addCase(postLike.pending, (state, action) => {});
    builder.addCase(postLike.fulfilled, (state, action) => {});
    builder.addCase(postLike.rejected, (state, action) => {});
  },
});
export let { setComment } = explore.actions;
export default explore.reducer;
