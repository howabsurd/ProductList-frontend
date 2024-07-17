import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: JSON.parse(localStorage.getItem('user')) || null,
  status: 'idle',
  error: null
}

export const LoginUser = createAsyncThunk(
  "user/login",
  async (userCredentials) => {
    const response = await axios.post("http://localhost:4800/api/login", userCredentials);
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  }
);

export const SignupUser = createAsyncThunk(
  "user/signup",
  async (userCredentials) => {
    const response = await axios.post("http://localhost:4800/api/signup", userCredentials);
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
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
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(SignupUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(SignupUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data =action.payload;
      })
      .addCase(SignupUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { loadUserFromStorage, logout } = userSlice.actions;

export default userSlice.reducer;
