import  {createSlice}  from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
    data : [],
    status: 'idle',
  error: null
}

export const fetchProducts = createAsyncThunk(
    "product/fetchProducts",
    async () => {
      const response = await axios.get("http://localhost:4700/api/product/all");
      return response.data;
    }
  ); 

const productReducer = createSlice({
    name : "product",
    initialState,
    reducers : {
        
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchProducts.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
          })
          .addCase(fetchProducts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          });
}})

export default productReducer.reducer

