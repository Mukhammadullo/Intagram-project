import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosRequest } from "../../utils/axiosRequest";

export const getData = createAsyncThunk ( "search/getData" , async function ( _, {getState}) {
    console.log(getState().searchred.inpSearch);
    try {
        let { data } = await axiosRequest. get ( `User/get-users?UserName=${getState().searchred.inpSearch}` )
        return data.data
    } catch (error) {
        console.log(error);
    }
})


export const searchHistory = createAsyncThunk ( "search/searchHistory" , async function ( id , {dispatch} ) {
    try {
        let { data } = await axiosRequest . post ( `SearchHistory/add-user-search-history?UserSearchId=${id}`)
    dispatch ( getData ())

    } catch (error) {
        console.log(error);
    }
})

export const Getsearch = createAsyncThunk ( "search/searchData" , async function ( ) {
    try {
        let { data } = await axiosRequest.get ( `SearchHistory/get-user-search-histories`)
        return data.data
    } catch (error) {
        console.log(1);
        console.log(error);
    }
})

export const deleteSearch = createAsyncThunk ( "search/deleteSearch" , async function ( id , { dispatch } ) {
    try {
        let { data } = await axiosRequest . delete ( `SearchHistory/delete-user-search-history?id=${id}`)
        dispatch ( Getsearch () )
    } catch (error) {
        console.log(error);
    }
})