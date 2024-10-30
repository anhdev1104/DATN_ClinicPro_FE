import { Department } from '@/types/department.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  isOpenNewDepartment: boolean;
  isOpenDepartmentDetail: boolean;
  departmentDetail: Department | null;
}

const initialState: InitialState = {
  isOpenNewDepartment: false,
  isOpenDepartmentDetail: false,
  departmentDetail: null,
};

export const departmentSlice = createSlice({
  name: 'departmentState',
  initialState,
  reducers: {
    PopupNewDepartment: (state, action: PayloadAction<boolean>) => {
      state.isOpenNewDepartment = action.payload;
    },
    PopupDepartmentDetail: (state, action: PayloadAction<boolean>) => {
      state.isOpenDepartmentDetail = action.payload;
    },
  },
});

export const { PopupNewDepartment, PopupDepartmentDetail } = departmentSlice.actions;

export default departmentSlice.reducer;
