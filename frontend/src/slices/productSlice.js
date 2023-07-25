import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: 'product',
  initialState: {
    colorVersion:0,
  },
  reducers: {
    setColorVersion: (state, action) => {
      state.colorVersion = action.payload
    }
  }
});

export const { setColorVersion } = productSlice.actions;
export default productSlice.reducer;