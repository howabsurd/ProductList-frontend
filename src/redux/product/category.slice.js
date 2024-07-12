import  {createSlice}  from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
    data : [],
    status: 'idle',
  error: null
}


export const updateCategory = createAsyncThunk("category/updateCategory", async (data)=>{
  console.log(data, "use Data")
  const response = await axios.put(`http://localhost:4700/api/category/${data.category_id}`, data)
  return response.data;
})

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (data) => {
    const response = await axios.post("http://localhost:4700/api/category/new", data);
    return response.data;
  }
); 

export const fetchCategory = createAsyncThunk(
    "category/fetchCategory",
    async () => {
      const response = await axios.get("http://localhost:4700/api/category/all");
      return response.data;
    }
  ); 

export const deleteCategory = createAsyncThunk("category/deleteCategory", async(data)=>{
    const response = await axios.delete(`http://localhost:4700/api/category/${data}`)
    return response.data;
})

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
            state.data = action.payload.category;
          })
          .addCase(fetchCategory.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          });

          builder
          .addCase(deleteCategory.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(deleteCategory.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = state.data.filter(category => category.category_id !== action.payload.category.category_id);
          })
          .addCase(deleteCategory.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          });
          builder
          .addCase(createCategory.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(createCategory.fulfilled, (state, action) => {
            state.status = 'succeeded';
            console.log(action.payload);
            state.data.push(action.payload.category);
          })
          .addCase(createCategory.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          });
          builder
          .addCase(updateCategory.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(updateCategory.fulfilled, (state, action) => {
            state.status = 'succeeded';
            console.log("actions", action.payload.category.category_id)
            console.log(state, "state data")
            state.data = state.data.map((ele) =>
              ele.category_id === action.payload.category.category_id ? action.payload.category : ele
          );
          })
          .addCase(updateCategory.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          });

}})

export default categoryReducer.reducer

