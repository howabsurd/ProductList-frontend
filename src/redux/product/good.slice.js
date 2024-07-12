import  {createSlice}  from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
    data : [],
    status: 'idle',
  error: null
}


export const updateGood = createAsyncThunk("Good/updateGood", async (data)=>{
  console.log(data, "use Data")
  const response = await axios.put(`http://localhost:4700/api/good/${data.typeid}`, data)
  return response.data;
})

export const createGood = createAsyncThunk(
  "Good/createGood",
  async (data) => {
    const response = await axios.post("http://localhost:4700/api/good/new", data);
    return response.data;
  }
); 

export const fetchGood = createAsyncThunk(
    "Good/fetchGood",
    async () => {
      const response = await axios.get("http://localhost:4700/api/good/all");
      return response.data;
    }
  ); 

export const deleteGood = createAsyncThunk("Good/deleteGood", async(data)=>{
  console.log("delete ID :", data)
    const response = await axios.delete(`http://localhost:4700/api/good/${data}`)
    return response.data;
})

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
            state.data = action.payload.good;
          })
          .addCase(fetchGood.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          });

          builder
          .addCase(deleteGood.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(deleteGood.fulfilled, (state, action) => {
            state.status = 'succeeded';
            console.log("delete data goods", action.payload.typeOfGood.typeid);
            state.data = state.data.filter(good => good.typeid !== action.payload.typeOfGood.typeid);
          })
          .addCase(deleteGood.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          });
          builder
          .addCase(createGood.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(createGood.fulfilled, (state, action) => {
            state.status = 'succeeded';
            console.log(action.payload);
            state.data.push(action.payload.good);
          })
          .addCase(createGood.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          });
          builder
          .addCase(updateGood.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(updateGood.fulfilled, (state, action) => {
            state.status = 'succeeded';
            console.log("actions", action.payload.good.typeid)
            console.log(state, "state data")
            state.data = state.data.map((ele) =>
              ele.typeid === action.payload.good.typeid ? action.payload.good : ele
          );
          })
          .addCase(updateGood.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          });

}})

export default goodReducer.reducer
