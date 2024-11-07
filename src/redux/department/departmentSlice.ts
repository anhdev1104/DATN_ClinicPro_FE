import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  openUpdateDepartment: boolean;
}

const initialState: InitialState = {
  openUpdateDepartment: false,
};

export const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {
    setOpenUpdateDepartment: (state, action: PayloadAction<boolean>) => {
      state.openUpdateDepartment = action.payload;
    },
  },
});

export const { setOpenUpdateDepartment } = departmentSlice.actions;
