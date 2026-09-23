import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  instituteDetails: null,
};

const instituteSlice = createSlice({
  name: "institute",
  initialState,
  reducers: {
    setInstituteDetails: (state, action) => {
      state.instituteDetails = action.payload;
    },
  },
});

export const { setInstituteDetails } = instituteSlice.actions;
export default instituteSlice.reducer;
