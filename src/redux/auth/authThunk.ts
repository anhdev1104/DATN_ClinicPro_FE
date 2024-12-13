import { loginService } from '@/services/loginAuth.service';
import { IAccount } from '@/types/auth.type';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const loginAuth = createAsyncThunk('auth/login', async (data: IAccount, thunkAPI) => {
  try {
    const auth = await loginService(data);
    return auth;
  } catch (error) {
    thunkAPI.rejectWithValue(error);
  }
});
