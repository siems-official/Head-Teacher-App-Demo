import { apiSlice } from "../api/slice";
import { setAttendanceList } from "../attendanceManagement/slice";
import {
  setEnrollableList,
  setEnrollListForSectionStudent,
  setSectionAllStudents,
  setSubjectWiseEnrollList,
} from "./slice";

const enrollApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // get all enrollable student list based on section
    getSectionStudents: builder.query({
      query: ({
        page = 1,
        limit = 999,
        institute_id,
        section_id,
        subject_id,
        class_id,
        academic_year = 2025,
      }) => {
        const params = new URLSearchParams();
        if (page) params.append("page", page);
        if (limit) params.append("limit", limit);
        if (institute_id) params.append("institute_id", institute_id);
        if (section_id) params.append("section_id", section_id);
        if (subject_id) params.append("subject_id", subject_id);
        if (academic_year) params.append("academic_year", academic_year);
        if (class_id) params.append("class_id", class_id);

        return { url: `students/filtered?${params}`, method: "GET" };
      },
      async onQueryStarted(_args, { queryFulfilled, dispatch }) {
        try {
          const { class_id, section_id, subject_id } = _args;
          const { data: apiData } = await queryFulfilled;
          const students = apiData.data;

          dispatch(
            setSectionAllStudents({
              students,
              class_id,
              section_id,
              subject_id,
            })
          );
        } catch (err) {
          console.error(err);
        }
      },
      providesTags: ["sectionStudents"],
    }),

    // UPDATE ENROLL
    addUpdateEnrollList: builder.mutation({
      query: (data) => {
        const formData = new FormData();
        formData.append("data", JSON.stringify(data));
        return {
          url: `subject-enrolls/add-or-update`,
          method: "POST",
          body: formData,
        };
      },
    }),

    // GET FILTERED ENROLL
    getFilteredSubjectEnrollList: builder.query({
      query: ({
        institute_id,
        academic_year,
        local_class_id,
        section_id,
        subject_id,
        teacher_id,

        subject_wise_enroll,
      }) => {
        const params = new URLSearchParams();
        if (institute_id) params.set("institute_id", institute_id);
        if (academic_year) params.set("academic_year", academic_year);
        if (local_class_id) params.set("local_class_id", local_class_id);
        if (section_id) params.set("section_id", section_id);
        if (subject_id) params.set("subject_id", subject_id);
        if (teacher_id) params.set("teacher_id", teacher_id);

        return {
          url: `subject-enrolls/filtered?${params.toString()}`,
          method: "GET",
        };
      },
      async onQueryStarted(_args, { queryFulfilled, dispatch }) {
        try {
          const {
            local_class_id,
            section_id,
            subject_id,
            subject_wise_enroll,
          } = _args;
          const { data: apiData } = await queryFulfilled;
          const enrollList = apiData.data?.[0]?.students;

          dispatch(
            setEnrollableList({
              enrollList,
              class_id: local_class_id,
              section_id,
              subject_id,
            })
          );
          dispatch(
            setEnrollListForSectionStudent({
              enrollList,
              class_id: local_class_id,
              section_id,
              subject_id,
            })
          );

          if (subject_wise_enroll) {
            dispatch(
              setSubjectWiseEnrollList({
                enrollList,
                class_id: local_class_id,
                section_id,
                subject_id,
              })
            );
          }
        } catch (err) {
          console.error(err);
        }
      },
      invalidatesTags: ["sectionStudents"],
    }),

    // GET ENROLL
    getEnrollList: builder.query({
      query: ({
        institute_id,
        subject_id,
        teacher_id,
        class_id,
        section_id,
        period_id,
        group_id,
      }) => {
        const params = new URLSearchParams();
        if (institute_id) params.set("institute_id", institute_id);
        if (subject_id) params.set("subject_id", subject_id);
        if (teacher_id) params.set("teacher_id", teacher_id);
        if (section_id) params.set("section_id", section_id);
        if (group_id) params.set("group_id", group_id);

        return {
          url: `subject-enrolls/students-for-attendance?${params.toString()}`,
          method: "GET",
        };
      },
      async onQueryStarted(_args, { queryFulfilled, dispatch }) {
        try {
          const { class_id, section_id, period_id, subject_id, group_id } =
            _args;
          const { data: apiData } = await queryFulfilled;
          const enrollList = apiData.data?.[0]?.students;
          dispatch(
            setAttendanceList({
              enrollList,
              class_id,
              section_id,
              period_id,
              subject_id,
              group_id,
            })
          );
        } catch (err) {
          console.error(err);
        }
      },
      providesTags: ["enrollList"],
    }),
  }),
});

export const {
  useGetSectionStudentsQuery,
  useAddUpdateEnrollListMutation,
  useGetFilteredSubjectEnrollListQuery,
  useGetEnrollListQuery,
} = enrollApi;
