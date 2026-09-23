import { secondTimestampToDate } from "@/services";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pendingTeacherStuffApplications: {
    reservedData: [],
    data: [],
  },
  approvedteacherStuffApplications: {
    data: [],
  },
  rejectedteacherStuffApplications: {
    data: [],
  },
  pendingStudentApplications: {
    reservedData: [],
    data: [],
  },
  approvedstudentApplications: {
    data: [],
  },
  rejectedstudentApplications: {
    data: [],
  },
};

const leaveManagementSlice = createSlice({
  name: "leaveManagement",
  initialState,
  reducers: {
    setPendingTeacherStuffApplications(state, action) {
      const leaveData = action.payload?.map((item) => ({
        ...item,
        _id: item?._id,
        id: item?.teacher_id?.username,
        name: item?.teacher_id?.full_name,
        application_date: secondTimestampToDate(item?.createdAt),
      }));

      state.pendingTeacherStuffApplications.data = leaveData;
      state.pendingTeacherStuffApplications.reservedData = leaveData; // keeping a copy of the total data
    },
    removeTeacherStuffApplicationFromPendingList: (state, action) => {
      const { id } = action.payload;
      state.pendingTeacherStuffApplications.data =
        state.pendingTeacherStuffApplications.data.filter(
          (item) => item._id !== id
        );
    },
    setApprovedTeacherStuffApplications(state, action) {
      state.approvedteacherStuffApplications.data = action.payload?.map(
        (item) => ({
          ...item,
          _id: item?._id,
          id: item?.teacher_id?.username,
          name: item?.teacher_id?.full_name,
          application_date: secondTimestampToDate(item?.createdAt),
        })
      );
    },
    setRejectedTeacherStuffApplications(state, action) {
      state.rejectedteacherStuffApplications.data = action.payload?.map(
        (item) => ({
          ...item,
          _id: item?._id,
          id: item?.teacher_id?.username,
          name: item?.teacher_id?.full_name,
          application_date: secondTimestampToDate(item?.createdAt),
        })
      );
    },

    setPendingStudentApplications(state, action) {
      const leaveData = action.payload?.map((item) => ({
        ...item,
        _id: item?._id,
        id: item?.student_id?.username,
        name: item?.student_id?.name_english,
        application_date: secondTimestampToDate(item?.createdAt),
      }));

      state.pendingStudentApplications.data = leaveData;
      state.pendingStudentApplications.reservedData = leaveData; // keeping a copy of the total data
    },
    removeStudentApplicationFromPendingList: (state, action) => {
      const { id } = action.payload;
      state.pendingStudentApplications.data =
        state.pendingStudentApplications.data.filter((item) => item._id !== id);
    },
    setApprovedStudentApplications(state, action) {
      state.approvedstudentApplications.data = action.payload?.map((item) => ({
        ...item,
        _id: item?._id,
        id: item?.student_id?.username,
        name: item?.student_id?.name_english,
        application_date: secondTimestampToDate(item?.createdAt),
      }));
    },
    setRejectedStudentApplications(state, action) {
      state.rejectedstudentApplications.data = action.payload?.map((item) => ({
        ...item,
        _id: item?._id,
        id: item?.student_id?.username,
        name: item?.student_id?.name_english,
        application_date: secondTimestampToDate(item?.createdAt),
      }));
    },
  },
});

export const {
  setPendingTeacherStuffApplications,
  removeTeacherStuffApplicationFromPendingList,
  setApprovedTeacherStuffApplications,
  setRejectedTeacherStuffApplications,

  setPendingStudentApplications,
  removeStudentApplicationFromPendingList,
  setApprovedStudentApplications,
  setRejectedStudentApplications,
} = leaveManagementSlice.actions;
export default leaveManagementSlice.reducer;
