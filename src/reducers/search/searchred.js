import { createSlice } from "@reduxjs/toolkit";
import { Getsearch, getData } from "../../pages/search/search";
import { searchHistory } from "../../pages/search/search";

const searchred = createSlice({
  name: "searchred",
  initialState: {
    infoData : [],
    isLoading: false,
    inpSearch : "",
    searchData:[]
  },
  reducers: { 
    
    handleChange : ( state , action ) => {
      state [ action . payload . type ] = action . payload . settype
    }
  },
  
  extraReducers : ( builder ) => {
    builder.addCase ( getData . pending, ( state , action ) => {
      state.isLoading = true
    })
    builder.addCase ( getData . fulfilled, ( state , action ) => {
      state.infoData = action.payload
      state.isLoading = false
    })

    builder.addCase ( Getsearch . fulfilled, ( state , action ) => {
      state.searchData = action.payload
      state.isLoading = false
    })
  }
});

export const { infoData , handleChange } = searchred.actions;
export default searchred.reducer;
