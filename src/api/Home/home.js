import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../../utils/axiosRequest";

//getUser
export const getUser = createAsyncThunk("todo/getUser",
    async () => {
        try {
            let { data } = await axiosRequest.get(`Story/get-stories`)
            console.log(data.data);
            return data.data
        } catch (error) {
            console.log(error);
        }
    }
)



//getPost
export const getPost = createAsyncThunk("todo/getPost",
    async (id) => {
        try {
            let { data } = await axiosRequest.get(`Post/get-following-post?UserId=${id}`)
            return data?.data
        } catch (error) {
            console.log(error);
        }
    }
)

//By Id
export const comPost = createAsyncThunk("todo/comPost",
    async (id) => {
        try {
            let { data } = await axiosRequest.get(`Post/get-post-by-id?id=${id}`);
            return data?.data;
        } catch (error) {
            console.log(error);
        }
    }
);

//like post 
export const likePost = createAsyncThunk("todo/likePost",
    async (id, { dispatch }) => {
        try {
            const { data } = await axiosRequest.post(`Post/like-post?postId=${id}`);
            dispatch(getPost())
        } catch (error) {
            console.error(error);
        }
    }
);

//profile id 
export const profileById = createAsyncThunk("todo/profileById",
    async (id) => {
        try {
            let { data } = await axiosRequest.get(`UserProfile/get-user-profile-by-id?id=${id}`)
            return data?.data
        } catch (error) {

        }
    }
)

//add Story
export const addStories = createAsyncThunk('todo/addStories',
    async (formData, { dispatch }) => {
        try {
            const { data } = await axiosRequest.post(`Story/AddStories`, formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )

            console.log(data);

            dispatch(getUser())
        } catch (error) {
            console.error(error);
        }
    }
)

//story By Id
export const storyById = createAsyncThunk("todo/storyById",
    async (id) => {
        try {
            let { data } = await axiosRequest.get(`Story/get-stories?userId=${id}`)
            return data?.data
        } catch (error) {
            console.log(error);
        }
    }
)



//User-gets
export const allUsers = createAsyncThunk("todo/users",
    async () => {
        try {
            const { data } = await axiosRequest.get("User/get-users")
            return data?.data
        } catch (error) {
            console.log(error)
        }
    }
)

//comments post 
export const postComment = createAsyncThunk("todo/postComment",
    async (newCom, { dispatch }) => {
        try {
            const { data } = await axiosRequest.post("Post/add-comment", {
                comment: newCom.comment,
                postId: newCom.postId,
            });
            dispatch(getPost());
        } catch (error) {
            console.error(error);
        }
    }
);