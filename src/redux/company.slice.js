import  {createSlice}  from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendURI, env } from "../config/keys";



const initialState = {
    data : [],
    status: 'idle',
  error: null
}


export const updateCompany = createAsyncThunk("company/updateCompany", async (data)=>{
  console.log(data, "use Data")
  const response = await axios.put(`${backendURI[env]}/api/company/${data.company_id}`, data)
  return response.data;
})

export const createCompany = createAsyncThunk(
  "company/createCompany",
  async (data) => {
    const response = await axios.post(`${backendURI[env]}/api/company/new`, data);
    return response.data;
  }
); 

export const fetchCompany = createAsyncThunk(
    "company/fetchCompany",
    async () => {
      const response = await axios.get(`${backendURI[env]}/api/company/all`);
      return response.data;
    }
  ); 

export const deleteCompany = createAsyncThunk("company/deleteCompany", async(data)=>{
    const response = await axios.delete(`${backendURI[env]}/api/company/${data}`)
    return response.data;
})

const companyReducer = createSlice({
    name : "company",
    initialState,
    reducers : {
        
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchCompany.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchCompany.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload.company;
          })
          .addCase(fetchCompany.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          });

          builder
          .addCase(deleteCompany.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(deleteCompany.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = state.data.filter(company => company.company_id !== action.payload.company.company_id);
          })
          .addCase(deleteCompany.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          });
          builder
          .addCase(createCompany.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(createCompany.fulfilled, (state, action) => {
            state.status = 'succeeded';
            console.log(action.payload);
            state.data.push(action.payload);
          })
          .addCase(createCompany.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          });
          builder
          .addCase(updateCompany.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(updateCompany.fulfilled, (state, action) => {
            state.status = 'succeeded';
            console.log("actions", action.payload.company.company_id)
            console.log(state, "state data")
            state.data = state.data.map((ele) =>
              ele.company_id === action.payload.company.company_id ? action.payload.company : ele
          );
          })
          .addCase(updateCompany.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          });

}})

export default companyReducer.reducer

