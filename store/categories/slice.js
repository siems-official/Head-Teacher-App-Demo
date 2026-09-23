import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allCategories: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategoriesData: (state, action) => {
      state.allCategories = action.payload;
    },
  },
});

export const { setCategoriesData } = categoriesSlice.actions;
export default categoriesSlice.reducer;
