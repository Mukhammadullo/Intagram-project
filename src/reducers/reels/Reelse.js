import { createSlice } from "@reduxjs/toolkit";
import { getData,  postComment,  postLike } from "../../api/Reels/Reels";

const reels = createSlice({
  name: "reels",

  initialState: {
    data: [],
    posts: [],
    Comments: "",
  },
  reducers: {
    setComment: (state, action) => {
      state.Comments = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getData.pending, (state, action) => {});

    builder.addCase(getData.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    
    builder.addCase(getData.rejected, (state, action) => {});
    //  StateForLike
    builder.addCase(postLike.pending, (state, action) => {});
    builder.addCase(postLike.fulfilled, (state, action) => {});
    builder.addCase(postLike.rejected, (state, action) => {});
  },
});

// export const {} = reels.actions;
export let { setComment } = reels.actions;
export default reels.reducer;
