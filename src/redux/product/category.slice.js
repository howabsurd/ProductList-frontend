import  {createSlice}  from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
    data : [],
    status: 'idle',
  error: null
}

export const fetchCategory = createAsyncThunk(
    "product/fetchCategory",
    async () => {
      const response = await axios.get("http://localhost:4700/api/category/all");
      return response.data;
    }
  ); 

const categoryReducer = createSlice({
    name : "category",
    initialState,
    reducers : {
        
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchCategory.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchCategory.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
          })
          .addCase(fetchCategory.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          });
}})

export default categoryReducer.reducer

