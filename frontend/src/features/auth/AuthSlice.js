import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/';

export const login = createAsyncThunk('auth/login', async (userData) => {
  const res = await axios.post(`${BASE_URL}login/`, userData);
  return res.data;
});

export const register = createAsyncThunk('auth/register', async (userData) => {
  const res = await axios.post(`${BASE_URL}register/`, userData);
  return res.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null,
    isAdmin: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.access;
        state.isAdmin = action.payload.is_admin;
        localStorage.setItem('token', action.payload.access);
      })
      .addCase(register.fulfilled, () => {});
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
