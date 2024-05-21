import { GetPostByUser, getProfileById } from "../../api/Profile/profile";
import { createSlice } from "@reduxjs/toolkit";

const profile = createSlice({
  name: "profile",
  initialState: {
    userProfile : [],
    postUser : []
  },
  reducers: {},
 
  extraReducers : ( builder ) => {
    builder.addCase ( getProfileById . pending, ( state , action ) => {
      state.isLoading = true
    })
    builder.addCase ( getProfileById . fulfilled, ( state , action ) => {
      state.userProfile = action.payload
      state.isLoading = false
    })

    builder . addCase ( GetPostByUser.fulfilled , ( state , action ) => {
      state.postUser = action.payload
      state.isLoading = false
    })
  }
});


export const { userProfile , postUser } = profile.actions;
export default profile.reducer;
