import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allDays: null,
};

const daysSlice = createSlice({
  name: "days",
  initialState,
  reducers: {
    setDays: (state, action) => {
      state.allDays = action.payload;
    },
  },
});

export const { setDays } = daysSlice.actions;
export default daysSlice.reducer;
