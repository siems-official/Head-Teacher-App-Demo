import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todaysRoutines: null,
  classList: null,
};

const routinesSlice = createSlice({
  name: "routines",
  initialState,
  reducers: {
    setTodaysRoutines: (state, action) => {
      state.todaysRoutines = action.payload;
    },
    setClassList: (state, action) => {
      const seen = new Set();

      const uniqueList = action.payload.filter((item) => {
        const classId = item.local_class_id?._id;
        const sectionId = item.section_id?._id;
        const subjectId = item.subjects?.[0]?.subject_id?._id || "no-subject";

        const key = `${classId}_${sectionId}_${subjectId}`;

        if (seen.has(key)) return false;

        seen.add(key);
        return true;
      });

      state.classList = uniqueList;
    },
  },
});

export const { setTodaysRoutines, setClassList } = routinesSlice.actions;
export default routinesSlice.reducer;
