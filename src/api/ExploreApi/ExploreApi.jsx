import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosRequest } from "../../utils/axiosRequest";
// getPost
export const getPost = createAsyncThunk("explore/getPost", async function () {
  try {
    let { data } = await axiosRequest.get("Post/get-posts");
    return data.data;
  } catch (error) {
    console.log(error);
  }
});

//By Id
let idx = null;
export const getPostById = createAsyncThunk(
  "explore/getPostById",
  async function (id) {
    try {
      let { data } = await axiosRequest.get(`Post/get-post-by-id?id=${id}`);
      // console.log(data.data);
      idx = id;
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// PostLike
export const postLike = createAsyncThunk(
  "exploere/postLike",
  async function (id, { dispatch }) {
    try {
      const { data } = await axiosRequest.post(`Post/like-post?postId=${id}`);
      dispatch(getPostById());
    } catch (error) {
      console.error(error);
    }
  }
);

export const postComment = createAsyncThunk(
  "reels/postComment",
  async function (newComment, { dispatch }) {
    try {
      const { data } = await axiosRequest.post("Post/add-comment", {
        comment: newComment.comment,
        postId: newComment.postId,
      });
      dispatch(getPostById(idx));
    } catch (error) {
      console.error(error);
    }
  }
);
