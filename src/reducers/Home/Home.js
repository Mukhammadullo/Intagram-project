import { createSlice } from "@reduxjs/toolkit";
import { allUsers, comPost, getPost, getUser, profileById, storyById } from "../../api/Home/home";

const home = createSlice({
  name: "home",
  initialState: {
    home: [],
    post: [],
    byId: [],
    like: [],
    profile: [],
    stories: [],
    allUser: [],
    openStory: false, 
    loading: false,
    comment: "",
    base64F: null,

  },
  reducers: {
    setComment: (state, action) => {
      state.comment = action.payload
    },
  },
  
  extraReducers: (builder) => {
    //user 
    builder.addCase(getUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.home = action.payload;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.loading = false;
    })

    // post
    builder.addCase(getPost.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getPost.fulfilled, (state, action) => {
      state.loading = false;
      state.post = action.payload;
    });
    builder.addCase(getPost.rejected, (state, action) => {
      state.loading = false;
    });

    //postId 
    builder.addCase(comPost.pending, (state, action) => {
      state.loading = true;
    })
    builder.addCase(comPost.fulfilled, (state, action) => {
      state.loading = false;
      state.byId = action.payload;
    });
    builder.addCase(comPost.rejected, (state, action) => {
      state.loading = false;
    });

    //profile 
    builder.addCase(profileById.pending, (state, action) => {
      state.loading = false;
    });
    builder.addCase(profileById.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    });
    builder.addCase(profileById.rejected, (state, action) => {
      state.loading = false;
    })


    //ById
    builder.addCase(storyById.pending, (state, action) => {
      state.loading = false;
    });
    builder.addCase(storyById.fulfilled, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.stories = action.payload;
    });
    builder.addCase(storyById.rejected, (state, action) => {
      state.loading = false;
    })

    //allusers
    builder.addCase(allUsers.pending, (state, action) => {
      state.loading = false;
    })

    builder.addCase(allUsers.fulfilled, (state,action) => {
      state.loading = false;
      state.allUser = action.payload
    })
    builder.addCase(allUsers.rejected, (state, action) => {
      state.loading = false;
    })
  }
})

export default home.reducer;
export const { setComment } = home.actions;
