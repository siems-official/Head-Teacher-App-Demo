import { createSlice } from "@reduxjs/toolkit";

const initaialState = {};

const commonSlice = createSlice({
  name: "common",
  initialState: initaialState,
  reducers: {},
});

export const {} = commonSlice.actions;
export default commonSlice.reducer;
