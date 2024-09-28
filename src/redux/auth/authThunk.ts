import { loginService } from '@/services/auth.service';
import { IAccount } from '@/types/auth.type';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const loginAuth = createAsyncThunk('auth/login', async (data: IAccount, thunAPI) => {
  try {
    const auth = await loginService(data);
    return auth;
  } catch (error) {
    console.log('Error thunkAPI', error);
    thunAPI.rejectWithValue(error);
  }
});
