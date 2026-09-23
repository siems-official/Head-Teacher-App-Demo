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

      state.attendanceList[uniqueKey] = studentsData?.map((student, index) => {
        return {
          _id: student?._id,
          name: student?.name_english,
          roll: student?.current_roll_number || "N/A",
          attendanceStatus: "absent",
        };
      });
      state.totalStudents[uniqueKey] = studentsData?.length || 0;
      state.present[uniqueKey] =
        studentsData?.filter((student) => student?.status === "present")
          ?.length || 0;
      state.absent[uniqueKey] = studentsData?.length || 0; //as initially everyone will be absent
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
      state.presentCount[uniqueKey] =
        status === "present"
          ? state.presentCount?.[uniqueKey] + 1
          : state.presentCount?.[uniqueKey] - 1;
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
        status === "present" ? state.totalStudents?.[uniqueKey] : 0;
      // ABSENT
      state.absent[uniqueKey] =
        status === "absent" ? state.totalStudents?.[uniqueKey] : 0;
      // PRESENT COUNT
      state.presentCount[uniqueKey] =
        status === "present" ? state.totalStudents?.[uniqueKey] : 0;
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
        state.present[uniqueKey] = 0; // initial reset
        state.absent[uniqueKey] = 0; // initial reset
        state.presentCount[uniqueKey] = 0;

        state.attendanceList[uniqueKey] = state.attendanceList?.[
          uniqueKey
        ]?.map((record) => {
          // ATTENDANCE ID INITIALLY NULL
          let attendanceId = null;
          const matchedStudent = attendanceData?.find((attendance) => {
            attendanceId = attendance?._id;
            return attendance?.student_id?._id === record?._id;
          });

          // PRESENT COUNT
          state.presentCount[uniqueKey] =
            matchedStudent?.attendance_status === "present"
              ? state.presentCount?.[uniqueKey] + 1
              : state.presentCount?.[uniqueKey];

          state.present[uniqueKey] =
            matchedStudent?.attendance_status === "present"
              ? state.present?.[uniqueKey] + 1
              : state.present?.[uniqueKey];

          //as in by default it'll be absent... So likely if new student is enrolled after taking attendance then it'll be absent
          state.absent[uniqueKey] =
            !matchedStudent?.attendance_status ||
            matchedStudent?.attendance_status === "absent"
              ? state.absent?.[uniqueKey] + 1
              : state.absent?.[uniqueKey];

          return {
            ...record,
            attendanceId,
            attendanceStatus: matchedStudent?.attendance_status || "absent", //as in by default it'll be absent... So likely if new student is enrolled after taking attendance then it'll be absent
          };
        });
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
