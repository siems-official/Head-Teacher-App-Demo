import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  classList: [],
};

const classesSlice = createSlice({
  name: "classes",
  initialState,
  reducers: {
    setClasses: (state, action) => {
      state.classList = action.payload;
    },
  },
});

export const { setClasses } = classesSlice.actions;
export default classesSlice.reducer;
