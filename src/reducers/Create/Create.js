import { createSlice } from "@reduxjs/toolkit";
import { getAvatarById, getpost } from "../../api/Create/create";
let Create = createSlice({
  name: "Create",
  initialState: {
    postData: [],
    avatar:{}
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getpost.pending, (state, action) => {
    });
    builder.addCase(getpost.fulfilled, (state, action) => {
      state.postData = action.payload;
      console.log(action.payload);
    });
    builder.addCase(getpost.rejected, (state, action) => {
    });
    builder.addCase(getAvatarById.pending, (state, action) => {
    });
    builder.addCase(getAvatarById.fulfilled, (state, action) => {
      state.avatar = action.payload;
      console.log(action.payload);
    });
    builder.addCase(getAvatarById.rejected, (state, action) => {
    });
  },
});
export let { } = Create.actions;
export default Create.reducer;
