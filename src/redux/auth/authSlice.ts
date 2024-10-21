import { createSlice } from '@reduxjs/toolkit';
import { loginAuth } from './authThunk';
import { IUser } from '@/types/user.type';

type authState = {
  data: IUser | null;
  isLoading: boolean;
  error?: string | null;
};

const initialState: authState = {
  data: null,
  isLoading: false,
  error: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authLogout: state => {
      state.data = null;
    },
    refreshToken: (state, action) => {
      state.data = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loginAuth.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(loginAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export const { authLogout, refreshToken } = authSlice.actions;
export default authSlice.reducer;
