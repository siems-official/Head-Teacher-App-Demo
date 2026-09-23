import { apiSlice } from "../api/slice";
import { setStudents } from "./slice";

const studentsApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getFilteredStudents: builder.query({
      query: ({
        page = 1,
        limit = 50,
        institute_id,
        section_id,
        category_id,
        academic_year,
        class_id,
      }) => {
        const params = new URLSearchParams();
        params.append("page", page);
        params.append("limit", limit);
        if (institute_id) params.append("institute_id", institute_id);
        if (section_id) params.append("section_id", section_id);
        if (category_id) params.append("category_id", category_id);
        if (academic_year) params.append("academic_year", academic_year);
        if (class_id) params.append("class_id", class_id);

        return { url: `students/filtered?${params.toString()}`, method: "GET" };
      },
      async onQueryStarted(_args, { queryFulfilled, dispatch }) {
        try {
          const { data: apiData } = await queryFulfilled;
          const students = apiData.data;
          dispatch(setStudents(students));
        } catch (err) {
          console.error(err);
        }
      },
    }),
  }),
});

export const { useGetFilteredStudentsQuery, useLazyGetFilteredStudentsQuery } =
  studentsApi;
