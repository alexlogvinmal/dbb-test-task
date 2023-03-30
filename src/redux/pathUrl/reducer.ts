import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  url: [
    { name: 'Main', path: '' },
  ]
}

export const pathUrlSlice = createSlice({
  name: 'url',
  initialState,
  reducers: {
    addPathUrl: (state, action) => {

      state.url.push(action.payload)
    },
    delPathUrl: (state, action) => {
      state.url = state.url.filter(item => item.path.length <= action.payload);
    }
  }
})

export const { addPathUrl, delPathUrl } = pathUrlSlice.actions
export const pathUrlReducer = pathUrlSlice.reducer




