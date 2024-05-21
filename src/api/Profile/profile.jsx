import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../../utils/axiosRequest";


export const getProfileById = createAsyncThunk ( "profile/userProfile" , async function ( id ) {
    try {
        let { data } = await axiosRequest . get ( `UserProfile/get-user-profile-by-id?id=${id}`)
        return data.data
    } catch (error) {
        console.log(error);
    }
})

export const GetPostByUser = createAsyncThunk ( "profile/GetPostByUser" , async function ( id ) {
    try {
        let { data } = await axiosRequest . get ( `Post/get-posts?UserId=${id}`)
        return data.data
    } catch (error) {
        console.log(error);
    }
})

export const deletePost = createAsyncThunk ( "profile/deletePost" , async function ( postId , {dispatch}) {
    try {
        let { data } = await axiosRequest . delete ( `Post/delete-post?id=${postId}`)
    } catch (error) {
        console.log(error);
    }
    dispatch ( GetPostByUser())
    
})

export const FollowerUser = createAsyncThunk ( "profile/FollowerUser" , async function ( id , { dispatch }) {
    try {
        let { data } = await axiosRequest . post ( `FollowingRelationShip/add-following-relation-ship?followingUserId=${id}`)
        console.log( data );
    } catch (error) {
        console.log(error);
    }
    dispatch ( GetPostByUser () )
})

export const FollowDelete = createAsyncThunk ( "profile/FollowDelete" , async function ( id , { dispatch }) { 
    try {
        let { data } = await axiosRequest . delete ( `FollowingRelationShip/delete-following-relation-ship?id=${id}`)
    } catch (error) {
        console.log(error);
    }
    dispatch ( GetPostByUser () )
})