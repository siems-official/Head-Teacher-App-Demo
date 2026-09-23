import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allTeachers: null,
};

export const teachersSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {
    setAllTeachers: (state, action) => {
      state.allTeachers = action.payload;
    },
  },
});

export const { setAllTeachers } = teachersSlice.actions;
export default teachersSlice.reducer;
