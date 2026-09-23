import { apiSlice } from "../api/slice";
import { setDays } from "./slice";

const dayApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllDays: builder.query({
      query: ({ page = 1, institute_id }) => {
        const params = new URLSearchParams();
        if (page) params.set("page", page);
        if (institute_id) params.set("institute_id", institute_id);
        return {
          url: `days/all?${params.toString()}`,
          method: "GET",
        };
      },
      async onQueryStarted(_args, { queryFulfilled, dispatch }) {
        try {
          const { data: apiData } = await queryFulfilled;
          const days = apiData.data;
          dispatch(setDays(days));
        } catch (err) {
          console.error(err);
        }
      },
    }),
  }),
});

export const { useGetAllDaysQuery } = dayApi;
