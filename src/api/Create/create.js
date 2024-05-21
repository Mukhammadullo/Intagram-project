import { axiosRequest } from "../../utils/axiosRequest";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getPost } from "../Home/home";

export let addNewPost = createAsyncThunk(
    "create/addNewPost",
    async function (form, { dispatch }) {
        console.log(form);
        try {
            let { data } = await axiosRequest.post("Post/add-post", form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            dispatch(getPost())
        } catch (error) {
            console.error(error);
        }
    });
export const getpost = createAsyncThunk(
    "post/getpost",
    async function () {
        try {
            const { data } = await axiosRequest.get("User/get-users")
            return data.data
        } catch (error) {
            console.log(error);
        }
    }
)


export const getAvatarById = createAsyncThunk(
    "create/getAvatarById",
    async (id, { dispatch }) => {
        try {
            let { data } = await axiosRequest.get(
                `UserProfile/get-user-profile-by-id?id=${id}`
            );
            dispatch(getpost());
            return data.data;
        } catch (error) {
            console.log(error);
        }
    }
);
