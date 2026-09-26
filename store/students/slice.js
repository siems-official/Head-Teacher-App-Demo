import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterYear: "",
  filterClass: "",
  filterSection: "",
  filterCategory: "",

  allStudents: [],
  studentList: [],

  searchRoll: "",
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setFilterYear: (state, action) => {
      state.filterYear = action.payload;
    },
    setFilterClass: (state, action) => {
      state.filterClass = action.payload;
    },
    setFilterSection: (state, action) => {
      state.filterSection = action.payload;
    },
    setFilterCategory: (state, action) => {
      state.filterCategory = action.payload;
    },
    setStudents: (state, action) => {
      state.allStudents = Array.isArray(action.payload) ? action.payload : [];
      state.studentList = state.allStudents.map((item) => ({
        _id: item?._id,
        class: item?.current_class?.local_class_name,
        roll: item?.current_roll_number,
        name: item?.name_english,
        image: item?.image,
        phone: item?.mobile_number,
        email: item?.email,
      }));
    },
    setSearchRoll: (state, action) => {
      state.searchRoll = action.payload;

      if (action.payload === "") {
        // reset if input is cleared
        state.studentList = state.allStudents.map((item) => ({
          _id: item?._id,
          class: item?.current_class?.local_class_name,
          roll: item?.current_roll_number,
          name: item?.name_english,
          image: item?.image,
          phone: item?.mobile_number,
          email: item?.email,
        }));
      } else {
        state.studentList = state.allStudents
          .filter((item) =>
            item.current_roll_number?.toString().startsWith(action.payload)
          )
          .map((item) => ({
            _id: item?._id,
            class: item?.current_class?.local_class_name,
            roll: item?.current_roll_number,
            name: item?.name_english,
            image: item?.image,
            phone: item?.mobile_number,
            email: item?.email,
          }));
      }
    },
  },
});

export const {
  setFilterYear,
  setFilterClass,
  setFilterSection,
  setFilterCategory,
  setStudents,
  setSearchRoll,
} = studentSlice.actions;
export default studentSlice.reducer;
