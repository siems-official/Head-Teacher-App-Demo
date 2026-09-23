import { apiSlice } from "../api/slice";
import {
  setAllExamTypes,
  setExamConfig,
  setExamHeads,
  setFilteredExamResult,
  setStudentsForExamSectionWise,
  setTeacherSpecificExams,
} from "./slice";

export const examApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // GET EXAM HEADS
    getExamHeads: builder.query({
      query: ({ institute_id, page = 1, limit = 99999 }) => {
        const params = new URLSearchParams();
        if (institute_id) params.append("institute_id", institute_id);
        params.append("page", page);
        params.append("limit", limit);

        return {
          url: `exam-heads/all?${params.toString()}`,
          method: "GET",
        };
      },
      async onQueryStarted(_args, { queryFulfilled, dispatch }) {
        try {
          const { data: apiData } = await queryFulfilled;
          dispatch(setExamHeads(apiData.data));
        } catch (err) {
          console.error(err);
        }
      },
    }),

    // GET ALL EXAM TYPES
    getAllExamTypes: builder.query({
      query: ({ institute_id, page = 1, limit = 99999 }) => {
        const params = new URLSearchParams();
        if (institute_id) params.append("institute_id", institute_id);
        params.append("page", page);
        params.append("limit", limit);

        return {
          url: `exam-types/all?${params.toString()}`,
          method: "GET",
        };
      },

      async onQueryStarted(_args, { queryFulfilled, dispatch }) {
        try {
          const { data: apiData } = await queryFulfilled;
          dispatch(setAllExamTypes(apiData.data));
        } catch (err) {
          console.error(err);
        }
      },
    }),

    // GET EXAM FILTERED BY TEACHER
    getFilteredExamsByTeacher: builder.query({
      query: ({ institute_id, status, exam_type_id }) => {
        const params = new URLSearchParams();
        if (institute_id) params.append("institute_id", institute_id);
        if (status) params.append("status", status);
        if (exam_type_id) params.append("exam_type_id", exam_type_id);

        return {
          url: `exams/filtered-by-teacher?${params.toString()}`,
          method: "GET",
        };
      },

      async onQueryStarted(_args, { queryFulfilled, dispatch }) {
        try {
          const { data: apiData } = await queryFulfilled;

          if (apiData.data.length > 0) {
            dispatch(setTeacherSpecificExams(apiData.data));
          } else {
            dispatch(setTeacherSpecificExams(null));
          }
        } catch (err) {
          console.error(err);
        }
      },
    }),

    // GET EXAM CONFIG BY EXAM DETAILS
    getExamConfigByExamDetails: builder.query({
      query: ({ institute_id, exam_id, exam_type_id }) => {
        const params = new URLSearchParams();
        if (institute_id) params.append("institute_id", institute_id);
        if (exam_id) params.append("exam_id", exam_id);
        if (exam_type_id) params.append("exam_type_id", exam_type_id);

        return {
          url: `exam-configs/find-by-exam-details?${params.toString()}`,
          method: "GET",
        };
      },

      async onQueryStarted(_args, { queryFulfilled, dispatch }) {
        try {
          const { data: apiData } = await queryFulfilled;
          dispatch(setExamConfig(apiData.data));
        } catch (err) {
          console.error(err);
        }
      },
    }),

    // GET SECTION STUDENTS FOR EXAM
    getSectionStudentsForExam: builder.query({
      query: ({
        page = 1,
        limit = 999,
        institute_id,
        section_id,
        subject_id,
        class_id,
        academic_year = 2025,
        exam_id,
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
          const { class_id, section_id, subject_id, exam_id } = _args;
          const { data: apiData } = await queryFulfilled;
          const students = apiData.data;

          dispatch(
            setStudentsForExamSectionWise({
              students,
              class_id,
              section_id,
              subject_id,
              exam_id,
            })
          );
        } catch (err) {
          console.error(err);
        }
      },
    }),

    // ADD OR UPDATE RESULT
    addOrUpdateResult: builder.mutation({
      query: ({ institute_id, data }) => {
        const params = new URLSearchParams();
        if (institute_id) params.append("institute_id", institute_id);

        const formData = new FormData();
        formData.append("data", JSON.stringify(data));

        return {
          url: `exam-results/add-or-update-bulk?${params.toString()}`,
          method: "POST",
          body: formData,
        };
      },
    }),

    // GET EXAM FILTERED RESULTS
    getFilteredExamResults: builder.query({
      query: ({
        institute_id,
        exam_id,
        exam_config_id,
        exam_type_id,
        academic_year,
        local_class_id,
        section_id,
        subject_id,
      }) => {
        const params = new URLSearchParams();
        if (institute_id) params.append("institute_id", institute_id);
        if (exam_id) params.append("exam_id", exam_id);
        if (exam_config_id) params.append("exam_config_id", exam_config_id);
        if (exam_type_id) params.append("exam_type_id", exam_type_id);
        if (academic_year) params.append("academic_year", academic_year);
        if (local_class_id) params.append("local_class_id", local_class_id);
        if (section_id) params.append("section_id", section_id);

        return {
          url: `exam-results/filtered?${params.toString()}`,
          method: "GET",
        };
      },
      async onQueryStarted(_args, { queryFulfilled, dispatch }) {
        try {
          const {
            local_class_id: class_id,
            section_id,
            subject_id,
            exam_id,
          } = _args;
          const { data: apiData } = await queryFulfilled;
          dispatch(
            setFilteredExamResult({
              class_id,
              exam_id,
              section_id,
              subject_id,
              data: apiData.data,
            })
          );
        } catch (err) {
          console.error(err);
        }
      },
    }),
  }),
});

export const {
  useGetExamHeadsQuery,
  useLazyGetExamHeadsQuery,
  useGetAllExamTypesQuery,
  useLazyGetAllExamTypesQuery,
  useGetFilteredExamsByTeacherQuery,
  useLazyGetFilteredExamsByTeacherQuery,
  useGetExamConfigByExamDetailsQuery,
  useLazyGetExamConfigByExamDetailsQuery,
  useGetSectionStudentsForExamQuery,
  useAddOrUpdateResultMutation,
  useGetFilteredExamResultsQuery,
} = examApi;
