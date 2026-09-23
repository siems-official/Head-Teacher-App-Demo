import { apiSlice } from "../api/slice";
import { setAttendanceStatusByFetchedData } from "./slice";

export const attendanceApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // ADD ATTENDANCE
    classAttendanceBulkAdd: builder.mutation({
      query: (data) => {
        const formData = new FormData();
        formData.append("data", JSON.stringify(data));
        return {
          url: `class-attendances/bulk-add`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["attendanceExistance"],
    }),

    // UPDATE ATTENDANCE
    classAttendanceBulkUpdate: builder.mutation({
      query: (data) => {
        const formData = new FormData();
        formData.append("data", JSON.stringify(data));
        return {
          url: `class-attendances/bulk-update`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["attendanceExistance"],
    }),

    checkAttendanceExistance: builder.query({
      query: ({
        institute_id,
        local_class_id,
        section_id,
        day_id,
        period_id,
        teacher_id,
        subject_id,
        month,
        academic_year,
      }) => {
        const params = new URLSearchParams();
        if (institute_id) params.set("institute_id", institute_id);
        if (local_class_id) params.set("local_class_id", local_class_id);
        if (section_id) params.set("section_id", section_id);
        if (day_id) params.set("day_id", day_id);
        if (period_id) params.set("period_id", period_id);
        if (teacher_id) params.set("teacher_id", teacher_id);
        if (subject_id) params.set("subject_id", subject_id);
        if (month) params.set("month", month);
        if (academic_year) params.set("academic_year", academic_year);
        return {
          url: `class-attendances/exists?${params.toString()}`,
          method: "GET",
        };
      },
      async onQueryStarted(_args, { queryFulfilled, dispatch }) {
        try {
          const {
            local_class_id: class_id,
            section_id,
            period_id,
            subject_id,
          } = _args;
          const { data: apiData } = await queryFulfilled;
          const attendanceList = apiData.data?.data;
          dispatch(
            setAttendanceStatusByFetchedData({
              attendanceList,
              class_id,
              section_id,
              period_id,
              subject_id,
            })
          );
        } catch (err) {
          console.error(err);
        }
      },
      providesTags: ["attendanceExistance"],
    }),
  }),
});

export const {
  useClassAttendanceBulkAddMutation,
  useClassAttendanceBulkUpdateMutation,
  useCheckAttendanceExistanceQuery,
} = attendanceApi;
