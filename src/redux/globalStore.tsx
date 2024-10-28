import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface State {
  loading: boolean;
}
const initialState: State = {
  loading: false
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setGlobalState(state, action: PayloadAction<Partial<State>>) {
      Object.assign(state, action.payload);
    }
  }
});

export const { setGlobalState } = globalSlice.actions;
