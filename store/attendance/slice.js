import { getCalendarFormattedDate } from "@/services";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  attendanceDate: getCalendarFormattedDate(new Date()),
  studentAttendance: [],
  studentAttendanceMeta: {
    totalStudents: 0,
    totalPresent: 0,
    totalAbsent: 0,
  },
  classSectionBasedAttendanceStatList: [],
  presentStudentList: [],
  absentStudentList: [],

  // ABSENT HISTORY
  absentHistory: [],

  // MONTHLY ABSENT ALERT LIST
  monthlyAbsentList: [],
};

const studentAttendanceSlice = createSlice({
  name: "studentAttendance",
  initialState,
  reducers: {
    setAttendanceDate: (state, action) => {
      state.attendanceDate = action.payload;
    },
    setStudentAttendance: (state, action) => {
      state.studentAttendance = action.payload;
      state.studentAttendanceMeta.totalStudents = action.payload?.length;
      state.studentAttendanceMeta.totalPresent = action.payload?.filter(
        (student) => student?.attendance_status === "present"
      ).length;
      state.studentAttendanceMeta.totalAbsent = action.payload?.filter(
        (student) => student?.attendance_status === "absent"
      ).length;

      // TAKING MAP OF CLASS AND SECTION BASED UNIQUE ENTRIES
      const attendanceSummaryMap = new Map();

      // POPULATING THE MAP
      action.payload?.forEach((entry) => {
        const classId = entry.local_class_id?._id;
        const sectionId = entry.section_id?._id;
        const key = `${classId}_${sectionId}`;

        if (!attendanceSummaryMap.has(key)) {
          attendanceSummaryMap.set(key, {
            _id: key,
            classCode: entry.local_class_id?.local_class_code,
            className: entry.local_class_id?.local_class_name,
            section: `${entry.section_id?.section_name}`,
            total: 0,
            present: 0,
            absent: 0,
            attendance_date: entry.attendance_date,
            period: entry.period_id?.period_name,
          });
        }

        const current = attendanceSummaryMap.get(key);
        current.total += 1; // here += actually means current.total = current.total + 1
        if (entry.attendance_status === "present") {
          current.present += 1;
        } else if (entry.attendance_status === "absent") {
          current.absent += 1;
        }

        attendanceSummaryMap.set(key, current);
      });

      // CONVERTING UNIQUE MAP TO ARRAY
      state.classSectionBasedAttendanceStatList = Array.from(
        attendanceSummaryMap.values()
      ).sort((a, b) => a.classCode - b.classCode); // SORTING BY CLASS CODE

      // PRESENT AND ABSENT STUDENT LIST
      const attendancePresentAbsentMap = {};

      // Step 1: Tally present/absent for each student
      action.payload?.forEach((student) => {
        const studentId = student?.student_id?._id;
        const roll = student?.student_id?.current_roll_number;
        const status = student?.attendance_status;

        if (!attendancePresentAbsentMap[studentId]) {
          attendancePresentAbsentMap[studentId] = {
            _id: student?._id,
            name: student?.student_id?.name_english,
            roll,
            phone: student?.student_id?.mobile_number,
            className: student?.local_class_id?.local_class_name,
            totalPresent: 0,
            totalAbsent: 0,
            totalClass: 0,
          };
        }

        if (status === "present") {
          attendancePresentAbsentMap[studentId].totalPresent += 1;
        } else if (status === "absent") {
          attendancePresentAbsentMap[studentId].totalAbsent += 1;
        }
        attendancePresentAbsentMap[studentId].totalClass += 1;
      });

      // Step 2: Build presentStudentList with stats, only for students who were present today
      state.presentStudentList = action.payload?.reduce((acc, student) => {
        if (student?.attendance_status === "present") {
          const roll = student?.student_id?.current_roll_number;
          const stats = attendancePresentAbsentMap[student?.student_id?._id];

          acc.push({
            _id: student?._id,
            name: student?.student_id?.name_english,
            roll,
            phone: student?.student_id?.mobile_number,
            attendance_status: student?.attendance_status,
            className: student?.local_class_id?.local_class_name,
            classCode: student?.local_class_id?.local_class_code,
            section: student?.section_id?.section_name,
            image: student?.student_id?.image,
            totalPresent: stats?.totalPresent || 0,
            totalAbsent: stats?.totalAbsent || 0,
            totalClass: stats?.totalClass || 0,
          });
        }

        return acc;
      }, []);

      // Step 2: Build presentStudentList with stats, only for students who were present today
      state.absentStudentList = action.payload?.reduce((acc, student) => {
        if (student?.attendance_status === "absent") {
          const roll = student?.student_id?.current_roll_number;
          const stats = attendancePresentAbsentMap[student?.student_id?._id];

          acc.push({
            _id: student?._id,
            name: student?.student_id?.name_english,
            roll,
            phone: student?.student_id?.mobile_number,
            attendance_status: student?.attendance_status,
            className: student?.local_class_id?.local_class_name,
            classCode: student?.local_class_id?.local_class_code,
            section: student?.section_id?.section_name,
            image: student?.student_id?.image,
            totalPresent: stats?.totalPresent || 0,
            totalAbsent: stats?.totalAbsent || 0,
            totalClass: stats?.totalClass || 0,
          });
        }

        return acc;
      }, []);
    },

    setAbsentHistory: (state, action) => {
      const studentAttendanceMap = {};

      action.payload?.forEach((student) => {
        const studentId = student?.student_id?._id;
        const roll = student?.student_id?.current_roll_number;

        if (!studentAttendanceMap[studentId]) {
          studentAttendanceMap[studentId] = {
            _id: student?._id,
            name: student?.student_id?.name_english,
            roll: roll,
            phone: student?.student_id?.mobile_number,
            className: student?.local_class_id?.local_class_name,
            classCode: student?.local_class_id?.local_class_code,
            image: student?.student_id?.image,
            attendance_status: student?.attendance_status,
            absent: 0,
            present: 0,
            totalClass: 0,
          };
        }

        // else {
        //   studentAttendanceMap[studentId].absent += 1; // if already exists, add 1
        // }

        if (student?.attendance_status === "absent") {
          studentAttendanceMap[studentId].absent += 1;
        } else if (student?.attendance_status === "present") {
          studentAttendanceMap[studentId].present += 1;
        }

        studentAttendanceMap[studentId].totalClass += 1;
      });

      state.absentHistory = Object.values(studentAttendanceMap);
    },

    setMonthlyAbsentList: (state, action) => {
      const studentAttendanceMap = {};

      action.payload?.forEach((student) => {
        const studentId = student?.student_id?._id;
        const roll = student?.student_id?.current_roll_number;

        if (!studentAttendanceMap[studentId]) {
          studentAttendanceMap[studentId] = {
            _id: student?._id,
            name: student?.student_id?.name_english,
            roll,
            phone: student?.student_id?.mobile_number,
            className: student?.local_class_id?.local_class_name,
            classCode: student?.local_class_id?.local_class_code,
            image: student?.student_id?.image,
            attendance_status: student?.attendance_status,
            absent: 0,
            present: 0,
            totalClass: 0,
          };
        }
        // else {
        //   studentAttendanceMap[studentId].absent += 1; // if already exists, add 1
        // }

        if (student?.attendance_status === "absent") {
          studentAttendanceMap[studentId].absent += 1;
        } else if (student?.attendance_status === "present") {
          studentAttendanceMap[studentId].present += 1;
        }

        studentAttendanceMap[studentId].totalClass += 1;
      });

      state.monthlyAbsentList = Object.values(studentAttendanceMap);
    },
  },
});

export const {
  setAttendanceDate,
  setStudentAttendance,
  setAbsentHistory,
  setMonthlyAbsentList,
} = studentAttendanceSlice.actions;
export default studentAttendanceSlice.reducer;
