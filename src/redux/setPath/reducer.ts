import { createSlice } from "@reduxjs/toolkit";


interface RootState {
  path: string;
}

const initialState: RootState = {
  path: '',
};

export const setPathSlice = createSlice({
  name: 'path',
  initialState,
  reducers: {
    setPath: (state, action) => {
      state.path = action.payload;
    }
  }
})

export const { setPath } = setPathSlice.actions
export const setPathReducer = setPathSlice.reducer
