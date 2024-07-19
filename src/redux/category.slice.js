import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendURI, env } from "../config/keys";

const initialState = {
  data: [],
  status: 'idle',
  error: null
};

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${backendURI[env]}/api/category/${data.category_id}`, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.err);
    }
  }
);

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${backendURI[env]}/api/category/new`, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.err);
    }
  }
);

export const fetchCategory = createAsyncThunk(
  "category/fetchCategory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backendURI[env]}/api/category/all`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.err);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${backendURI[env]}/api/category/${data}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.err);
    }
  }
);


const categoryReducer = createSlice({
  name: "category",
  initialState,
  reducers: {},
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
        state.error = action.payload ? action.payload.error : action.error.message;
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
        state.error = action.payload ? action.payload.error : action.error.message;
      });

    builder
      .addCase(createCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data.push(action.payload.category);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? action.payload.error : action.error.message;
      });

    builder
      .addCase(updateCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = state.data.map((ele) =>
          ele.category_id === action.payload.category.category_id ? action.payload.category : ele
        );
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? action.payload.error : action.error.message;
      });
  }
});

export default categoryReducer.reducer;


