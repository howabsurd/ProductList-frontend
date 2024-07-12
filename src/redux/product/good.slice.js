import  {createSlice}  from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
    data : [],
    status: 'idle',
  error: null
}

export const fetchGood = createAsyncThunk(
    "product/fetchGood",
    async () => {
      const response = await axios.get("http://localhost:4700/api/good/all");
      return response.data;
    }
  ); 

const goodReducer = createSlice({
    name : "good",
    initialState,
    reducers : {
        
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchGood.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchGood.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
          })
          .addCase(fetchGood.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          });
}})

export default goodReducer.reducer

