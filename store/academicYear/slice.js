import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  academicYearList: [],
  selectedYear: null,
};

const academicYearSlice = createSlice({
  name: "academicYear",
  initialState,
  reducers: {
    setAcademicYearList: (state, action) => {
      state.academicYearList = [...(action.payload ?? [])].sort((a, b) => {
        const getYear = (yearStr) => {
          const match = yearStr.match(/\d{4}/); // grabs first 4-digit year
          return match ? parseInt(match[0]) : 0;
        };

        return (
          getYear(b.global_academic_year) - getYear(a.global_academic_year)
        );
      });
    },
    setSelectedYear: (state, action) => {
      state.selectedYear = action.payload;
    },
  },
});

export const { setAcademicYearList, setSelectedYear } =
  academicYearSlice.actions;
export default academicYearSlice.reducer;
