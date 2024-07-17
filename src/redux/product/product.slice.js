import  {createSlice}  from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { env, backendURI } from "../../config/keys";



const initialState = {
    data : [],
    status: 'idle',
  error: null
}

export const fetchProducts = createAsyncThunk(
    "product/fetchProducts",
    async () => {
      const response = await axios.get(`${backendURI[env]}/api/product/all`);
      return response.data;
    }
  ); 


  export const createProduct = createAsyncThunk(
    "product/createProducts",
    async (data) => {
      const response = await axios.post(`${backendURI[env]}/api/product/new`, {...data, costPrice : parseInt(data.costPrice), sellingPrice : parseInt(data.sellingPrice) , "images": { 
        "main": "https://example.com/image.jpg",
        "additional": ["https://example.com/image2.jpg", "https://example.com/image3.jpg"]
      },
      "createdAt": "2024-07-05T08:00:00Z",
      "attributes": {
        "color": "Red",
        "size": "Large"
      }});
      console.log(response.data)
      return response.data;
    }
  ); 


  export const deleteProduct = createAsyncThunk("product/deleteProduct", async(data)=>{
    const response = await axios.delete(`${backendURI[env]}/api/product/${data}`);
    return response.data;
  })

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
            state.data = action.payload.product;
          })
          .addCase(fetchProducts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          });
          builder
          .addCase(createProduct.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(createProduct.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data.push(action.payload.product);
          })
          .addCase(createProduct.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          });
          builder
          .addCase(deleteProduct.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(deleteProduct.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = state.data.filter(product => product.id !== action.payload.product.id);
          })
          .addCase(deleteProduct.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          });
}})

export default productReducer.reducer

