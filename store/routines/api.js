import { apiSlice } from "../api/slice";
import { setClassList, setTodaysRoutines } from "./slice";

const routinesApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getTodayRoutines: builder.query({
      query: ({ institute_id, teacher_id, day_id, academic_year }) => {
        const params = new URLSearchParams();
        if (institute_id) params.set("institute_id", institute_id);
        if (teacher_id) params.set("teacher_id", teacher_id);
        if (day_id) params.set("day_id", day_id);
        if (academic_year) params.set("academic_year", academic_year);

        return {
          url: `routines/today?${params.toString()}`,
          method: "GET",
        };
      },
      async onQueryStarted(_args, { queryFulfilled, dispatch }) {
        try {
          const { data: apiData } = await queryFulfilled;
          const routines = apiData.data;
          dispatch(setTodaysRoutines(routines));
        } catch (err) {
          console.error(err);
        }
      },
    }),
    getClasslist: builder.query({
      query: ({ institute_id, teacher_id, academic_year }) => {
        const params = new URLSearchParams();
        if (institute_id) params.set("institute_id", institute_id);
        if (teacher_id) params.set("teacher_id", teacher_id);
        if (academic_year) params.set("academic_year", academic_year);

        return {
          url: `routines/class-list?${params.toString()}`,
          method: "GET",
        };
      },
      async onQueryStarted(_args, { queryFulfilled, dispatch }) {
        try {
          const { data: apiData } = await queryFulfilled;
          const classes = apiData.data;
          dispatch(setClassList(classes));
        } catch (err) {
          console.error(err);
        }
      },
    }),
  }),
});

export const { useGetTodayRoutinesQuery, useGetClasslistQuery } = routinesApi;
