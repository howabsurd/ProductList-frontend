import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {env, authURI} from "../config/keys"

const initialState = {
  data: JSON.parse(localStorage.getItem('user')) || null,
  status: 'idle',
  error: null
}

export const LoginUser = createAsyncThunk(
  "user/login",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${authURI[env]}/api/login`, userCredentials);
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        return rejectWithValue(err.response.data.error);
      }
      return rejectWithValue(err.message);
    }
  }
);

export const SignupUser = createAsyncThunk(
  "user/signup",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${authURI[env]}/api/signup`, userCredentials);
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        return rejectWithValue(err.response.data.error);
      }
      return rejectWithValue(err.message);
    }
  }
);


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUserFromStorage(state) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        state.data = user;
        state.status = 'succeeded';
      }
    },
    logout(state) {
      localStorage.removeItem('user');
      state.data = null;
      state.status = 'idle';
    },
    clearError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(SignupUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(SignupUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(SignupUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  }
});

export const { loadUserFromStorage, logout, clearError } = userSlice.actions;

export default userSlice.reducer;

