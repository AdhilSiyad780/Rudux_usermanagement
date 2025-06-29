import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from './authAPI'

export const login = createAsyncThunk(
  'auth/login',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post('login/', formData);
      localStorage.setItem('token', res.data.access);
      return res.data; // ✅ this should include is_admin
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const register = createAsyncThunk('auth/register', async (userData) => {
  const res = await api.post(`register/`, userData);
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
      state.isAdmin = false;  // <-- Reset this too

      localStorage.removeItem('token');
      localStorage.removeItem('is_admin');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.access;
        state.isAdmin = action.payload.is_superuser;
        localStorage.setItem('token', action.payload.access);
        localStorage.setItem('is_admin', action.payload.is_superuser); // ✅ same here

      })
      .addCase(register.fulfilled, () => {});
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
