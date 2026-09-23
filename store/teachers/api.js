import { apiSlice } from "../api/slice";
import { setAllTeachers } from "./slice";

export const teachersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeachers: builder.query({
      query: ({ page = 1, limit = 50, institute_id }) => {
        const params = new URLSearchParams();
        params.append("page", page);
        params.append("limit", limit);
        params.append("institute_id", institute_id);
        return { url: `teachers/all?${params}`, method: "GET" };
      },
      async onQueryStarted(_args, { queryFulfilled, dispatch }) {
        try {
          const { data: apiData } = await queryFulfilled;
          const teachers = apiData.data;
          dispatch(setAllTeachers(teachers));
        } catch (err) {
          console.error(err);
        }
      },
    }),
  }),
});

export const { useGetTeachersQuery } = teachersApi;
