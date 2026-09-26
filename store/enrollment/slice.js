import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  studentEnrollableList: {},
  enrollCount: {},
  subjectwiseEnrollList: {},

  // ALL STUDENTS ENROLL LIST BASED ON SECTION
  sectionAllStudents: {},
  enrollListForSectionStudents: {},
};

const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState,
  reducers: {
    // SET ENROLLABLE LIST
    setEnrollableList: (state, action) => {
      const {
        enrollList: studentList,
        class_id,
        section_id,
        subject_id,
      } = action.payload;

      const uniqueKey = `${class_id}-${section_id}-${subject_id}`;

      state.studentEnrollableList[uniqueKey] = studentList?.map((student) => ({
        ...student,
        _id: student?._id,
        name: student?.name_english,
        roll: student?.current_roll_number || "N/A",
        enrollStatus: true,
      }));
      state.enrollCount[uniqueKey] = studentList?.length || 0;
    },

    // ADD SINGLE ENROLL
    addSingleEnroll: (state, action) => {
      const { student, class_id, section_id, subject_id } = action.payload;

      const uniqueKey = `${class_id}-${section_id}-${subject_id}`;

      if (!state.studentEnrollableList[uniqueKey]) {
        state.studentEnrollableList[uniqueKey] = [];
      }
      state.studentEnrollableList[uniqueKey].push({
        ...student,
        _id: student?._id,
        name: student?.name_english,
        roll: student?.current_roll_number || "N/A",
        enrollStatus: true,
      });
      state.enrollCount[uniqueKey] =
        state.studentEnrollableList[uniqueKey].length;
    },

    // REMOVE SINGLE ENROLL
    removeSingleEnroll: (state, action) => {
      const { id, class_id, section_id, subject_id } = action.payload;

      const uniqueKey = `${class_id}-${section_id}-${subject_id}`;

      state.studentEnrollableList[uniqueKey] = state.studentEnrollableList?.[
        uniqueKey
      ]?.filter((student) => id !== student?._id) || [];
      state.enrollCount[uniqueKey] =
        state.studentEnrollableList[uniqueKey].length;
    },

    // UPDATE SINGLE ENROLL
    updateSingleEnroll: (state, action) => {
      const { id, value, class_id, section_id, subject_id } = action.payload;

      const uniqueKey = `${class_id}-${section_id}-${subject_id}`;

      state.studentEnrollableList[uniqueKey] = state.studentEnrollableList?.[
        uniqueKey
      ]?.map((student) =>
        student._id === id ? { ...student, enrollStatus: value } : student
      );
      state.enrollCount[uniqueKey] = state.studentEnrollableList?.[
        uniqueKey
      ]?.filter((student) => student.enrollStatus === true)?.length;
    },

    // UPDATE ALL ENROLL
    updateAllEnroll: (state, action) => {
      const { value, data, class_id, section_id, subject_id } = action.payload;

      const uniqueKey = `${class_id}-${section_id}-${subject_id}`;

      state.studentEnrollableList[uniqueKey] =
        value === true
          ? data?.map((student) => ({ ...student, enrollStatus: true }))
          : [];
      state.enrollCount[uniqueKey] =
        value === true ? state.studentEnrollableList?.[uniqueKey]?.length : 0;
    },

    // SET SUBJECT WISE ENROLL LIST
    setSubjectWiseEnrollList: (state, action) => {
      const {
        enrollList: studentList,
        class_id,
        section_id,
        subject_id,
      } = action.payload;

      state.subjectwiseEnrollList[`${class_id}-${section_id}-${subject_id}`] =
        studentList?.map((student) => ({
          ...student,
          _id: student?._id,
          name: student?.name_english,
          roll: student?.current_roll_number || "N/A",
          cq: null,
          mcq: null,
          practical: null,
          attendance: null,
          ct: null,
          total: null,
        }));
    },

    // UPDATE SUBJECT WISE MARKS
    updateSubjectWiseMarks: (state, action) => {
      const { type, value, uniqueKey, studentId } = action.payload;

      const currentList = state.subjectwiseEnrollList?.[uniqueKey] ?? [];

      const updatedList = currentList.map((student) => {
        if (student._id !== studentId) return student;

        // Get the updated values depending on which type is being changed
        const updatedCq =
          type === "cq" ? Number(value) || 0 : Number(student.cq) || 0;
        const updatedMcq =
          type === "mcq" ? Number(value) || 0 : Number(student.mcq) || 0;
        const updatedPractical =
          type === "practical"
            ? Number(value) || 0
            : Number(student.practical) || 0;
        const updatedAttendance =
          type === "attendance"
            ? Number(value) || 0
            : Number(student.attendance) || 0;
        const updatedCt =
          type === "ct" ? Number(value) || 0 : Number(student.ct) || 0;

        return {
          ...student,
          [type]: Number(value) || 0,
          total:
            updatedCq +
            updatedMcq +
            updatedPractical +
            updatedAttendance +
            updatedCt,
        };
      });

      state.subjectwiseEnrollList[uniqueKey] = updatedList;
    },

    // ALL STUDENTS ENROLL LIST BASED ON SECTION
    setSectionAllStudents: (state, action) => {
      const { students, class_id, section_id, subject_id } = action.payload;
      state.sectionAllStudents[`${class_id}-${section_id}-${subject_id}`] =
        students;
    },
    setEnrollListForSectionStudent: (state, action) => {
      const { enrollList, class_id, section_id, subject_id } = action.payload;

      state.enrollListForSectionStudents[
        `${class_id}-${section_id}-${subject_id}`
      ] = state.sectionAllStudents?.[
        `${class_id}-${section_id}-${subject_id}`
      ]?.map((student) => {
        const enroll = enrollList?.find((enroll) => enroll._id === student._id);
        return enroll
          ? {
              ...student,
              enrollStatus: true,
              name: enroll?.name || student?.name_english,
              roll: enroll?.roll || student?.current_roll_number || "N/A",
            }
          : {
              ...student,
              enrollStatus: false,
              name: student?.name_english,
              roll: student?.current_roll_number || "N/A",
            };
      });
    },
    updateSingleEnrollForSectionStudent: (state, action) => {
      const { id, value, class_id, section_id, subject_id } = action.payload;
      state.enrollListForSectionStudents[
        `${class_id}-${section_id}-${subject_id}`
      ] = state.enrollListForSectionStudents?.[
        `${class_id}-${section_id}-${subject_id}`
      ]?.map((student) =>
        student._id === id ? { ...student, enrollStatus: value } : student
      );
    },
    updateAllEnrollForSectionStudent: (state, action) => {
      const { value, class_id, section_id, subject_id } = action.payload;
      state.enrollListForSectionStudents[
        `${class_id}-${section_id}-${subject_id}`
      ] =
        value === true
          ? state.enrollListForSectionStudents?.[
              `${class_id}-${section_id}-${subject_id}`
            ]?.map((student) => ({
              ...student,
              enrollStatus: true,
            }))
          : state.enrollListForSectionStudents?.[
              `${class_id}-${section_id}-${subject_id}`
            ]?.map((student) => ({
              ...student,
              enrollStatus: false,
            }));
    },
  },
});

export const {
  setEnrollableList,
  addSingleEnroll,
  removeSingleEnroll,
  updateSingleEnroll,
  updateAllEnroll,
  setEnrolledList,
  setSubjectWiseEnrollList,
  updateSubjectWiseMarks,

  // ALL STUDENTS ENROLL LIST
  setSectionAllStudents,
  setEnrollListForSectionStudent,
  updateSingleEnrollForSectionStudent,
  updateAllEnrollForSectionStudent,
} = enrollmentSlice.actions;
export default enrollmentSlice.reducer;
