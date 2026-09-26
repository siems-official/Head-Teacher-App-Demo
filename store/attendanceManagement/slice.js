import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  attendanceList: {},
  attendanceExistingList: null,
  totalStudents: {},
  present: {},
  absent: {},
  onLeave: {},
  presentCount: {},
};

const attendanceManagementSlice = createSlice({
  name: "attendanceManagement",
  initialState,
  reducers: {
    setAttendanceList: (state, action) => {
      const {
        enrollList: studentsData,
        class_id,
        section_id,
        period_id,
        subject_id,
        group_id,
      } = action.payload;

      // UNIQUE KEY
      const uniqueKey = `${class_id}-${section_id}-${period_id}-${subject_id}`;

      const rows = studentsData?.map((student, index) => {
        return {
          _id: student?._id,
          name: student?.name_english,
          roll: student?.current_roll_number || "N/A",
          attendanceStatus: "absent",
        };
      });
      state.attendanceList[uniqueKey] = rows;
      state.totalStudents[uniqueKey] = rows?.length || 0;
      state.present[uniqueKey] = 0; //as initially everyone will be absent
      state.absent[uniqueKey] = rows?.length || 0; //as initially everyone will be absent
      state.onLeave[uniqueKey] =
        studentsData?.filter((student) => student?.status === "leave")
          ?.length || 0;
      state.presentCount[uniqueKey] = 0;
    },

    // SET ATTENDANCE STATUS
    setAttendanceStatus: (state, action) => {
      const { studentId, status, class_id, section_id, period_id, subject_id } =
        action.payload;

      // UNIQUE KEY
      const uniqueKey = `${class_id}-${section_id}-${period_id}-${subject_id}`;

      state.attendanceList[uniqueKey] = state.attendanceList?.[uniqueKey]?.map(
        (student) => {
          return {
            ...student,
            attendanceStatus:
              student._id === studentId ? status : student.attendanceStatus,
          };
        }
      );
      state.present[uniqueKey] =
        state.attendanceList?.[uniqueKey]?.filter(
          (student) => student.attendanceStatus === "present"
        )?.length || 0;
      state.absent[uniqueKey] =
        state.attendanceList?.[uniqueKey]?.filter(
          (student) => student.attendanceStatus === "absent"
        )?.length || 0;
      state.presentCount[uniqueKey] = state.present[uniqueKey];
    },

    // SET ALL ATTENDANCE STATUS
    setAllAttendanceStatus: (state, action) => {
      const { status, class_id, section_id, period_id, subject_id } =
        action.payload;

      // UNIQUE KEY
      const uniqueKey = `${class_id}-${section_id}-${period_id}-${subject_id}`;

      state.attendanceList[uniqueKey] = state.attendanceList?.[uniqueKey]?.map(
        (student) => ({
          ...student,
          attendanceStatus: status,
        })
      );
      // PRESENT
      state.present[uniqueKey] =
        status === "present"
          ? state.attendanceList?.[uniqueKey]?.length
          : 0;
      // ABSENT
      state.absent[uniqueKey] =
        status === "absent"
          ? state.attendanceList?.[uniqueKey]?.length
          : 0;
      // PRESENT COUNT
      state.presentCount[uniqueKey] =
        status === "present"
          ? state.attendanceList?.[uniqueKey]?.length
          : 0;
    },

    // SET ATTENDANCE STATUS BY FETCHED DATA
    setAttendanceStatusByFetchedData: (state, action) => {
      const {
        attendanceList: attendanceData,
        class_id,
        section_id,
        period_id,
        subject_id,
      } = action.payload;

      // UNIQUE KEY
      const uniqueKey = `${class_id}-${section_id}-${period_id}-${subject_id}`;

      // Map over attendanceList and update attendance_status where student_id matches
      if (attendanceData && attendanceData?.length > 0) {
        const updatedAttendanceList = state.attendanceList?.[uniqueKey]?.map(
          (record) => {
            const matchedStudent = attendanceData?.find(
              (attendance) => attendance?.student_id?._id === record?._id
            );

            return {
              ...record,
              // ATTENDANCE ID NULL WHEN NO MATCHING RECORD FOUND
              attendanceId: matchedStudent?._id ?? null,
              //as in by default it'll be absent... So likely if new student is enrolled after taking attendance then it'll be absent
              attendanceStatus:
                matchedStudent?.attendance_status || "absent",
            };
          }
        );

        state.attendanceList[uniqueKey] = updatedAttendanceList;
        state.present[uniqueKey] =
          updatedAttendanceList?.filter(
            (student) => student.attendanceStatus === "present"
          )?.length || 0;
        state.absent[uniqueKey] =
          updatedAttendanceList?.filter(
            (student) => student.attendanceStatus === "absent"
          )?.length || 0;
        state.presentCount[uniqueKey] = state.present[uniqueKey];
      }
    },
  },
});

export const {
  setAttendanceList,
  setAttendanceStatus,
  setAllAttendanceStatus,
  setAttendanceStatusByFetchedData,
} = attendanceManagementSlice.actions;
export default attendanceManagementSlice.reducer;
