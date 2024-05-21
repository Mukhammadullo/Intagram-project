import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../../utils/axiosRequest";

// getData_____________________________________________________________
let idx=null

export const getData = createAsyncThunk("reels/getData", async (id) => {
  try {
    const { data } = await axiosRequest.get("Post/get-reels");
    idx=id
    return data.data;
  } catch (error) {
    console.error(error);
  }
});

// PostLike_______________________________________________________________
export const postLike = createAsyncThunk(
  "reels/postLike",
  async function (id, { dispatch }) {
    try {
      const { data } = await axiosRequest.post(`Post/like-post?postId=${id}`);
      dispatch(getData());
    } catch (error) {
      console.error(error);
    }
  }
);

// PostComment_______________________________________________________________
export const postComment = createAsyncThunk(
  "reels/postComment",
  async function (e, { dispatch }) {
    try {
      const { data } = await axiosRequest.post("Post/add-comment", {
        comment: e.comment,
        postId: e.postId,
      });

      dispatch(getData(idx));
    } catch (error) {
      console.error(error);
    }
  }
);
