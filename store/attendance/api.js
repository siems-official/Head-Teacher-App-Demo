import { apiSlice } from "../api/slice";
import {
  setAbsentHistory,
  setMonthlyAbsentList,
  setStudentAttendance,
} from "./slice";

const attendanceApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    studentAttendanceFiltered: builder.query({
      query: ({
        page = 1,
        limit = 999999,
        institute_id,
        section_id,
        academic_year,
        local_class_id,
        month,
        start_date,
        end_date,
        attendance_date,

        attendanceSummary = false,
        absentHistory = false,
        absentAlert = false,
      }) => {
        const params = new URLSearchParams();
        params.append("page", page);
        params.append("limit", limit);
        if (institute_id) params.append("institute_id", institute_id);
        if (section_id) params.append("section_id", section_id);
        if (academic_year) params.append("academic_year", academic_year);
        if (local_class_id) params.append("local_class_id", local_class_id);
        if (month) params.append("month", month);
        if (attendance_date) params.append("attendance_date", attendance_date);
        if (start_date) params.append("start_date", start_date);
        if (end_date) params.append("end_date", end_date);

        return {
          url: `class-attendances/filtered?${params.toString()}`,
          method: "GET",
        };
      },
      async onQueryStarted(_args, { queryFulfilled, dispatch }) {
        try {
          const { absentHistory, attendanceSummary, absentAlert } = _args;
          const { data: apiData } = await queryFulfilled;
          const attendance = apiData.data;
          if (attendanceSummary) dispatch(setStudentAttendance(attendance));
          if (absentHistory) dispatch(setAbsentHistory(attendance));
          if (absentAlert) dispatch(setMonthlyAbsentList(attendance));
        } catch (err) {
          console.error(err);
        }
      },
    }),
  }),
});

export const {
  useStudentAttendanceFilteredQuery,
  useLazyStudentAttendanceFilteredQuery,
} = attendanceApi;
