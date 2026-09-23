import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sectionList: [],
};

const sectionSlice = createSlice({
  name: "sections",
  initialState,
  reducers: {
    setSections: (state, action) => {
      const sectionItemMap = new Map();
      action.payload.forEach((sectionItem) => {
        sectionItemMap.set(sectionItem?.section_name, sectionItem);
      });

      state.sectionList = action.payload;
    },
  },
});

export const { setSections } = sectionSlice.actions;
export default sectionSlice.reducer;
